import React, {Fragment, useState} from 'react';
import {Col, FormGroup, Input, Label} from 'reactstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';

import {MinusSquare, PlusSquare} from 'react-feather'
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {validateProductForm} from "./utils";

const plusSquare = <PlusSquare/>
const minusSquare = <MinusSquare/>


const ProductCard = (props) => {

    console.log(props.productOptions)
    const { handleSubmit} = useForm({mode: 'onBlur', defaultValues: {
            productName: "",
            amountPaid: "",
        }});

    const [productName, setProductName] = useState("")
    const [discount, setDiscount] = useState(0.0)
    const [price, setPrice] = useState(0.0)
    const [quantity, setQuantity] = useState(1)
    const [amountPaid, setAmountPaid] = useState("")

    const fields = {
        productName: {default: "", message: "Product name is required"},
        amountPaid: {default: "", message: "Paid amount is required"},
    }
    const decrement = () => {
       setQuantity(previous => previous - 1)
    };

    const increment = () => {
        setQuantity(previous => previous + 1)
    };




    function handleBlur(e) {
        const data = {
            productName,
            discount,
            price,
            quantity,
            amountPaid
        }
        const ers = validateProductForm(fields, data)
        if (ers.isErrors) {
            ers.errors.forEach(e => toast.error(e.msg))
        } else {
            props.handleChange(data)
        }
    }

    const handleProductName = (e) => {
        if (e[0] !== undefined) {
            setProductName(e[0].name)
        } else {
            setProductName("")
        }
    }
    return (
        <Fragment>
            <form onBlur={handleSubmit(handleBlur)}>
                <FormGroup>
                    <Label>Product Name</Label>
                    <Typeahead
                        id="basic-typeahead"
                        labelKey="name"
                        onChange={e => handleProductName(e)}
                        options={props.productOptions}
                        name="productName"
                        style={{backgroundColor: "#d5deee"}}
                        value={productName}
                    />
                </FormGroup>
                <FormGroup>
                    <div className="form-row">
                        <Col>
                            <Label for="quantity">Quantity</Label>
                            <div style={{display: "flex"}}>
                                <Input value={quantity} id="quantity" name="quantity"
                                       style={{backgroundColor: "#d5deee"}}/>
                                <div style={{display: "flex", marginTop: "5px"}}><span><i
                                    style={{width: 15, fontSize: 10, padding: 11, color: '#848b97'}}
                                    onClick={increment}>{plusSquare}</i></span><span><i
                                    style={{width: 15, fontSize: 12, color: '#848b97'}}
                                    onClick={decrement}>{minusSquare}</i></span></div>
                            </div>
                        </Col>
                        <Col>
                            <Label for="discount">Discount</Label>
                            <Input type="text" required id="discount" onChange={(e) => setDiscount(e.target.value)}
                                   value={discount}
                                   name="discount" style={{backgroundColor: "#d5deee"}}/>
                        </Col>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="form-row">
                        <Col>
                            <Label for="price">Price</Label>
                            <Input type="text" id="price" onChange={(e) => setPrice(e.target.value)}
                                   value={price}
                                   name="price" style={{backgroundColor: "#d5deee"}}/>
                        </Col>
                        <Col>
                            <Label for="amountPaid">Amount Paid</Label>
                            <Input type="text" required id="amountPaid" onChange={(e) => setAmountPaid(e.target.value)}
                                   value={amountPaid}
                                   name="amountPaid" style={{backgroundColor: "#d5deee"}}/>
                        </Col>
                    </div>
                </FormGroup>
            </form>
        </Fragment>
    )
}

ProductCard.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    productOptions: PropTypes.instanceOf(Array)
    // onClickQuantity: PropTypes.func.isRequired
}
export default ProductCard