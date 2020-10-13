import React, {Fragment, useState} from 'react'
import {Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap'
import {apexBarChart} from '../common/chartsData/apexChart'
import Chart from 'react-apexcharts'
import {dataOptions} from "./utils";

const SalesGraph = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    // const salesWeekChart = {...props.salesWeekChart, name: '<b>ICU</b> (Sales for the week)'}
    // const salesMonthlyChart = props.salesMonthlyChart
    // const salesYearlyChart = {...props.salesYearlyChart, name: '<b>ICU</b> (Sales for the year)'}


    // console.log(`serieisieirisiis: ${salesMonthlyChart}`)
    // //
    const salesMonthlyChart = dataOptions(props.salesMonthlyChart.series, props.salesMonthlyChart.labels, props.salesMonthlyChart.name )
    const salesWeeklyChart = dataOptions(props.salesWeeklyChart.series, props.salesWeeklyChart.labels, props.salesWeeklyChart.name)
    const salesYearlyChart = dataOptions(props.salesYearlyChart.series, props.salesYearlyChart.labels, props.salesYearlyChart.name)

    return (
        <Fragment>
            <Row>
                <Col sm="12 box-col-6">
                    <Card>

                        <CardHeader className="crypto-header">
                            <Row>

                                <Col xl="12" md="12" sm="12">
                                    <Nav tabs className=" nav-tabs border-tab nav-primary justify-content-center">
                                        <NavItem>
                                            <NavLink className={activeTab === '1' ? 'active' : ''}
                                                     onClick={() => setActiveTab('1')}>
                                                <span
                                                    className={activeTab === '1' ? 'tab-active' : 'tab-inactive'}>Week</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTab === '2' ? 'active' : ''}
                                                     onClick={() => setActiveTab('2')}>
                                                <span
                                                    className={activeTab === '2' ? 'tab-active' : 'tab-inactive'}>Month</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTab === '3' ? 'active' : ''}
                                                     onClick={() => setActiveTab('3')}>
                                                <span
                                                    className={activeTab === '3' ? 'tab-active' : 'tab-inactive'}>Year</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="tabbed-card">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="apex-chart-container chart-data">
                                        <div id="column-chart">
                                            {/*monthly chart*/}
                                            <Chart options={salesWeeklyChart.options} series={salesWeeklyChart.series}
                                                   height="280" type="bar"/>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="apex-chart-container chart-data">
                                        <div className='column-chart'>
                                            <Chart options={salesMonthlyChart.options} series={salesMonthlyChart.series}
                                                   height="280" type="bar"/>
                                        </div>

                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="apex-chart-container chart-data">
                                        <div className='column-chart'>
                                            <Chart options={salesYearlyChart.options} series={salesYearlyChart.series} height="280"
                                                   type="bar"/>
                                        </div>

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