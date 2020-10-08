import React, { Fragment, useState } from 'react'
import { sassSmallChartOptions, sassSmallChartListener, sassUserChart, sassUserChartOptions, sassUserChartListener } from '../common/chartsData/chartist'
import { Row, Col, Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane, Container } from 'reactstrap'
import ChartistGraph from 'react-chartist';
import { apexBarChart, apexSmallChart } from '../common/chartsData/apexChart'
import Chart from 'react-apexcharts'

const SalesGraph = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const salesWeekChart = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [
            [300, 600, 500, 800, 500, 400, 650],
            [400, 200, 100, 100, 300, 200, 50]
        ]
    }
    const salesMonthlyChart = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        series: [
            [300, 600, 500, 800, 500, 400, 650, 300, 600, 500, 800, 500],
            [300, 600, 500, 800, 500, 400, 650, 650, 650, 900, 300, 600]
        ]
    }

    const salesYearlyChart = {
        labels: ['2019', '2020'],
        series: [
            [30000, 25000],
            [400, 100]
        ]
    }


    return (
        <Fragment>
            <Row>
                <Col sm="12 box-col-6">
                    <Card>
                        <CardHeader className="crypto-header">
                            <Row>
                                <Col xl="2" md="2" sm="1">
                                    <div>
                                        <h5 className="p-t-20"> Sales Chart</h5>
                                    </div>

                                </Col>
                                <Col xl="10" md="10" sm="11">
                                    <Nav tabs className=" nav-tabs border-tab nav-primary justify-content-center">
                                        <NavItem>
                                            <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                            <span className={activeTab === '1' ? 'tab-active' : 'tab-inactive'}  >Week</span> 
                                        </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                                <span className={activeTab === '2' ? 'tab-active' : 'tab-inactive'}  >Month</span> 
                                        </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                            <span className={activeTab ==='3' ? 'tab-active' : 'tab-inactive'}  >Year</span> 
                                        </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="tabbed-card">
                            {/* <Nav tabs className=" nav-tabs border-tab nav-primary ">
                                <NavItem>
                                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                         Week
                                        </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                        Month
                                        </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                        Year
                                        </NavLink>
                                </NavItem>
                            </Nav> */}
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="apex-chart-container chart-data">
                                        <div id="column-chart">
                                            <Chart options={apexBarChart.options} series={apexBarChart.series} height="280" type="bar" />
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="apex-chart-container chart-data">
                                        <Chart options={apexBarChart.options} series={apexBarChart.series} height="280" type="line" />
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="apex-chart-container chart-data">
                                        <Chart options={apexBarChart.options} series={apexBarChart.series} height="280" type="bar" />
                                    </div>
                                </TabPane>
                            </TabContent>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default SalesGraph