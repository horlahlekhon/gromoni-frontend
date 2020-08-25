import React, { useState } from 'react'
import { handleUserRegister } from '../../redux/actions/userActions';
import {Container,Row,Col,CardBody,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom'
import { validateForm, responseErrorParser } from './validator';
import {useCookie} from '@shopify/react-cookie';


const Register = (props) => {
  const [accessToken, setAccessToken] = useCookie('accessToken');
    const [refreshToken, setRefreshToken] = useCookie('refreshToken')
    const history = useHistory()
    const [fullName, setFullName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
    const [agree, setAgree] = useState(false)

    const genderOpts = {
        "Male": "M",
        "Female": "F",
        "Prefer not to say": "None"
      }
      const fields = {
        fullName: {default: '', message: 'Please enter a full name seprated by space'},
        username: {default: '', message: 'Please enter a username'},
        email: {default: '', message: 'Please enter an email'},
        phone: {default: '', message: 'Please enter a valid phone with standard format'},
        gender: {default: '', message: 'Please select a gender'},
        password: {default: '', message: 'Please enter a password'},
        agree: {default: false, message: 'Please Agree to continueu'},
      }

     const handleRegisterUser = async (e) => {
        e.preventDefault();
        const sta = {
            fullName: fullName,
            username: username,
            email: email,
            phone: phone,
            gender: gender,
            password: password,
            agree: agree,
        }
        const errorObj = validateForm(sta, fields);
        if(errorObj.isErrors) {
        //   this.setState({ showFormErrors: true, errors: errorObj.errors })
          setTimeout(() => {
            errorObj.errors.forEach((errorObj) => toast.error(errorObj.message))
          }, 3000)
        } else {
          const form = new FormData();
          const name = fullName.split(' ');
          form.append('firstName', name[0]);
          form.append('lastName', name[1] ? name[1] : '');
          form.append('username', username);
          form.append('phone', phone);
          form.append('gender', gender);
          form.append('password', password);
          form.append('email', email);
          const res_data = await props.register(form);
          if (res_data.status) {
            setAccessToken(res_data.payload.data.access)
              setRefreshToken(res_data.payload.data.refresh)
            setTimeout(() => {
              toast.info('Registeration successful')
            }, 200)
            props.history.push('/user/business/');
          }else {
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
                  <Input className="form-control" type="text" placeholder="Username"
                  value={username}
                  onChange={e => setUserName(e.target.value)}
                  required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                  <FormGroup>
                    <Input className="form-control"  type="email" placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
                  </FormGroup>
              </Col>
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
                  <Input className="form-control" type="password" placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
              <Col sm="4">
                <Button color="primary" type="submit"
                onClick={e => handleRegisterUser(e)}
                >{props.requestingReg ? 'Loading...' : 'Sign Up'}</Button>
              </Col>
              <Col sm="4">
                <FormGroup >
                  <div className="checkbox p-0 checkbox-primary">
                    <Input id="checkbox2" type="checkbox"  value={agree}
                    onChange={(e) => setAgree(!agree)}  />
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
const mapStateToProps = (state) => ({
    requestingReg: state.USER.isRequestingReg
  })
  
  const actions = {
      register: handleUserRegister
  };

  export default  connect(mapStateToProps, actions)(withRouter(Register));
