//create new sales Button, NEW PRODUCTS BUTTON, NEW CUSTOMER BUTTON

import React, {Fragment,useState} from 'react';
import {Container,Row,Col,Card,CardHeader,CardBody,Button, ButtonGroup} from 'reactstrap';


const CreateNewButtons = (props) => {
	

	return (
		<Fragment>
			<Container fluid={true}>
	      <Row>
	      	
	  		<Button className="col md-4 sm-12 btn-square btn-lg btn-air-light " color="light" style={{height:'50px'}}>
	  	 
	  			
	  				Light Button
	  			
	  		</Button>
	  	

	  	
	  		<Button className="col md-4 sm-12 btn-square btn-lg btn-air-light " color="light">
	  	 
	  			Light Button
	  		</Button>
	  	

	  	
	  		<Button className="col md-4 sm-12 btn-square btn-lg btn-air-light" size="lg" color="light">
	  	 
	  			Light Button
	  		</Button>
	      	
	      </Row> 
	    	</Container>         
		</Fragment>
	)
} 

export default  CreateNewButtons;