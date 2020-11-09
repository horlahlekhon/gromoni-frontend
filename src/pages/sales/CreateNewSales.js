import React, { Fragment, useState } from 'react';
import {Form, FormGroup, Container, Label, Input, Card, Col, Row, CardBody, Button} from 'reactstrap';
import {toast} from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import {useLocation, withRouter} from 'react-router';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import {validateCreateNewSaleForm, responseErrorParser} from "../../components/authentication/validator"

// productCard.js

import ProductCard from '../../components/sales/ProductCard'


const CreateNewSale = (props) => {

  const [isCreatingNewSale, setIsCreatingNewSale]  = useState(false)
  const [singleSelections, setSingleSelections] = useState([]);

  // from the productCard.js 

  const [newProductValues, setNewProductValues] = React.useState([{
    discount: "",
    price: "",
    amountPaid: "",
    quantity: "1",
    productName: "",
  }]);

  const [customerName, setCustomerName] = useState('')
  const [date, setDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [vat, setVat] = useState('')

  const handleChange = (index, event) => {
    console.log( event )
    const values = [...newProductValues];
    values[index][event.target.name] = event.target.value
    setNewProductValues(values);
    // setNewProductValues({
    //   ...newProductValues,
    //   [event.target.name]: event.target.value
    // });
  }

  const handleAddFields = () => {
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
      <Container>
        <Form>
          <Card>
            <CardBody>
              <FormGroup>
                <Label>Customer Name</Label>
                <Typeahead
                  id="basic-typeahead"
                  labelKey="name"
                  onChange={e => setCustomerName(e.target.value)}
                  options={customerOptions}
                  selected={singleSelections}
                  value={customerName}
                  name="customerName"
                />
              </FormGroup>
            </CardBody>
          </Card>
          { newProductValues.map((newProductValue, index) => (
            <div>
              <Card key ={index}>
                <CardBody>
                  <ProductCard handleChange={handleChange} value={newProductValue} />
                </CardBody>
              </Card>
            </div>  
          ))}
            <Row>
              <Col>
                <Button onClick={() => handleAddFields()}>Add</Button>
              </Col>
              <Col>
                <Button onClick={() => handleRemoveFields()}>Remove</Button>
              </Col>
            </Row>
          <Card>
            <CardBody>
              <FormGroup>
                <div className="form-row">
                  <Col>
                    <Label for="date">Date</Label>
                    <Input className="form-control digits" type="date" defaultValue="2018-01-01" value={date} onChange={e => setDate(e.target.value)}/>
                  </Col>
                  <Col>
                    <Label for="dueDate">Due Date</Label>
                    <Input className="form-control digits" type="Date" defaultValue="2018-01-01" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                  </Col>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-row">
                  <Col>
                    <Label for="vat">VAT %</Label>
                    <Input type="text" id="vat" value={vat} onChange={e => setVat(e.target.value)} />
                  </Col>
                </div>
              </FormGroup>
              <div>
                <p>Only click cleared if this sales have been paid in full</p>
                <Row>
                  <Col>
                    <Button>Cleared</Button>
                  </Col>
                  <Col>
                    <Button>Not Cleared</Button>
                  </Col>
                </Row>
              </div>
              <Row className="m-t-25">
                <Col>
                  <Button>SAVE</Button>
                </Col>
                <Col>
                  <Button onClick={e => handleCreateNewSale(e)}>CREATE</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </Container>
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