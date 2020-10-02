// this component displays trade BALACES
// such as account TOTAL SALES AMOUNT, AMOUNT RECIEVED, AMOUNT RECIEVABLE

import React, { Fragment, useState } from 'react';
import {Container,Row,Col,Card,CardHeader,CardBody} from "reactstrap";

const SalesCashBalance = (props) => {


	return(
			 <Fragment>
	            <Container fluid={true}>
	                <Row>
	                    <Col md="12" sm="12">
	                        <Card>
	                            <CardHeader className="b-l-primary">
	                                <h2> Balance Overview</h2>
	                            </CardHeader>
	                            <CardBody>
	                               <Row>
	                               		<Col xs="12" md="4">
	                               			<h5> Total Sales Cash </h5>
	                               			<p> #3,459 909.2124 </p>
	                               		</Col>

	                               		<Col xs="12" md="4">
	                               			<h5> Recieved Cash </h5>
	                               			<p> #2,567 900.000 </p>
	                               		</Col>

	                               		<Col xs="12" md="4">
	                               			<h5> Recievable Cash </h5>
	                               			<p> #959 123.2124 </p>
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