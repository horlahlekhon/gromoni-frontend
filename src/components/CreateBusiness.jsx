import React, { useState } from 'react'

// import { Container, Row, Col, CardBody, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap'

import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import countryList from 'country-list'
import { validateForm, responseErrorParser } from '../components/authentication/validator';
import { createBusiness } from '../redux/actions/businessActions';
import { useCookie } from '@shopify/react-cookie';


const CreateBusiness = (props) => {
    const history = useHistory();
    const [accessToken, setAccessToken] = useCookie('accessToken')

    const [isCreatingBusiness, setIsCreatingBusiness]  = useState(false)


    const [businessName, setBusinessName] = useState('')
    const [businessMail, setBusinessMail] = useState('')
    const [companyType, setCompanyType] = useState('I')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState({place_name: 'Lagos', longitude: 123.929, latitude: 334.322})
    const [country, setCountry] = useState('Nigeria')
    const [dateCreated, setDateCreated] = useState('2020-01-01')
    const [taxPercentage, setTaxPercentage] = useState(7.5)

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
                console.log(`datattatattat: ${response.payload}`)
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
        <div>      {/*className="page-wrapper" */}
            <Container> {/*fluid={true} className="p-0" */}
                <div > {/*className="authentication-main m-0" */}
                    <Row>
                        <Col> {/*md="12" */}
                            <div > {/*className="auth-innerright" */}
                                <div > {/*className="authentication-box" */}
                                        <div>  {/*className="cont text-center b-light" */}
                                            <div>
                                                <Form  onSubmit={e => e.preventDefault()}> {/*className="theme-form" */}
                                                    <ToastContainer />
                                                    <h4>Create business</h4>
                                                    <FormGroup className=" m-form__group">

                                                        <Input className="form-control"
                                                            type="text"
                                                            placeholder="Business name i.e JC LTD"
                                                            value={businessName}
                                                            onChange={e => setBusinessName(e.target.value)} />
                                                    </FormGroup>
                                                    <FormGroup className=" input-group-solid">

                                                        <Input className="form-control"
                                                            type="email"
                                                            placeholder="Email"
                                                            value={businessMail}
                                                            onChange={e => setBusinessMail(e.target.value)} />
                                                    </FormGroup>
                                                    {/* <div className="checkbox p-0">
                                                        <Input id="checkbox1" type="checkbox" />
                                                        <Label for="checkbox1">Remember me</Label>
                                                    </div> */}
                                                    <FormGroup>

                                                        <Input className="custom-select" type="select" placeholder="Company type"
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
                                                    <FormGroup className=" m-form__group">

                                                        <Input className="form-control"
                                                            type="tel"
                                                            placeholder="Telephone"
                                                            value={phone}
                                                            onChange={e => setPhone(e.target.value)} />
                                                    </FormGroup>
                                                    <FormGroup className=" input-group-solid">

                                                        <Input className="form-control"
                                                            type="text"
                                                            placeholder="Business Location"
                                                            value={location}
                                                            onChange={e => setLocation({place_name: 'Lagos', longitude: 123.929, latitude: 334.322})} />
                                                    </FormGroup>
                                                    <FormGroup className=" input-group-solid">

                                                        <Input className="form-control"
                                                            type="select"
                                                            placeholder="Country of operation"
                                                            value={country}
                                                            onChange={e => setCountry(e.target.value)} >
                                                            <option value="">select country</option>
                                                            {countries.map((opt, idx) => (
                                                                <option value={opt} key={idx}>{opt}</option>
                                                            ))}
                                                        </Input>
                                                    </FormGroup>
                                                    <FormGroup className="form-row mt-3 mb-0">
                                                        <Button color="primary btn-block"
                                                            onClick={e => handleCreateBusiness(e)}
                                                        >
                                                            {/* {props.requestingCreateBusiness ? 'Loading...' : 'Create business'} */}
                                                            {isCreatingBusiness ? 'Loading...' : 'Create business'}
                                                            </Button>
                                                    </FormGroup>

                                                </Form>
                                            </div>
                                        </div>
                                </div>
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