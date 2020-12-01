// this component displays trade BALACES
// such as account TOTAL SALES AMOUNT, AMOUNT RECIEVED, AMOUNT RECIEVABLE, product sold

import React, { Fragment } from 'react';
import {Container,Row,Col,Card,CardBody} from "reactstrap";
import {TrendingUp, Square} from 'react-feather'

import {formatMoney} from "../common/utilityFunctions";
 
import '../../assets/images/other-images/salesStatBar.jpg'

const SalesCashBalance = (props) => {

	const trendingCash = {
		color: "#51bc25",
		height: "18px",
		width: "18px"
	}

	const trendingProduct = {
		color: "rgb(21, 141, 247)",
		height: "18px",
		width: "18px"
	}

	const trendingDebt = {
		color: "#f10342",
		height: "18px",
		width: "18px"
	}

	const squreCash = { 
		fill: "#51bc25",
		color: "#51bc25",
		height: "10px",
		width: "10px"
	}
	const squreProduct = { 
		fill: "rgb(21, 141, 247)",
		color: "rgb(21, 141, 247)",
		height: "10px",
		width: "10px"
	}
	const squreDebt = { 
		fill: "#f10342",
		color: "#f10342",
		height: "10px",
		width: "10px"
		
	}

	return(
		 <Fragment  >
	        <Container fluid={true} >
	      
			    <Row>
	              <Col className="d-xl-none" sm="2">
	              </Col>


					<Col xl="4" sm="8">
			            <Card className="o-hidden text-center bg-statBar">
				  			<CardBody className="crypto-current">
						        <div className="current-balance">
						        	
					        		<h4 >
						        		<span className="f-12 f-w-600">
						        			TOTAL SALES CASH
						        		</span>

						        		< Square style={squreCash}/>

						        	</h4>
						          	<h3>
						          		{formatMoney(3459909.2124)}
						          	</h3>

						          <div>
						          	<span style={trendingCash}> <TrendingUp /> </span>
						          	<span> {formatMoney(2345623)} </span>
						          </div>
						          
						        </div>
						 	</CardBody>
						</Card>
					</Col>

					<Col className="d-xl-none" sm="2">
	                </Col>


					<Col className="d-xl-none" sm="2">
	                </Col>
	                
					<Col xl="4" sm="8">
			                <Card className="o-hidden text-center bg-statBar">
				  			<CardBody className="crypto-current">
						        <div className="current-balance">
						        	<h4>
							        	<span className="f-12 f-w-600">Product Sold</span>
							          	< Square style={squreProduct}/>
						          	</h4>
						          	<h3>
						          		3459
						          	</h3>

						          <div>
						          	<span style={trendingProduct}> <TrendingUp /> </span>
						          	<span> 45</span>
						          </div>
						          
						        </div>
						 	</CardBody>
						</Card>
					</Col>

					<Col className="d-xl-none" sm="2">
	                </Col>

					<Col xl="4" sm="8">
			                <Card className="o-hidden text-center bg-statBar">
				  			<CardBody className="crypto-current">
						        <div className="current-balance text-center">
						        	<h4>
						        		<span className="f-12 f-w-600">Debt</span>
						        		< Square style={squreDebt}/>
						          	</h4>
						          	<h3>
						          		{formatMoney(3459909.2124)}
						          	</h3>

						          <div>
						          	<span style={trendingDebt}> <TrendingUp /> </span>
						          	<span> {formatMoney(2345623)} </span>
						          </div>
						          
						        </div>
						 	</CardBody>
						</Card>
					</Col>

			    </Row>
						
	        </Container>
	     </Fragment>
	)
}

export default SalesCashBalance;