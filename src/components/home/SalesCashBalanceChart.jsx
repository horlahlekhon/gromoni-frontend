 // SALES CASH BALANCE VIEW CHART 
import React, { Fragment, useState} from 'react';
import Chart from 'react-apexcharts';
import {Container,  Row, Col,TabPane,TabContent,Nav, NavItem, NavLink,} from 'reactstrap';

import {HomeCashBalanceChartOptions} from "./homeUtility";


 const SalesCashBalanceChart = (props) => {
	// THIS IS USE  TOSWITCH BETWEEN WEEEKLY, MONTHLY AND YEARLY CHARTS
	const [activeTab, setActiveTab] = useState('1');

    const weeklyCashBalanceChart = HomeCashBalanceChartOptions(props.weeklyCashBalanceChartData.series,
        props.weeklyCashBalanceChartData.labels);
    
    const monthlyCashBalanceChart = HomeCashBalanceChartOptions(props.monthlyCashBalanceChartData.series,
        props.monthlyCashBalanceChartData.labels);

    const yearlyCashBalanceChart = HomeCashBalanceChartOptions(props.yearlyCashBalanceChartData.series,
        props.yearlyCashBalanceChartData.labels)

        // useEffect(() => console.log(props.monthlyCashBalanceChartData.series), [props.monthlyCashBalanceChartData.series])

        // console.log(monthlyCashBalanceChart.series)

 return (
        <Fragment >
      
            <Container fluid={true} >
            
                <Row className="m-2 m-20">
                    <Col sm="12" d-xs-hidden="true" d-xs-none="true" className="d-xs-none">
                         <Row>
                            <Col xl="12" md="4" sm="4">
                                <Nav tabs className=" nav-tabs border-tab nav-primary justify-content-center">
                                    <NavItem >
                                        <NavLink className={activeTab === '1' ? 'active' : ''}
                                                 onClick={() => setActiveTab('1')}>
                                            <span
                                                className={activeTab === '1' ? 'tab-active' : 'tab-inactive'}>Week</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem >
                                        <NavLink className={activeTab === '2' ? 'active' : ''}
                                                 onClick={() => setActiveTab('2')}>
                                            <span
                                                className={activeTab === '2' ? 'tab-active' : 'tab-inactive'}>Month</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem >
                                        <NavLink className={activeTab === '3' ? 'active' : ''}
                                                 onClick={() => setActiveTab('3')}>
                                            <span
                                                className={activeTab === '3' ? 'tab-active' : 'tab-inactive'}>Year</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                            </Row>
                        <div className="tabbed-card">
                               
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                    	<div  className="apex-chart-container chart-data">
                                        	<div id="column-chart">
						               			<Chart options={weeklyCashBalanceChart.options} series={weeklyCashBalanceChart.series} height={400} type="bar" />
						                	</div>
						                </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                    	<div  className="apex-chart-container chart-data">
                                        	<div id="column-chart">
						               			<Chart options={monthlyCashBalanceChart.options} series={monthlyCashBalanceChart.series} height={400} type="bar" />
						                	</div>
						                </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                    	<div  className="apex-chart-container chart-data">
	                                        <div id="column-chart">
							               		 <Chart options={yearlyCashBalanceChart.options} series={yearlyCashBalanceChart.series} height={400} type="bar" />
							                </div>
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