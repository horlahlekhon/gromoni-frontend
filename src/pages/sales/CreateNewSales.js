import React, {Fragment, useState} from 'react';
import {Button, ButtonGroup, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, Table} from 'reactstrap';
import {toast} from 'react-toastify';
import {Typeahead} from 'react-bootstrap-typeahead';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import {validateCreateNewSaleForm,} from "../../components/authentication/validator"

import ProductCard from '../../components/sales/ProductCard'

import {Trash2} from 'react-feather'

const trash2 = <Trash2/>

const CreateNewSale = () => {

    const [, setIsCreatingNewSale] = useState(false)

    const [newProductValues, setNewProductValues] = useState([{
        productName: "",
        discount: "",
        price: "",
        amountPaid: "",
        quantity: "1",
    }]);

    const [customerName, setCustomerName] = useState("")
    const [date, setDate] = useState(new Date())
    const [dueDate, setDueDate] = useState('')
    const [vat, setVat] = useState(0.0)
    const [saleStatus, setSaleStatus] = useState()
    const handleEventChange = (e) => {
        console.log("onCHange event", e)
    }
    const handleChange = (index) => {
        return (payload) => {
            const productValues = newProductValues
            productValues[index] = payload
            setNewProductValues(newProductValues)
        }
    }

    const handleAddFields = (e) => {
        setNewProductValues([...newProductValues, {
            discount: "", price: "",
            amountPaid: "",
            quantity: "1",
            productName: "",
        }])
    }

    const handleRemoveFields = (index) => {
        const values = [...newProductValues];
        values.splice(index, 1);
        setNewProductValues(values);
    }

    const customerOptions = [{id: 1, name: "Olalekan"}, {id: 2, name: "Michael"}, {id: 3, name: "Emeka"}, {
        id: 4,
        name: "Glory"
    }] //dummy data  //res_data.payload.data.customer

    const fields = {
        customer_name: {default: "", message: 'Please enter an already created customer name'},
        date: {default: '', message: 'Please enter date'},
        due_date: {default: '', message: 'Please enter due date given'},
    }

    const handleCreateNewSale = async (e) => {
        console.log("product values", newProductValues)
        e.preventDefault()
        setIsCreatingNewSale(true);
        const responsePayload = {
            customer_name: customerName,
            date: date,
            due_date: dueDate,
            vat: vat
        }
        const errors = validateCreateNewSaleForm({saleData: responsePayload, productData: newProductValues}, fields)
        if (errors.isErrors) {
            setIsCreatingNewSale(false)
            setTimeout(() => {
                errors.errors.forEach(e => toast.error(e.message))
            }, 400);
        } else {
            const sales = newProductValues.map(e => {
                return {
                    product: e.productName,
                    quantity: e.quantity,
                    credit_due_date: responsePayload.due_date,
                    description: "", // TODO PRODUCT FORMS SHOULD HAVE A DESCRIPTION text area
                    payment: e.amountPaid
                }
            })
            delete responsePayload.due_date
            console.log({...responsePayload, sales})
            /// call API and send value
        }
    }

    const handleCustomerName = (e) => {
        if (e[0] !== undefined) {
            setCustomerName(e[0].name)
        } else {
            setCustomerName("")
        }
    }

    const productOptions = [{id: 1, name: "Clothes"}, {id: 2, name: "Services"}, {id: 3, name: "Shows"}, {
        id: 4,
        name: "Peace"
    }] //dummy date  //res_data.payload.data.product
    return (
        <Fragment>
            <div style={{display: "flex", fontFamily: "'Poppins', sans-serif"}}>
                <div className="col-lg-10" style={{maxWidth: "500px", width: "100%"}}>
                    <Form>
                        <Card>
                            <CardBody>
                                <FormGroup>
                                    <Label>Customer Name</Label>
                                    <Typeahead
                                        id="basic-typeahead"
                                        labelKey="name"
                                        onChange={e => handleCustomerName(e)}
                                        options={customerOptions}
                                        value={customerName}
                                        name="customerName"
                                        style={{backgroundColor: "#d5deee"}}
                                    />
                                </FormGroup>
                            </CardBody>
                        </Card>
                        {newProductValues.map((newProductValue, index) => (
                            <div key={index}>
                                <Card>
                                    <CardBody>
                                        <Col style={{textAlign: "right"}}>
                                            {
                                                newProductValues.length !== 1 &&
                                                <i onClick={() => handleRemoveFields(index)}>{trash2}</i>
                                            }
                                        </Col>
                                        <ProductCard
                                            index={index}
                                            handleChange={handleChange(index)}
                                            onInputChange={handleEventChange} value={newProductValue}
                                            productOptions={productOptions}
                                        />
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                        <Row>
                            <Col>
                                <p onClick={() => handleAddFields()} style={{marginLeft: "20px"}}><span
                                    style={{fontSize: "18px"}}>+</span> Add another product</p>
                            </Col>
                        </Row>
                        <Card>
                            <CardBody>
                                <FormGroup>
                                    <div className="form-row">
                                        <Col>
                                            <Label for="date">Date</Label>
                                            <Input className="form-control digits" type="date" defaultValue="2018-01-01"
                                                   value={date} onChange={e => setDate(e.target.value)} id="date"
                                                   name="date" style={{backgroundColor: "#d5deee"}}/>
                                        </Col>
                                        <Col>
                                            <Label for="dueDate">Due Date</Label>
                                            <Input className="form-control digits" type="date" defaultValue="2018-01-01"
                                                   value={dueDate} onChange={e => setDueDate(e.target.value)}
                                                   id="dueDate" name="dueDate" style={{backgroundColor: "#d5deee"}}/>
                                        </Col>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="form-row">
                                        <Col>
                                            <Label for="vat">VAT %</Label>
                                            <Input type="text" id="vat" value={vat}
                                                   onChange={e => setVat(e.target.value)}
                                                   style={{backgroundColor: "#d5deee"}}/>
                                        </Col>
                                    </div>
                                </FormGroup>
                                <div style={{margin: "0 auto", textAlign: "center"}}>
                                    <p style={{fontSize: "12px"}}>Only click cleared if this sales have been paid in
                                        full</p>
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
                                        <Button outline color="primary" size="lg"
                                                style={{maxWidth: "200px", width: "100%"}}>SAVE</Button>
                                    </Col>
                                    <Col lg={`6`}>
                                        <Button color="primary" size="lg" onClick={e => handleCreateNewSale(e)}
                                                style={{maxWidth: "200px", width: "100%"}}>CREATE</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Form>
                </div>
                <div className="col-lg-2"
                     style={{backgroundColor: "#eaf6fd", position: "fixed", right: 0, height: "100%",}}>
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
                            <tr style={{fontWeight: "bold"}}>
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



export default CreateNewSale