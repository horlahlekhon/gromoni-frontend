import React, {Fragment, useState} from 'react'
import {
    sassSmallChartOptions,
    sassSmallChartListener,
    sassUserChart,
    sassUserChartOptions,
    sassUserChartListener
} from '../common/chartsData/chartist'
import {Row, Col, Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane, Container} from 'reactstrap'
import ChartistGraph from 'react-chartist';
import {apexBarChart, apexSmallChart} from '../common/chartsData/apexChart'
import Chart from 'react-apexcharts'
import configDB from "../../data/customizer/config";


const primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;
const secondary = localStorage.getItem('secondary_color') || configDB.data.color.secondary_color;
const SalesGraph = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const salesWeekChart = {...props.salesWeekChart, name: '<b>ICU</b> (Sales for the week)'}
    // const salesMonthlyChart = props.salesMonthlyChart
    const salesYearlyChart = {...props.salesYearlyChart, name: '<b>ICU</b> (Sales for the year)'}

    const salesMonthlyChart = {
        options: {
            chart: {
                toolbar: {show: false}
            },
            colors: [primary, secondary],
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '25px'
                }
            },
            dataLabels: {enabled: true},
            stroke: {show: true, width: 8, colors: ['transparent']},
            xaxis: {
                categories: props.salesMonthlyChart.labels === undefined ? [0]: props.salesMonthlyChart.labels,
                labels: {low: props.salesMonthlyChart.labels === undefined ? 0 : props.salesMonthlyChart.labels[0],
                    offsetX: 0, show: props.salesMonthlyChart.labels !== undefined },
                // axisBorder: {low: 0, offsetX: 0, show: false}
            },
            fill: {
                colors: [primary, secondary],
                type: 'gradient',
                gradient: {
                    shade: 'light', type: 'vertical',
                    shadeIntensity: 0.3, inverseColors: true,
                    opacityFrom: 1, opacityTo: 1, stops: [0, 100]
                }
            },
            tooltip:
                {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                },
            grid:
                {
                    borderColor: "#f5f8fd", clipMarkers: false, yaxis: {lines: {show: true}}
                },
            yaxis: {tickAmount: 6, min: 0, max: 120, labels: {style: {color: '#6e7e96'}}},
            responsive: [
                {
                    breakpoint: 992,
                    options: {
                        stroke: {
                            width: 5
                        },
                        chart: {
                            height: 200
                        }
                    }
                },
                {
                    breakpoint: 480,
                    options: {
                        stroke: {
                            width: 1
                        }
                    }
                },
                {
                    breakpoint: 420,
                    options: {
                        stroke: {
                            width: 1
                        }
                    }
                }
            ]
        },
        series: props.salesMonthlyChart.series === undefined ? [{ name: '<b>ICU</b> (iplease wait )', data: [0, 0, 0, 0, 0, 0, 0, 0] }] : props.salesMonthlyChart.series

    }
    // console.log(`serieisieirisiis: ${salesMonthlyChart}`)
    // //
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
                                            {/*monthly chart*/}
                                            <Chart options={apexBarChart.options} series={apexBarChart.series}
                                                   height="280" type="bar"/>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="apex-chart-container chart-data">
                                        {
                                            console.log(`salesMonthlyChart: ${salesMonthlyChart}`)
                                        }
                                        <Chart options={apexBarChart.options} series={salesMonthlyChart.series}
                                               height="280" type="line"/>
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="apex-chart-container chart-data">
                                        <Chart options={apexBarChart.options} series={apexBarChart.series} height="280"
                                               type="bar"/>
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