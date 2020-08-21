import React from 'react';
import { handleUserRegister } from '../../redux/actions/userActions';
import {Container,Row,Col,CardBody,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { validateRegisterForm } from './validator';


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
  fields = {
    fullName: '',
    username: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    agree: false,
  }
  handleSetFormStateValue(key, value) { 
    return this.setState({ [key]: value })
  }


  async handleRegisterUser(e) {
    e.preventDefault();
  
    const errorObj = validateRegisterForm(this.state, this.fields);
    if(errorObj.isErrors) {
      this.setState({ showFormErrors: true, errors: errorObj.errors })
      setTimeout(() => {
        errorObj.errors.forEach((errorObj) => toast.error(errorObj.message))
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
      //  FIXME res_Data now returns a payload object of the error or success, destructure the json to proper Js object and throw errors in case of errors.
      if (res_data.status) {
        setTimeout(() => {
          toast.info('Registeration successful')
        }, 200)
        this.props.history.push('/dashboard');
      }else {
        setTimeout(() => {
          toast.error(res_data.message)
        }, 300);
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
                  <Input className="form-control"  type="email" placeholder="Email"
                  value={this.state.email}
                  onChange={e => this.handleSetFormStateValue('email', e.target.value)}
                  required
                  />
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                <Input className="form-control" type="tel" placeholder="Phone"
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
                <Input className="custom-select" type="select" placeholder="Gender"
                  value={this.state.gender}
                  onChange={e => this.handleSetFormStateValue('gender', e.target.value)}
                  required
                  >
                    <option value="">select gender</option>
                  {Object.keys(this.genderOpts).map((opt, idx) => (
                    <option value={this.genderOpts[opt]} key={idx}>{opt}</option>
                  ))}
                </Input>
             </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm="4">
              <Button color="primary" type="submit"
              onClick={e => this.handleRegisterUser(e)}
              >{this.props.requestingReg ? 'Loading...' : 'Sign Up'}</Button>
            </Col>
            <Col sm="4">
              <FormGroup >
                <div className="checkbox p-0 checkbox-primary">
                  <Input id="checkbox2" type="checkbox"  value={this.state.agree}
                  onChange={(e) => this.handleSetFormStateValue('agree', !this.state.agree)}  />
                  <Label className="mb-1" for="checkbox2"> <a href="#">Terms and Conditions</a></Label>
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
  requestingReg: state.USER.isRequestingReg
})

const actions = {
	register: handleUserRegister
};

export default  connect(mapStateToProps, actions)(withRouter(Register));
