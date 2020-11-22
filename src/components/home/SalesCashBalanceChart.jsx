// SALES CASH BALANCE VIEW CHART 
import React, { Fragment, useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import {Container,  Row, Col,TabPane,TabContent,Button,ButtonGroup} from 'reactstrap';

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

        useEffect(() => console.log(props.monthlyCashBalanceChartData.series), [props.monthlyCashBalanceChartData.series])

        // console.log(monthlyCashBalanceChart.series)

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
						               		 <Chart options={weeklyCashBalanceChart.options} series={weeklyCashBalanceChart.series} height={400} type="bar" />
						                </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div id="column-chart">
						               		 <Chart options={monthlyCashBalanceChart.options} series={monthlyCashBalanceChart.series} height={400} type="bar" />
						                </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div id="column-chart">
						               		 <Chart options={yearlyCashBalanceChart.options} series={yearlyCashBalanceChart.series} height={400} type="bar" />
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