// this component displays trade BALACES
// such as account TOTAL SALES AMOUNT, AMOUNT RECIEVED, AMOUNT RECIEVABLE

import React, { Fragment, useState } from 'react';
import {Container,Row,Col,Card,CardHeader,CardBody} from "reactstrap";

const SalesCashBalance = (props) => {


	return(
			 <Fragment>
	            <Container fluid={true} >
	                <Row>
	                    
	                    <Col xl="12" className="xl-100 box-col-12">
							<Card className="o-hidden">
							  <CardBody className="crypto-current">
							    <Row>
							      <Col xl="4" sm="12">
							        <div className="current-balance">
							        	<span className="f-12 f-w-600">Total Sales Cash</span>
							          <h2>
							          	<span className="mr-2">
							          		<i className="icofont icofont-cur-dollar"></i>
							          	</span>
							          	<span>3,459 909.2124</span>
							          </h2>
							          <div className="btn-vertical-align d-flex">
							            <button className="btn btn-pill btn-gradient-custom">
							            	Details
							            	<span className="round-shape">
							            		<i className="icofont icofont-arrow-right"></i>
							            	</span>
							            </button>
							          </div>
							        </div>
							      </Col>


							      <Col xl="4" sm="6">
							        <div className="current-balance">
							        	<span className="f-12 f-w-600">Recieved Cash</span>
							          <h2>
							          	<span className="mr-2">
							          		<i className="icofont icofont-cur-dollar"></i>
							          	</span>
							          	<span>2,567 900.000</span>
							          </h2>
							          <div className="btn-vertical-align d-flex">
							            <button className="btn btn-pill btn-gradient-custom" style={{ backgroundColor: "#51bc25" }}>
							            	Details
							            	<span className="round-shape">
							            		<i className="icofont icofont-arrow-right"></i>
							            	</span>
							            </button>
							          </div>
							        </div>
							      </Col>


							      <Col xl="4" sm="6">
							       	 <div className="current-balance">
							        	<span className="f-12 f-w-600">Recievable Cash</span>
							          <h2>
							          	<span className="mr-2">
							          		<i className="icofont icofont-cur-dollar"></i>
							          	</span>
							          	<span>959 123.2124</span>
							          </h2>
							          <div className="btn-vertical-align d-flex">
							            <button className="btn btn-pill btn-gradient-custom btn-sucess" style={{ backgroundColor: "#f10342" }}>
							            	Details
							            	<span className="round-shape">
							            		<i className="icofont icofont-arrow-right"></i>
							            	</span>
							            </button>
							          </div>
							        </div>
							      </Col>


							    </Row>
							  </CardBody>
							</Card>
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