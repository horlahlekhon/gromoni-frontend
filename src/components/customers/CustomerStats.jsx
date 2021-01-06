import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {Container,Row, Col, Card, CardBody,Button} from 'reactstrap';
import {Users,TrendingUp,UserPlus} from 'react-feather';

 const CustomerStats = (props) => {

	return (
		<Fragment>
			<Container fluid={true} className="m-b-20" >
				<Row>
					{/**/}
					{/* TOTAL NUMBER OF CUSTOMERS*/}
					<Col xs="12" md="4">
		              <Card>
		                <CardBody className="tag-card">
		                  <div className="progressbar-widgets">
		                    <div className="media media-widgets">
		                      <div className="media-body">

		                        <p className='light'>
		                        	Total Num of Customers
		                        </p>

		                        <h3 className="mt-0 mb-0 f-w-600">
		                        	<span className="counter">
		                        		6545
		                        	</span>
		                        	<span>
		                        		<Users />
		                        	</span>
		                        </h3>

		                      </div>
		                      	<span className="badge flat-badge-success">
		                      		14<i className="fa fa-caret-up"></i>
		                      	</span>
		                    </div>

		                    <div className="progress sm-progress-bar progress-animate">
		                      <div className="progress-gradient-success" role="progressbar" style={{ 'width': '14%' }} aria-valuenow="15"
		                        aria-valuemin="0" aria-valuemax="100">
		                        <span className="font-success">
		                        	14%
		                        </span>
		                        <span className="animate-circle"></span>
		                      </div>

		                    </div>
		                    	<span className="tag-content-success tag-hover-effect">
		                    		<Users />
		                    	</span>
		                  </div>
		                </CardBody>
		              </Card>
		            </Col>

					{/* CUSTOMERS WITH DEBTS*/}
					<Col xs="12" md="4">
		              <Card className="bg-danger">
		                <CardBody className="tag-card">
		                  <div className="progressbar-widgets">
		                    <div className="media media-widgets">
		                      <div className="media-body">

		                        <p className='font-light'>
		                        	Owing Custmers
		                        </p>

		                        <h3 className="mt-0 mb-0 f-w-600">
		                        	<span className="counter">
		                        		5
		                        	</span>
		                        	<span>
		                        		<TrendingUp />
		                        	</span>
		                        </h3>

		                      </div>
		                      	<span className="badge flat-badge-light font-secondary">
		                      		<i className="font-primary">25</i>
		                      		<i className="fa fa-caret-up font-primary"></i>
		                      	</span>
		                    </div>

		                    {/*
		                    	<div className="progress sm-progress-bar progress-animate">
		                      <div className="progress-gradient-success" role="progressbar" style={ 'width': 14% } aria-valuenow="25"
		                        aria-valuemin="0" aria-valuemax="100">
		                        <span className="font-success">
		                        	25%
		                        </span>
		                        <span className="animate-circle"></span>
		                      </div>
		                    	</div>
		                    */}
	                    	<span className="tag-content-light tag-hover-effect tag-light">
	                    		<TrendingUp />
	                    	</span>
		                  </div>
		                </CardBody>
		              </Card>
		            </Col>


					{/* TOP VALUED CUSTOMERS*/}
					<Col xs="12" md="4">
		              <Card>
		                <CardBody className="tag-card">
		                  <div className="progressbar-widgets">
		                    <div className="media media-widgets">
		                      <div className="media-body">

		                        <p className='light'>
		                        	Top Customers
		                        </p>

		                        <h3 className="mt-0 mb-0 f-w-600">
		                        	<span className="counter">
		                        		45
		                        	</span>
		                        	<span>
		                        		<TrendingUp />
		                        	</span>
		                        </h3>

		                      </div>
		                      	<span className="badge flat-badge-primary">
		                      		14<i className="fa fa-caret-up"></i>
		                      	</span>
		                    </div>

		                    <div className="progress sm-progress-bar progress-animate">
		                      <div className="progress-gradient-primary" role="progressbar" style={{ 'width': '40%' }} aria-valuenow="10"
		                        aria-valuemin="0" aria-valuemax="100">
		                        <span className="font-Primary">
		                        	40%
		                        </span>
		                        <span className="animate-circle"></span>
		                      </div>

		                    </div>
		                    	<span className="tag-content-primary tag-hover-effect">
		                    		<TrendingUp />
		                    	</span>
		                  </div>
		                </CardBody>
		              </Card>
		            </Col>
	        	</Row>

	        	{/* ADD NEW CUSTOMER BUTTON*/}
	        	<Row className="text-center m-t-10">
	        		<Col sm="2" md="3" xl="4">
	        		</Col>
	        		<Col sm='8' md='6' xl='4'>
        				<Button className="btn-pill btn-air-info sm-8 md-6 xl-4" size="lg" color="info">
        					<span>
	    						<UserPlus />
	    					</span>
	    					<span>
	    						Add New Customer
	    					</span>
        				</Button>
	        		</Col>
	        	</Row>
	        </Container>
		</Fragment>
	)
}

export default CustomerStats;