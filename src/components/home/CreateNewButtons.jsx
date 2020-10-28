//create new sales Button, NEW PRODUCTS BUTTON, NEW CUSTOMER BUTTON

import React, {Fragment,useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Container,Row,Col,Card,CardHeader,CardBody,Button, ButtonGroup} from 'reactstrap';
import {UserPlus,ShoppingBag,ShoppingCart,Users,Database,Layers} from 'react-feather';


const CreateNewButtons = (props) => {
	const businessID = localStorage.getItem('__grm__act__biz__');

	return (
		<Fragment >
			<Container fluid={true}>
	      <Row >
            <Col sm="12" xl="3">
	            <NavLink to={`${process.env.PUBLIC_URL}/business/${businessID}/allcustomers`}>
		            <Card className="o-hidden">
		                <CardBody className="bg-primary b-r-4">
		                <div className="media static-top-widget">
		                    <div className="align-self-center text-center">
		                    	<Users/>
		                    </div>
		                    <div className="media-body">
		                    	<span className="m-0">Customers</span>
		                    	<h4 className="mb-0 counter">45631</h4>
		                    	<Users className="icon-bg"/>
		                    </div>
		                </div>
		                </CardBody>
		            </Card>
	            </NavLink>
            </Col>

            <Col className="d-sm-hidden sm-hidden" xl="1">
            </Col>


	        <Col sm="12" xl="3">
		  		<NavLink to={`${process.env.PUBLIC_URL}/business/${businessID}/allsales`}>
		            <Card className="o-hidden">
		              <CardBody className="bg-primary b-r-4 card-body">
		                <div className="media static-top-widget">
		                  <div className="align-self-center text-center">
		                  	<ShoppingBag/>
		                  </div>
		                  <div className="media-body">
		                  	<span className="m-0">Sales</span>
		                    <h4 className="mb-0 counter">9856</h4>
		                    <ShoppingBag className="icon-bg"/>
		                  </div>
		                </div>
		              </CardBody>
		            </Card>
		        </NavLink>
	        </Col>

	         <Col className="d-sm-hidden sm-hidden" xl="1">
            </Col>

	      	<Col sm="12" xl="3">
		      	<NavLink to={`${process.env.PUBLIC_URL}/business/${businessID}/allproducts`}>
		            <Card className="o-hidden">
		              <CardBody className="bg-primary b-r-4 card-body">
		                <div className="media static-top-widget">
		                  <div className="align-self-center text-center">
		                  	<Database/>
		                  </div>
		                  <div className="media-body">
		                  	<span className="m-0">Products</span>
		                    <h4 className="mb-0 counter">6659</h4>
		                    <Database className="icon-bg"/>
		                  </div>
		                </div>
		              </CardBody>
		            </Card>
	            </NavLink>
        	</Col>

        </Row>

        <Row>
	        <Col sm="12" xl="3">
	          	<NavLink to={`${process.env.PUBLIC_URL}/business/${businessID}/addsale`}>
		            <Card className="o-hidden">
		                <CardBody className="bg-default b-r-4">
		                <div className="media static-top-widget">
		                    <div className="align-self-center text-center">
		                    	<ShoppingCart/>
		                    </div>
		                    <div className="media-body">
		                    	<span className="m-0"> Create New sale</span>
		                    	
		                    	<ShoppingCart className="icon-bg"/>
		                    </div>
		                </div>
		                </CardBody>
		            </Card>
	            </NavLink>
	        </Col>

	         <Col className="d-sm-hidden sm-hidden" xl="1">
            </Col>

          	<Col sm="12" xl="3">
	          	<NavLink to={`${process.env.PUBLIC_URL}/business/${businessID}/addcustomer`}>
		            <Card className="o-hidden">
		                <CardBody className="bg-default b-r-4">
		                <div className="media static-top-widget">
		                    <div className="align-self-center text-center">
		                    	<UserPlus/>
		                    </div>
		                    <div className="media-body">
		                    	<span className="m-0"> Add New Customer</span>
		                    	
		                    	<UserPlus className="icon-bg"/>
		                    </div>
		                </div>
		                </CardBody>
		            </Card>
	            </NavLink>
            </Col>

             <Col className="d-sm-hidden sm-hidden" xl="1">
            </Col>

            <Col sm="12" xl="3">
	            <NavLink to={`${process.env.PUBLIC_URL}/business/${businessID}/addproduct`}>
		            <Card className="o-hidden">
		                <CardBody className="bg-default b-r-4">
		                <div className="media static-top-widget">
		                    <div className="align-self-center text-center">
		                    	<Layers/>
		                    </div>
		                    <div className="media-body">
		                    	<span className="m-0">Create New Product</span>
		                    	
		                    	<Layers className="icon-bg"/>
		                    </div>
		                </div>
		                </CardBody>
		            </Card>
	            </NavLink>
            </Col>


	      </Row> 
	    	</Container>         
		</Fragment>
	)
} 

export default  CreateNewButtons;