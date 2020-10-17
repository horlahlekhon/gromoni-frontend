import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import { Container, Row, Col, Button, Form, FormGroup, Input, Label} from 'reactstrap'

import {withRouter} from 'react-router';
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import countryList from 'country-list'
import {responseErrorParser, validateForm} from '../components/authentication/validator';
import {createBusiness} from '../redux/actions/businessActions';
import {useCookie} from '@shopify/react-cookie';

import {MapPin} from 'react-feather'
const mapPin = <MapPin/>


const CreateBusiness = (props) => {
    const history = useHistory();
    const [accessToken, ] = useCookie('accessToken')

    const [isCreatingBusiness, setIsCreatingBusiness]  = useState(false)
    const [businessName, setBusinessName] = useState('')
    const [businessMail, setBusinessMail] = useState('')
    const [companyType, setCompanyType] = useState('I')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState({place_name: 'Lagos', longitude: 123.929, latitude: 334.322})
    const [country, setCountry] = useState('Nigeria')
    const [dateCreated, ] = useState('2020-01-01')
    const [taxPercentage, ] = useState(7.5)

    const companyTypes = {
        "Corporate": "C",
        "Individual": "I",
    }

    const countries = countryList.getNames()
    const fields = {
        business_name: { default: '', message: 'Please enter a unique business name' },
        business_mail: { default: '', message: 'Enter a business mail' },
        company_type: { default: '', message: 'Please select a company type' },
        phone: { default: '', message: 'Please enter a valid phone number' },
        business_location: { default: '', message: 'Please select a location' },
        country: { default: '', message: 'Please select yout operating country' }

    }

    // No authentication token on the header

    const handleCreateBusiness = async (e) => {
        e.preventDefault()
        setIsCreatingBusiness(true)
        const requestPayload = {
            business_name: businessName,
            business_mail: businessMail,
            company_type: companyType,
            phone: phone,
            business_location: location, // FIXME hardcoded location until we implement google map
            country: country,
            date_created: dateCreated,
            tax_percetage: taxPercentage
        }
        const errors = validateForm(requestPayload, fields)
        if (errors.isErrors) {
            setIsCreatingBusiness(false)
            setTimeout(() => {
                errors.errors.forEach(e => toast.error(e.message))
            }, 400);
        } else {
            const response = await props.createBusiness(accessToken, requestPayload)
            if (response.status) {
                const currentBusiness = response.payload.data.id
                localStorage.removeItem('__grm__act__biz__')
                localStorage.setItem('__grm__act__biz__', currentBusiness.toString())
                history.push('/dashboard')
            } else {
                setIsCreatingBusiness(false)
                const payload = response.payload
                const errs = responseErrorParser(payload.data)
                setTimeout(() => {
                    errs.forEach(e => toast.error(e.message))
                }, 400);
            }
        }

    }


    return (
        <div style={{fontFamily:"'Poppins', sans-serif"}}>    
            <Container> 
                <div > 
                    <Row>
                        <Col> 
                            <div >  
                                <Form  onSubmit={e => e.preventDefault()}>
                                    <ToastContainer />
                                    <h3 className="main-title">Business Registration</h3>
                                    <FormGroup className=" m-form__group">
                                        <Label for="businessName">Business Name</Label>
                                        <Input className="form-control input-container" id="businessName"
                                            type="text"
                                            placeholder="Business name i.e JC LTD"
                                            value={businessName}
                                            onChange={e => setBusinessName(e.target.value)}/>
                                    </FormGroup>
                                    <FormGroup className=" input-group-solid">
                                        <Label for="businessEmail">Business Email</Label>
                                        <Input className="form-control input-container" id="businessEmail"
                                            type="email"
                                            placeholder="Email"
                                            value={businessMail}
                                            onChange={e => setBusinessMail(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className=" input-group-solid">
                                        <Label for="businessLocation" >Business Location</Label>
                                        <div style={{position:"relative"}}>
                                            <i className="map-pin">{mapPin}</i>
                                            <Input className="form-control input-container business-location" id="businessLocation"
                                            type="text"
                                            placeholder="Business Location"
                                            value={location}
                                            onChange={e => setLocation({place_name: 'Lagos', longitude: 123.929, latitude: 334.322})} />
                                        </div>
                                    </FormGroup>
                                    <FormGroup className=" m-form__group">
                                        <Label for="phoneNumber">Phone Number</Label>
                                        <PhoneInput
                                            inputStyle={{maxWidth:"400px", width:"100%", height: "44px"}}
                                            buttonStyle={{backgroundColor: "#d5deee"}}
                                            id="phoneNumber"
                                            country={"ng"}
                                            placeholder="Telephone"
                                            value={phone}
                                            onChange={setPhone}
                                            />      
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="companyType">Company Type</Label>
                                        <Input className="custom-select input-container" type="select" placeholder="Company type" id="companyType"
                                            value={companyType}
                                            onChange={e => setCompanyType(e.target.value)}
                                            required
                                        >
                                            <option value="">select company type</option>
                                            {Object.keys(companyTypes).map((opt, idx) => (
                                                <option value={companyTypes[opt]} key={idx}>{opt}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <Row>
                                        <Col xl={`4`}>
                                            <Button color=" btn-outline-primary" block className=" create-business-btn" onClick={() => props.showMessageAction(false)}>
                                                cancel
                                            </Button>
                                        </Col>
                                        <Col xl={`8`}>
                                            <Button color="primary " block className=" create-business-btn"
                                                    onClick={e => handleCreateBusiness(e)}
                                            >
                                                {/* {props.requestingCreateBusiness ? 'Loading...' : 'Create business'} */}
                                                {isCreatingBusiness ? 'Loading...' : 'Done'}
                                            </Button>
                                        </Col>

                                    </Row>
                                    <div className="help-link-cont" style={{}}>
                                        <div>
                                            <a href="#" className="help-link" style={{}}>Need Help?</a>
                                        </div>
                                    </div>

                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );

}

const mapStateToProps = (state) => ({
    requestingCreateBusiness: state.BUSINESS.isRequestingCreateBusiness,
});

const actions = {
    createBusiness: createBusiness
};
export default connect(mapStateToProps, actions)(withRouter(CreateBusiness))