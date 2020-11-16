// SALES CASH BALANCE VIEW CHART 
import React, { Fragment, useState} from 'react';
import {Container,  Row, Col ,Card, CardHeader,CardBody,TabContent,TabPane,Nav,NavItem,NavLink,Button,ButtonGroup} from 'reactstrap';
import Chart from 'react-apexcharts';
import {HomeCashBalanceChartOptions} from "./homeUtility";
import {useCookie} from "@shopify/react-cookie";
import {responseErrorParser} from "../../components/common/utilityFUnctions";

const currentBusiness = localStorage.getItem("__grm__act__biz__")



 const SalesCashBalanceChart = (props) => {
	// THIS IS USE  TOSWITCH BETWEEN WEEEKLY, MONTHLY AND YEARLY CHARTS
	 const [activeTab, setActiveTab] = useState('1');

    const weeklyCashBalanceChart = HomeCashBalanceChartOptions(props.weeklyCashBalanceChartData.series,
        props.weeklyCashBalanceChartData.labels);
    
    const monthlyCashBalanceChart = HomeCashBalanceChartOptions(props.monthlyCashBalanceChartData.series,
        props.monthlyCashBalanceChartData.labels);

    const yearlyCashBalanceChart = HomeCashBalanceChartOptions(props.yearlyCashBalanceChartData.series,
        props.yearlyCashBalanceChartData.labels)

 return (
        <Fragment >
      
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
						               		 <Chart options={weeklyCashBalanceChart.options} series={weeklyCashBalanceChart.series} type="bar" height={400} type="bar"/>
						                </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div id="column-chart">
						               		 <Chart options={monthlyCashBalanceChart.options} series={monthlyCashBalanceChart.series} type="bar" height={400} type="bar"/>
						                </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div id="column-chart">
						               		 <Chart options={yearlyCashBalanceChart.options} series={yearlyCashBalanceChart.series} type="bar" height={400} type="bar"/>
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