import React from 'react';
import { handleUserLogin } from '../../redux/actions/userActions';

import {Container,Row,Col,CardBody,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


import { withRouter } from 'react-router';
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import Register from './Register';



class SignIn extends React.Component {
  state = {
		
      username: '',
      password: '',
      errors: [],
  }
  handleSetFormStateValue(key, value) { 
    return this.setState({ [key]: value })
  }
  
  handleValidateForm() {
		let errors = [];
		let idx;
		if (!this.state.username) {
			errors.push({ item: 'username', message: 'Username cannot be empty'})
		} else {
			idx = errors.findIndex((data) => data.item === 'username');
      errors.splice(0, idx)
		}
		if (!this.state.password) {
      errors.push({ item: 'password', message: 'Password cannot be empty'})
    } else {
      idx = errors.findIndex((data) => data.item === 'password');
      errors.splice(0, idx)
		}
		if (errors.length <= 0) {
      return { isErrors: false, errors: []}
    } else {
      return { isErrors: true, errors};
    }
  }
  
  async handleLoginUser(e) {
		e.preventDefault();
		const errorObj = this.handleValidateForm();
		if(errorObj.isErrors) {
      // this.setState({ showFormErrors: true, errors: errorObj.errors })
      setTimeout(() => {
        toast.error(errorObj.errors[0].message)
        errorObj.errors.forEach((errorObj) => toast.error(errorObj.message))
      }, 200)
    } else {
      const form = new FormData();
      form.append('username', this.state.username);
			form.append('password', this.state.password);
		
			const res_data = await this.props.login(form);
			if (res_data.status) {
				this.props.history.push('/dashboard');
			} else {
        toast.error(`Error: ${res_data.message}`);
				
			}
		}
  }
  
  render(){
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
                            <Form className="theme-form" onSubmit={e=>e.preventDefault()}>
                            <ToastContainer />
                              <h4>SIGN IN</h4>
                              <h6>Enter your Username and Password</h6>
                              <FormGroup>
                                <Label className="col-form-label pt-0">Your Name</Label>
                                <Input 
                                className="form-control" type="text" required=""
                                 value={this.state.username} 
                                 onChange={e => this.handleSetFormStateValue('username', e.target.value)}/>
                              </FormGroup>
                              <FormGroup>
                                <Label className="col-form-label">Password</Label>
                                <Input 
                                  className="form-control" type="password" required=""
                                  value={this.state.password}
                                  onChange={e => this.handleSetFormStateValue('password', e.target.value)}/>
                              </FormGroup>
                              <div className="checkbox p-0">
                                <Input id="checkbox1" type="checkbox"/>
                                <Label for="checkbox1">Remember me</Label>
                              </div>
                              <FormGroup className="form-row mt-3 mb-0">
                                <Button color="primary btn-block"
                                onClick={ e=> this.handleLoginUser(e)}
                                >{this.props.requestingLog ? 'Loading...' : 'Sign In'}</Button>
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
                          <Register/>
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
}

// const SignIn = (props) => {
   
// }
const mapStateToProps = (state) => ({
	requestingLog: state.USER.isRequestingLog
});

const actions = {
	login: handleUserLogin
};
export default  connect(mapStateToProps, actions)(withRouter(SignIn));