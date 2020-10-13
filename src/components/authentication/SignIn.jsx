import React, {useState} from 'react'
import {handleUserLogin} from '../../redux/actions/userActions';

import {Button, CardBody, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {withRouter} from 'react-router';
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import Register from './Register';
import {responseErrorParser, validateForm} from './validator';

import {useCookie} from '@shopify/react-cookie';

import {Eye} from 'react-feather'

const eye = <Eye />


const fields = {
    username: {default: '', message: 'Please enter a valid username'},
    password: {default: '', message: 'Please enter a valid password'}
}

const SignIn = (props) => {
    const history = useHistory();
    const [, setAccessToken] = useCookie('accessToken');
    const [, setRefreshToken] = useCookie('refreshToken')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false)
    if(typeof props.location.state === 'object' && props.location.state.isRedirect){
        toast.error(props.location.state.error)
    }
    const handleLoginUser = async (e) => {
        e.preventDefault();
        const state = {
            username,
            password,
        }
        const errorObj = validateForm(state, fields);
        if (errorObj.isErrors) {
            setTimeout(() => {
                errorObj.errors.forEach((errorObj) => toast.error(errorObj.message))
            }, 200)
        } else {
            const form = new FormData();
            form.append('username', username);
            form.append('password', password);
            const res_data = await props.login(form);
            if (res_data.status) {
                setAccessToken(res_data.payload.data.access_token)
                setRefreshToken(res_data.payload.data.refresh_token)
                const businesses = res_data.payload.data.businesses
                const currentBusiness = businesses[0]
                if (businesses.length === 0) {
                    toast.info('Sorry, You currently do not have any business, take time to create one')
                    history.push('/business/')
                } else {
                    localStorage.setItem('__grm__act__biz__', currentBusiness.id.toString())
                    toast.info('Welcome back!')
                    // automatic redirection to the page that was errored is needed, we can create a small function that format the paths and
                    // add required variables like businessId. i.e if we encounter a business not found on a page, or the user deleted cookies
                    // we will redirect back to login, and we must also redirect back to where the user was before getting redirected to login.
                    // so the business id will be injected into the path passed down from the redirecting page, and after we log them in successfully
                    // we just inject the business variable into the formatted string passed from the redirected page, and redirect the user
                    // back.
                    if(typeof props.location.state === 'object' && props.location.state.isRedirect){
                        history.push(props.location.state.redirectRoute) // change to use the FQP(fully qualified path)
                    }else{
                        history.push(`/business/${currentBusiness.id}/home`);
                    }
                }
            } else {
                const payload = res_data.payload
                const erro = responseErrorParser(payload)
                setTimeout(() => {
                    erro.forEach(e => toast.error(e.message))
                }, 300);
            }
        }

    }

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true )
    }

    const toggleform = () => {
        document.querySelector('.cont').classList.toggle('s--signup');
    }

    return (

        <div className="page-wrapper">
            <Container fluid={true} className="p-0">
                <div className="authentication-main m-0">
                    
                    <Row>
                        <Col md="12">
                            <div className="auth-innerright">
                                <div className="authentication-box">
                                    <CardBody className="h-100-d-center">
                                        <div className="cont text-center b-light">
                                            <div>
                                                <Form className="theme-form" onSubmit={e => e.preventDefault()}>
                                                    <ToastContainer />
                                                    <h4>SIGN IN</h4>
                                                    <h6>Enter your Username and Password</h6>
                                                    <FormGroup>
                                                        <Label className="col-form-label pt-0">Your Name</Label>
                                                        <Input
                                                            className="form-control" type="text" required=""
                                                            value={username}
                                                            onChange={e => setUserName(e.target.value)} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label className="col-form-label">Password</Label>
                                                        <div className="pass-wrapper">
                                                            <Input
                                                                className="form-control" type={passwordShown ? "text":"password"} required=""
                                                                value={password}
                                                                onChange={e => setPassword(e.target.value)} />
                                                            <i className="eye" onClick={togglePasswordVisibility}>{eye}</i>
                                                        </div>
                                                    </FormGroup>
                                                    <div className="checkbox p-0">
                                                        <Input id="checkbox1" type="checkbox" />
                                                        <Label for="checkbox1">Remember me</Label>
                                                    </div>
                                                    <FormGroup className="form-row mt-3 mb-0">
                                                        <Button color="primary btn-block"
                                                            onClick={e => handleLoginUser(e)}
                                                        >{props.requestingLog ? 'Loading...' : 'Sign In'}</Button>
                                                    </FormGroup>
                                                    <div className="login-divider"></div>
                                                    <div className="social mt-3">
                                                        <Row form className="btn-showcase">
                                                            <Col md="3" sm="6">
                                                                <Button color="social-btn btn-fb">Facebook</Button>
                                                            </Col>
                                                            <Col md="3" sm="6">
                                                                <Button color="social-btn btn-twitter">Twitter</Button>
                                                            </Col>
                                                            <Col md="3" sm="6">
                                                                <Button color="social-btn btn-google">Google + </Button>
                                                            </Col>
                                                            <Col md="3" sm="6">
                                                                <Button color="social-btn btn-github btn-block">Github</Button>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Form>
                                            </div>
                                            <div className="sub-cont">
                                                <div className="img">
                                                    <div className="img__text m--up">
                                                        <h2>New User?</h2>
                                                        <p>Sign up and discover great amount of new opportunities!</p>
                                                    </div>
                                                    <div className="img__text m--in">
                                                        <h2>One of us?</h2>
                                                        <p>If you already has an account, just sign in. We've missed you!</p>
                                                    </div>
                                                    <div className="img__btn" onClick={toggleform}><span className="m--up">Sign up</span><span className="m--in">Sign in</span></div>
                                                </div>
                                                <Register />
                                            </div>
                                        </div>
                                    </CardBody>
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
    requestingLog: state.USER.isRequestingLog,
    userHaveBusiness: state.USER.userHaveNoBusiness
});

const actions = {
    login: handleUserLogin
};
export default connect(mapStateToProps, actions)(withRouter(SignIn));