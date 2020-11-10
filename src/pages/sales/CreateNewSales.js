import React, { Fragment, useState } from 'react';
import {Form, FormGroup, Label, Input, Card, Col, Row, CardBody, Button, ButtonGroup, Table} from 'reactstrap';
import {toast} from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import { withRouter} from 'react-router';
// import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import {validateCreateNewSaleForm, responseErrorParser} from "../../components/authentication/validator"

// productCard.js

import ProductCard from '../../components/sales/ProductCard'

import {Trash2} from 'react-feather'
const trash2 = <Trash2/>

const CreateNewSale = (props) => {

  const [, setIsCreatingNewSale]  = useState(false)
  // const [singleSelections, setSingleSelections] = useState([]);

  // from the productCard.js 

  const [newProductValues, setNewProductValues] = useState([{
    discount: "",
    price: "",
    amountPaid: "",
    quantity: "1",
    productName: [],
  }]);

  const [customerName, setCustomerName] = useState([])
  const [date, setDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [vat, setVat] = useState('')
  // const [visible, setVisible] = useState(false)

  const handleChange = (event, index) => {
    console.log( event )
    const values = [...newProductValues];
    values[index][event.target.name] = event.target.value
    console.log('=======================>', values)
    setNewProductValues(values);
    // setnewProductValue({
    //   ...newProductValue,
    //   [event.target.name]: event.target.value
    // });
  }

  const handleAddFields = (e) => {
    setNewProductValues([...newProductValues, {discount:"", price: "",
    amountPaid: "",
    quantity: "1",
    productName: "",}])
  }

  const handleRemoveFields = (index) => {
    const values  = [...newProductValues];
    values.splice(index, 1);
    setNewProductValues(values);
  }

  const customerOptions = [{id: 1, name: "Olalekan"}, {id: 2, name:"Michael"}, {id: 3,name:"Emeka"}, {id:4,name: "Glory"}] //dummy data  //res_data.payload.data.customer

  const fields = {
    customer_name: { default: '', message: 'Please enter an already created customer name' },
    product_name: { default: '', message: 'Please enter an already created customer name' },
    quantity: { default: '', message: 'Please select a quantity' },
    discount: { default: '', message: 'Please enter the discount given' },
    price: { default: '', message: 'Please select the price given' },
    amount_paid: { default: '', message: 'Please enter the amount paid by the customer' },
    date: { default: '', message: 'Please enter date' },
    due_date: { default: '', message: 'Please enter due date given' },
    vat: { default: '', message: 'Please enter the vat' },
  }

  const handleCreateNewSale = async (e) => {
    e.preventDefault()
    setIsCreatingNewSale(true);
    const responsePayload = {
      customer_name: customerName,
      product_name: newProductValues.productName,
      quantity: newProductValues.quantity,
      discount: newProductValues.discount,
      price: newProductValues.price,
      amount_paid: newProductValues.amountPaid,
      date: date,
      due_date: dueDate,
      vat: vat
    }
    const errors = validateCreateNewSaleForm(responsePayload, fields)
    if (errors.isErrors) {
      setIsCreatingNewSale(false)
      setTimeout(() => {
          errors.errors.forEach(e => toast.error(e.message))
      }, 400);
    } else {
      const response = await props.CreateNewSale(responsePayload)
      if (response.status) {
        const newSale = response.payload.data.id
        localStorage.setItem('__grm__act__biz__', newSale.toString())
        // props.history.push(`/business/${newSale}.toString/sales/invoice`, {previousLocation: props.location.pathname})
      } else {
        setIsCreatingNewSale(false)
        const payload = response.payload
        const errs = responseErrorParser(payload.data)
        setTimeout(() => {
            errs.forEach(e => toast.error(e.message))
        }, 400);
      }
    }
  }

  return(
    <Fragment>
      <div style={{display:"flex", fontFamily:"'Poppins', sans-serif"}}>
        <div className="col-lg-10"  style={{margin: "0 auto", maxWidth:"500px", width:"100%"}}>
          <Form>
            <Card>
              <CardBody>
                <FormGroup>
                  <Label>Customer Name</Label>
                  <Typeahead
                    id="basic-typeahead"
                    labelKey="name"
                    onChange={setCustomerName}
                    options={customerOptions}
                    selected={customerName}
                    value={customerName}
                    name="customerName"
                    style={{backgroundColor:"#d5deee"}}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            { newProductValues.map((newProductValue, index) => (
              <div>
                <Card key={index}>
                  <CardBody>
                    <Col style={{textAlign: "right"}}>
                      <i onClick={() => handleRemoveFields()} >{trash2}</i>
                    </Col>
                    <ProductCard index={index} handleChange={handleChange} value={newProductValue} />
                  </CardBody>
                </Card>
              </div>  
            ))}
              <Row>
                <Col>
                  <p onClick={() => handleAddFields()} style={{marginLeft:"20px"}}> <span style={{fontSize:"18px"}}>+</span> Add another product</p>
                </Col>
              </Row>
            <Card>
              <CardBody>
                <FormGroup>
                  <div className="form-row">
                    <Col>
                      <Label for="date">Date</Label>
                      <Input className="form-control digits" type="date" defaultValue="2018-01-01" value={date} onChange={e => setDate(e.target.value)} id="date" name="date" style={{backgroundColor:"#d5deee"}} />
                    </Col>
                    <Col>
                      <Label for="dueDate">Due Date</Label>
                      <Input className="form-control digits" type="date" defaultValue="2018-01-01" value={dueDate} onChange={e => setDueDate(e.target.value)} id="dueDate" name="dueDate" style={{backgroundColor:"#d5deee"}} />
                    </Col>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-row">
                    <Col>
                      <Label for="vat">VAT %</Label>
                      <Input type="text" id="vat" value={vat} onChange={e => setVat(e.target.value)} style={{backgroundColor:"#d5deee"}} />
                    </Col>
                  </div>
                </FormGroup>
                <div style={{margin:"0 auto", textAlign:"center"}}>
                  <p style={{fontSize:"12px"}}>Only click cleared if this sales have been paid in full</p>
                  <Row>
                    <Col>
                      <ButtonGroup>
                        <Button outline color="primary" type="button">Cleared</Button>
                        <Button outline color="primary" type="button">Not Cleared</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </div>
                <Row className="m-t-50">
                  <Col lg={`6`}>
                    <Button outline color="primary" size="lg" style={{maxWidth:"200px", width:"100%"}}>SAVE</Button>
                  </Col>
                  <Col lg={`6`}>
                    <Button color="primary" size="lg" onClick={e => handleCreateNewSale(e)} style={{maxWidth:"200px", width:"100%"}}>CREATE</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </div>false)
        <div className="col-lg-2" style={{backgroundColor:"#eaf6fd", position:"fixed", right:0, height:"100%",}}>
          <Card className="m-t-50">
            <CardBody>
              <div>You have added <span>0</span> products</div>              
            </CardBody>
          </Card>
          <div className="table-responsive">
            <Table borderless>
              <tbody>
                <tr>
                  <td className="bd-t-none">Sub Total</td>
                  <td>000 000 000</td>
                </tr>
                <tr style={{fontWeight:"bold"}}>
                  <td className="bd-t-none">Total</td>
                  <td>000 000 000</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  requestingCreateNewSale: state.isRequestingCreateNewSale,
});

const actions = {
  CreateNewSale: CreateNewSale
};

export default connect(mapStateToProps, actions)(withRouter(CreateNewSale))