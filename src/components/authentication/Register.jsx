import React, {useState} from 'react'
import {handleUserRegister} from '../../redux/actions';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import {toast} from 'react-toastify';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {useHistory} from 'react-router-dom'
import {responseErrorParser, validateForm} from './validator';
import {useCookie} from '@shopify/react-cookie';

import {Eye} from 'react-feather'

const eye = <Eye/>

const Register = (props) => {
    useHistory();
    const [, setAccessToken] = useCookie('accessToken');
    const [, setRefreshToken] = useCookie('refreshToken')
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [agree, setAgree] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)

    // console.log(password2);
    const genderOpts = {
        "Male": "M",
        "Female": "F",
        "Prefer not to say": "None"
    }

    // NEW USER REGISTER FORM INPUTS AND ERROR MESSAGE

    const fields = {
        fullName: {default: '', message: 'Please enter your full name separated by space'},
        username: {default: '', message: 'Please enter a username'},
        email: {default: '', message: 'Please enter a valid email address'},
        phone: {default: '', message: 'Please enter a valid phone with standard format'},
        gender: {default: '', message: 'Please select your gender'},
        password1: {default: '', message: 'Please enter a password'},
        password2: {default: '', message: 'Passwords do not match, please check the password again'},
        agree: {default: false, message: 'Please Agree to continue'},
    }

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        const sta = {
            fullName: fullName,
            username: username,
            email: email,
            phone: phone,
            gender: gender,
            password1: password1,
            password2: password2,
            agree: agree,
        }
        const errorObj = validateForm(sta, fields);
        if (errorObj.isErrors) {
            //   this.setState({ showFormErrors: true, errors: errorObj.errors })
            setTimeout(() => {
                errorObj.errors.forEach((errorObj) => toast.error(errorObj.message))
            }, 3000)
        } else {
            const form = new FormData();
            const name = fullName.split(' ');
            form.append('first_name', name[0]);
            form.append('last_name', name[1] ? name[1] : '');
            form.append('username', username);
            form.append('phone', phone);
            form.append('gender', gender);
            form.append('password1', password1);
            form.append('password2', password2);
            form.append('email', email);
            const res_data = await props.register(form);
            if (res_data.status) {
                setAccessToken(res_data.payload.data.access_token)
                setRefreshToken(res_data.payload.data.refresh_token)
                toast.info('Registeration successful')
                props.history.push('/business', {previousLocation: "/register"});

            } else {
                const payload = res_data.payload
                const errs = responseErrorParser(payload.data)
                setTimeout(() => {
                    errs.forEach(e => toast.error(e.message))
                }, 400);
            }
        }
    }


    return (
        <div>
            <Form className="theme-form" onSubmit={e => e.preventDefault()}>
                <h4 className="text-center">NEW USER</h4>
                <h6 className="text-center">Enter your Credentials</h6>
                <Row form>
                    <Col md="12">
                        <FormGroup>
                            <Input className="form-control" type="text" placeholder="Full name"
                                   value={fullName}
                                   onChange={e => setFullName(e.target.value)}
                                   required
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <FormGroup>
                            <Input className="form-control" type="text" placeholder="username"
                                   value={username}
                                   onChange={e => setUsername(e.target.value)}
                                   required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md="12">
                        <FormGroup>
                            <Input className="form-control" type="email" placeholder="Email"
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md="6">
                        <FormGroup>
                            <Input className="form-control" type="tel" placeholder="Phone"
                                   value={phone}
                                   onChange={e => setPhone(e.target.value)}
                                   required
                            />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Input className="custom-select" type="select" placeholder="Gender"
                                   value={gender}
                                   onChange={e => setGender(e.target.value)}
                                   required
                            >
                                <option value="">select gender</option>
                                {Object.keys(genderOpts).map((opt, idx) => (
                                    <option value={genderOpts[opt]} key={idx}>{opt}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md="12">
                        <FormGroup>
                            <div className="pass-wrapper">
                                <Input className="form-control" type={passwordShown ? "text" : "password"}
                                       placeholder="Password"
                                       value={password1}
                                       onChange={e => setPassword1(e.target.value)}
                                       required
                                />
                                <i className="eye" onClick={togglePasswordVisibility}>{eye}</i>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <FormGroup>
                            <Input className="form-control" type={passwordShown ? "text" : "password"}
                                   placeholder="verify Password"
                                   value={password2}
                                   onChange={e => setPassword2(e.target.value)}
                                   required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col sm="4">
                        <Button color="primary" type="submit"
                                onClick={e => handleRegisterUser(e)}
                        >{props.requestingReg ? 'Loading...' : 'Sign Up'}</Button>
                    </Col>
                    <Col sm="4">
                        <FormGroup>
                            <div className="checkbox p-0 checkbox-primary">
                                <Input id="checkbox2" type="checkbox" value={agree}
                                       onChange={() => setAgree(!agree)}/>
                                <Label className="mb-1" for="checkbox2"> <a href="http://www.google.com">Terms and
                                    Conditions</a></Label>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <div className="form-divider"/>
                <div className="social mt-3">
                    <div className="form-row btn-showcase">
                        <Col sm="4">
                            <Button color="social-btn btn-fb">Facebook</Button>
                        </Col>
                        <Col sm="4">
                            <Button color="social-btn btn-twitter">Twitter</Button>
                        </Col>
                        <Col sm="4">
                            <Button color="social-btn btn-google">Google +</Button>
                        </Col>
                    </div>
                </div>
            </Form>
        </div>
    )
}
const mapStateToProps = (state) => ({
    requestingReg: state.USER.isRequestingReg
})

const actions = {
    register: handleUserRegister
};

export default connect(mapStateToProps, actions)(withRouter(Register));
