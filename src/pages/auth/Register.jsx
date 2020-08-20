import React from 'react';
import { handleUserRegister } from '../../redux/actions/userActions';
import {Container,Row,Col,CardBody,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';


class Register extends React.Component {
  state = {
    fullName: '',
    username: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    agree: false,
    showFormErrors: false,
    errors: [],
    alertData: {}
  }
   genderOpts = {
    "Male": "M",
    "Female": "F",
    "Prefer not to say": "None"
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
    if (!this.state.email) {
      errors.push({ item: 'email', message: 'Email cannot be empty'})
    } else {
      idx = errors.findIndex((data) => data.item === 'email');
      errors.splice(0, idx)
    }
    if (!this.state.phone) {
      errors.push({ item: 'phone', message: 'Phone cannot be empty'})
    } else {
      idx = errors.findIndex((data) => data.item === 'phone');
      errors.splice(0, idx)
    }
    if (!this.state.gender) {
      
      errors.push({ item: 'gender', message: 'Gender cannot be empty'})
    } else {
      idx = errors.findIndex((data) => data.item === 'gender');
      errors.splice(0, idx)
    }
    if (!this.state.password) {
      errors.push({ item: 'password', message: 'Password cannot be empty'})
    } else {
      idx = errors.findIndex((data) => data.item === 'password');
      errors.splice(0, idx)
    }
    if (!this.state.agree) {
      errors.push({ item: 'agree', message: 'Please agree to continue'})
    } else {
      idx = errors.findIndex((data) => data.item === 'agree');
      errors.splice(0, idx)
    }
    if (errors.length <= 0) {
      return { isErrors: false, errors: []}
    } else {
      return { isErrors: true, errors};
    }
  }
  async handleRegisterUser(e) {
    e.preventDefault();
  
    const errorObj = this.handleValidateForm();
    if(errorObj.isErrors) {
      this.setState({ showFormErrors: true, errors: errorObj.errors })
      errorObj.errors.forEach((errorObj) => toast.error(errorObj.message))
      setTimeout(() => {
        this.setState({ showFormErrors: false, errors: [] })
      }, 3000)
    } else {
      const form = new FormData();
      const fullName = this.state.fullName.split(' ')
      form.append('firstName', fullName[0]);
      form.append('lastName', fullName[1] ? fullName[1] : '')
      form.append('username', this.state.username);
      form.append('phone', this.state.phone);
      form.append('gender', this.state.gender);
      form.append('password', this.state.password);
      form.append('email', this.state.email)
      console.log(`inside handle register: ${this.state}`)
      const res_data = await this.props.register(form);
      if (res_data.status) {
        this.props.history.push('/dashboard');
      }else {
        this.setState({alertData: {
					title: 'Error',
					message: res_data.message
        }});
        
        // Swal.fire({
				// 	title: 'Error',
				// 	icon: 'error',
				// 	text: 'Registration Error',
				// 	confirmButtonText: 'Ok',
				// 	showCloseButton: true,
				// })
      }
    }

  }

  render(){
    return (
      <div>
        <Form className="theme-form" onSubmit={e => e.preventDefault()}>
          <h4 className="text-center">NEW USER</h4>
          <h6 className="text-center">Enter your Credentials</h6>
          <Row form>
            <Col md="12">
              <FormGroup>
                <Input className="form-control" type="text" placeholder="Full name"
                value={this.state.fullName}
                onChange={e => this.handleSetFormStateValue('fullName', e.target.value)}
                required
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Input className="form-control" type="text" placeholder="Username"
                value={this.state.username}
                onChange={e => this.handleSetFormStateValue('username', e.target.value)}
                required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
                <FormGroup>
                  <Input className="form-control" type="text" placeholder="Email"
                  value={this.state.email}
                  onChange={e => this.handleSetFormStateValue('email', e.target.value)}
                  required
                  />
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                  <Input className="form-control" type="text" placeholder="Phone"
                  value={this.state.phone}
                  onChange={e => this.handleSetFormStateValue('phone', e.target.value)}
                  required
                  />
                </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Input className="form-control" type="password" placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.handleSetFormStateValue('password', e.target.value)}
                  required
                  />
             </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Input className="form-control" type="select" placeholder="Gender"
                  value={this.state.gender}
                  onChange={e => this.handleSetFormStateValue('gender', e.target.value)}
                  required
                  >
                  {Object.keys(this.genderOpts).map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </Input>
             </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm="4">
              <Button color="primary" type="submit"
              onClick={e => this.handleRegisterUser(e)}
              >{this.props.requestingLog ? 'Loading...' : 'Sign Up'}</Button>
            </Col>
            <Col sm="4">
              <FormGroup>
                <div className="radio radio-primary">
                  <Input id="radioinline1" type="radio" name="radio1" value="option1" 
                  value={this.state.agree}
                  onClick={(e) => this.handleSetFormStateValue('agree', !this.state.agree)} 
                  /> 
                  <Label className="mb-5" for="radioinline1">I agree to the  <a href="javascript:void(0);">Terms and Conditions</a></Label>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <div className="form-divider"></div>
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
}

const mapStateToProps = (state) => ({
  requestingLog: state.USER.isRequestingReg
})

const actions = {
	register: handleUserRegister
};

export default  connect(mapStateToProps, actions)(withRouter(Register));
