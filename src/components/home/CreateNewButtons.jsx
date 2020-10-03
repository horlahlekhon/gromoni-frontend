//create new sales Button, NEW PRODUCTS BUTTON, NEW CUSTOMER BUTTON

import React, {Fragment,useState} from 'react';
import {Container,Row,Col,Card,CardHeader,CardBody,Button, ButtonGroup,FatAdd, Cart, Users} from 'reactstrap';

const CreateNewButtons = (props) => {
	

	return (
		<Fragment>
			<Container fluid={true}>
	      <Row>
	      	<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
	  				<FatAdd />
  					Create New Sales
	  				}
	  			</Button>
	  		</Col>

	  		<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
	  				<User />
  					Create New Customer
	  			</Button>
	  		</Col>

	  		<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
  					<Cart />
  					Create New Product
	  			</Button>
	  		</Col>
	  	
	      </Row> 
	    	</Container>         
		</Fragment>
	)
} 

export default  CreateNewButtons;