import React, { useState, Fragment } from 'react';
import { FormGroup, Label, Input, Col} from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';

import {PlusSquare, MinusSquare} from 'react-feather'
const plusSquare = <PlusSquare/>
const minusSquare = <MinusSquare/>


const ProductCard = (props) => {

  console.log(props)

  const ProductOptions = [{id:1,name: "Clothes"}, {id:2,name:"Services"}, {id:3,name:"Shows"}, {id:4,name: "Peace"}] //dummy date  //res_data.payload.data.product

  // const [singleSelections, setSingleSelections] = useState([]);
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
          onChange={(e) => props.handleChange(e, props.index)}
          // onInputChange={props.setProductName}
          options={ProductOptions}
          selected={props.value.productName}
          // value={props.value.productName}
          name="productName"
          style={{backgroundColor:"#d5deee"}}
        />
      </FormGroup>
      <FormGroup>
        <div className="form-row">
          <Col>
            <Label for="quantity">Quantity</Label>
            <div  style={{display: "flex"}}>
              <Input value={count} id="quantity" name="quantity" onChange={e=> setCount(e.target.value)} style={{backgroundColor: "#d5deee"}} />
              <div style={{display:"flex", marginTop:"5px"}}><span><i style={{ width: 15, fontSize: 10, padding: 11, color: '#848b97' }}  onClick={increment}>{plusSquare}</i></span><span><i style={{ width: 15, fontSize: 12, color: '#848b97' }} onClick={decrement}>{minusSquare}</i></span></div>
            </div>
          </Col>
          <Col>
            <Label for="discount">Discount</Label>
            <Input type="text" id="discount" onChange={(e) => props.handleChange(e, props.index)} value={props.value.discount} name="discount" style={{backgroundColor:"#d5deee"}} />
          </Col>
        </div>
      </FormGroup>
      <FormGroup>
        <div className="form-row">
          <Col>
            <Label for="price">Price</Label>
            <Input type="text" id="price" onChange={(e) => props.handleChange(e, props.index)} value={props.value.price} name="price" style={{backgroundColor:"#d5deee"}} />
          </Col>
          <Col>
            <Label for="amountPaid">Amount Paid</Label>
            <Input type="text" id="amountPaid" onChange={(e) => props.handleChange(e, props.index)} value={props.value.amountPaid} name="amountPaid" style={{backgroundColor:"#d5deee"}} />
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