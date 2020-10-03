// SALES CASH BALANCE VIEW CHART 
import React, { Fragment, useState} from 'react';
import {Container,  Row, Col ,Card, CardHeader,CardBody,TabContent,TabPane,Nav,NavItem,NavLink,Button,ButtonGroup} from 'reactstrap';
import Chart from 'react-apexcharts';
import { apexColumnChartsone } from "./ApexData";

    //const [weeklyTab, setWeeklyTab] = useState('1');
    //const [monthlyTab, setMonthlyTab] = useState('1');
    //const [yearlyTab, setYearlyTab] = useState('1');


    

 const SalesCashBalanceChart = (props) => {
	
	const [activeTab, setActiveTab] = useState('1');

 return (
        <Fragment>
      
            <Container fluid={true}>
                <Row>
                    <Col lg="12 box-col-12" xl="6 xl-100 ">
                        <Card>
                             <CardHeader className="text-center">
                                  <ButtonGroup >
	                                    <Button className={ activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')} color="light" >Left</Button>
	                                    <Button className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')} color="light">Middle</Button>
	                                    <Button className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')} color="light">Right</Button>
	                                </ButtonGroup>
                            </CardHeader>
                            <CardBody>
                                <div className="tabbed-card">
                                {/* <Nav tabs className="pull-left  nav-pills nav-primary">
		                                <NavItem>
		                                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
		                                        Home
		                                    </NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
		                                        Profile
		                                    </NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
		                                        Contact
		                                    </NavLink>
		                                </NavItem>
		                            </Nav> */}

                                
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <div id="column-chart">
						               		 <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={350} />
						                </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div id="column-chart">
						               		 <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={350} />
						                </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div id="column-chart">
						               		 <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={350} />
						                </div>
                                    </TabPane>
                                </TabContent>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    
                </Row>
            </Container>
        </Fragment>
    );
};


export default SalesCashBalanceChart;