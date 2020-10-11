// SALES CASH BALANCE VIEW CHART 
import React, { Fragment, useState} from 'react';
import {Container,  Row, Col ,Card, CardHeader,CardBody,TabContent,TabPane,Nav,NavItem,NavLink,Button,ButtonGroup} from 'reactstrap';
import Chart from 'react-apexcharts';
import { apexColumnChartsone } from "./ApexData";
  

 const SalesCashBalanceChart = (props) => {
	
	const [activeTab, setActiveTab] = useState('1');

 return (
        <Fragment style={{ backgroundColor: 'gray'}}  >
      
            <Container fluid={true} >
            
                <Row >
                    <Col lg="12 box-col-12" xl="6 xl-100 ">
                        <div className="text-center">
                            <ButtonGroup >
                                <Button className={ activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')} color="light" >Weekly</Button>
                                <Button className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')} color="light">Monthly</Button>
                                <Button className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')} color="light">Yearly</Button>
                            </ButtonGroup>
                        </div>
                        <div className="tabbed-card">
                               
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <div id="column-chart">
						               		 <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={400} />
						                </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div id="column-chart">
						               		 <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={400} />
						                </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div id="column-chart">
						               		 <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={400} />
						                </div>
                                    </TabPane>
                                </TabContent>
                            </div>
                          
                    </Col>
                    
                </Row>
            
            </Container>
        </Fragment>
    );
};


export default SalesCashBalanceChart;