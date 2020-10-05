//create new sales Button, NEW PRODUCTS BUTTON, NEW CUSTOMER BUTTON

import React, {Fragment,useState} from 'react';
import {Container,Row,Col,Card,CardHeader,CardBody,Button, ButtonGroup, } from 'reactstrap';
import {UserPlus,FolderPlus,ShoppingCart,Users,Database} from 'react-feather';


const CreateNewButtons = (props) => {
	

	return (
	<div>
		<Fragment>
			<Container fluid={true}>
			<h3> this section is for companies without data</h3>
	      <Row>
	      	<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
	  				<div>
	  					<ShoppingCart />
	  				</div>
  					Create New Sales
	  				
	  			</Button>
	  		</Col>

	  		<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
	  				<div>
	  					<UserPlus />
	  				</div>
  					Create New Customer
	  			</Button>
	  		</Col>

	  		<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
  					<div>
  						<FolderPlus />
  					</div>
  					Create New Product
	  			</Button>
	  		</Col>
	  	
	      </Row> 
	    	</Container>         
		</Fragment>

		<Fragment>
			<Container fluid={true}>
			<h3> this section is for companies with data</h3>
	      <Row>
	      	<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
	  				<div>
	  					<i>
	  						<ShoppingCart />
	  					</i>
	  					<span>
	  						Total Sales
	  					</span>
	  				</div>
	  				<p>10,900</p>
	  			</Button>
	  		</Col>

	  		<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
	  				<div>
		  				<i>
		  					<Users />
		  				</i>
	  					<span>
	  						Customers
	  					</span>
	  				</div>
	  				<p> 2,567</p>
	  			</Button>
	  		</Col>

	  		<Col md="4" sm="12">
	  			<Button className="col  btn-square btn-air-light" size="lg" block color="light" >
  					<div>
  						<i> 
  							<Database />
  						</i>
  						<span>
  							Products
  						</span>
  					</div>
  					<p>320</p>
	  			</Button>
	  		</Col>
	  	
	      </Row> 
	    	</Container>         
		</Fragment>

	</div>
	)
} 

export default  CreateNewButtons;