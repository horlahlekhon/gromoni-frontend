// this component displays trade BALACES
// such as account TOTAL SALES AMOUNT, AMOUNT RECIEVED, AMOUNT RECIEVABLE

import React, { Fragment, useState } from 'react';
import {Container,Row,Col,Card,CardHeader,CardBody} from "reactstrap";

const SalesCashBalance = (props) => {


	return(
			 <Fragment  >
	            <Container fluid={true} >
	                <Row >

	                    <Col xl="12" className="xl-100 box-col-12">
							
							    <Row>
					              <Col className="d-xl-none sm-hidden" sm="2">
					              </Col>


									<Col xl="4" sm="8">
	  					                <Card className="o-hidden text-center">
								  			<CardBody className="crypto-current">
										        <div className="current-balance">
										        	<span className="f-12 f-w-600">Total Sales Cash</span>
										          <h2>
										          	<span className="mr-2">
										          		<i className="icofont icofont-pound"></i>
										          	</span>
										          	<p>3,459 909.2124</p>
										          </h2>
										          
										        </div>
										 	</CardBody>
										</Card>
									</Col>

									<Col className="d-xl-none sm-hidden" sm="2">
					                </Col>


									<Col className="d-xl-none sm-hidden" sm="2">
					                </Col>
					                
									<Col xl="4" sm="8">
	  					                <Card className="o-hidden text-center">
								  			<CardBody className="crypto-current">
										        <div className="current-balance">
										        	<span className="f-12 f-w-600">Product Sold</span>
										          <h2>
										          	<span className="mr-2">
										          		<i className="icofont icofont-pound"></i>
										          	</span>
										          	<p>3,459 909.2124</p>
										          </h2>
										          
										        </div>
										 	</CardBody>
										</Card>
									</Col>

									<Col className="d-xl-none sm-hidden" sm="2">
					                </Col>

									<Col xl="4" sm="8">
	  					                <Card className="o-hidden text-center">
								  			<CardBody className="crypto-current">
										        <div className="current-balance text-center">
										        	<span className="f-12 f-w-600">Debt</span>
										          <h2>
										          	<span className="mr-2">
										          		<i className="icofont icofont-pound"></i>
										          	</span>
										          	<span>3,459 909.2124</span>
										          </h2>
										          <div className="btn-vertical-align d-flex">
										            <button className="btn btn-pill btn-gradient-custom">
										            	Track Debts
										            	<span className="round-shape">
										            		<i className="icofont icofont-arrow-right"></i>
										            	</span>
										            </button>
										          </div>
										        </div>
										 	</CardBody>
										</Card>
									</Col>

							    </Row>
							
						</Col>
	                </Row>
	            </Container>
	         </Fragment>
	)
}

export default SalesCashBalance;

						// <Row>
                          //  <Col className="text-center">02</Col>
                            //<Col className="text-center">October</Col>
                            //<Col className="text-center">2019</Col>
                          //</Row>