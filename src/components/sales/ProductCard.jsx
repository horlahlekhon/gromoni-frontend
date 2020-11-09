import React, { useState, Fragment } from 'react';
import { FormGroup, Label, Input, Col, CardBody } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';

import {PlusSquare, MinusSquare} from 'react-feather'
import { quantity } from 'chartist';
const plusSquare = <PlusSquare/>
const minusSquare = <MinusSquare/>


const ProductCard = (props) => {

  console.log(props)

  const ProductOptions = [{id:1,name: "Clothes"}, {id:2,name:"Services"}, {id:3,name:"Shows"}, {id:4,name: "Peace"}] //dummy date  //res_data.payload.data.product

  const [singleSelections, setSingleSelections] = useState([]);
  // from quantityIncrement.js
  const [count, setCount] = useState(1)

  const decrement = () => {
    if(count === 1){
      setCount(count)
    } else{
      setCount(count-1)
    }
  };

  const increment = () => {
    setCount(count+1)
  };

  return(
    <Fragment>
      <FormGroup>
        <Label>Product Name</Label>
        <Typeahead
          id="basic-typeahead"
          labelKey="name"
          onChange={setSingleSelections}
          options={ProductOptions}
          selected={singleSelections}
          value={props.value.productName}
          name="productName"
        />
      </FormGroup>
      <FormGroup>
        <div className="form-row">
          <Col>
            <Label for="quantity">Quantity</Label>
            <Input value={count} id="quantity" name="quantity" onChange={e=> setCount(e.target.value)} />
            <div><span><i style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}  onClick={increment}>{plusSquare}</i></span><span><i style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }} onClick={decrement}>{minusSquare}</i></span></div>
          </Col>
          <Col>
            <Label for="discount">Discount</Label>
            <Input type="text" id="discount" onChange={props.handleChange} value={props.value.discount} name="discount" />
          </Col>
        </div>
      </FormGroup>
      <FormGroup>
        <div className="form-row">
          <Col>
            <Label for="price">Price</Label>
            <Input type="text" id="price" onChange={props.handleChange} value={props.value.price} name="price" />
          </Col>
          <Col>
            <Label for="amountPaid">Amount Paid</Label>
            <Input type="text" id="amountPaid" onChange={ props.handleChange} value={props.value.amountPaid} name="amountPaid" />
          </Col>
        </div>
      </FormGroup>
    </Fragment>
  )
}

ProductCard.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  // onClickQuantity: PropTypes.func.isRequired
}




export default ProductCard