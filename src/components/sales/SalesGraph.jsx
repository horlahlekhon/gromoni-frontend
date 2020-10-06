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
                            <h5>Sales Chart</h5>
                            {/* <div className="chart-value-box pull-right">
                                <div className="value-square-box-secondary"></div><span className="f-12 f-w-600">Current</span>
                                <div className="value-square-box-light ml-3"></div><span className="f-12 f-w-600">Highest</span>
                            </div> */}
                        </CardHeader>
                        <CardBody className="tabbed-card">
                            <Nav tabs className="pull-right middle nav-tabs border-tab nav-primary">
                                <NavItem>
                                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                        {/* <i className="fas icofont-ui-home"></i> */}
                                         Week
                                        </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                        {/* <i className="icofont icofont-man-in-glasses"></i> */}
                                        Month
                                        </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                        {/* <i className="icofont icofont-contacts"></i> */}
                                        Year
                                        </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="apex-chart-container chart-data">
                                        <div id="column-chart">
                                            <Chart options={apexBarChart.options} series={apexBarChart.series} height="280" type="bar" />
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="ct-10 chartist-sass-container">
                                        <ChartistGraph data={salesMonthlyChart} listener={sassUserChartListener} options={sassUserChartOptions} type={'Bar'} />
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="ct-10 chartist-sass-container">
                                        <ChartistGraph data={salesYearlyChart} listener={sassUserChartListener} options={sassUserChartOptions} type={'Bar'} />
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