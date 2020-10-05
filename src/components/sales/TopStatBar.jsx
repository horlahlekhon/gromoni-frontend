
import React, {Fragment, useHistory} from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter } from 'reactstrap'
import { apexBarChart, apexSmallChart } from '../common/chartsData/apexChart'
import { operationSmallChart,visitorSmallChart,medicineSmallChart, hospitalSmallChartOptions, smallChartListener, hospitalCurveChart, hospitalCurveChartOptions } from '../common/chartsData/chartist'
import ChartistGraph from 'react-chartist';
import {TrendingUp, DollarSign} from 'react-feather'
import Heart from '../../assets/images/dashboard-hospital/heart.png'
import { size } from 'lodash';
const TopStatBar = (props) => {

    const data =  { id: 1, cardBg: '', title: "Total Sale", scorr: '841,162', color: 'secondary', bdgeFont: '', bdgeValue: '3.56%', progress: '75%' }
    return (
        <Row>
            <Col xl="3" md="6" className="xl-50 box-col-6" key={data.id}>
                  <Card className={data.cardBg}>
                    <CardBody className="tag-card">
                      <div className="progressbar-widgets">
                        <div className="media media-widgets">
                          <div className="media-body">
                            <p className={`mb-0 ${data.color === 'light' ? 'font-light' : ''}`}>{data.title}</p>
                            <h3 className="mt-0 mb-0 f-w-600"><DollarSign /><span className="counter">{data.scorr}</span><span><TrendingUp /></span></h3>
                          </div><span className={`badge flat-badge-${data.color} ${data.bdgeFont}`}>{data.bdgeValue}<i className="fa fa-caret-up"></i></span>
                        </div>
                        {/* <div className="progress sm-progress-bar progress-animate">
                          <div className={`progress-gradient-${data.color}`} role="progressbar" style={{ 'width': data.progress }} aria-valuenow="75"
                            aria-valuemin="0" aria-valuemax="100">
                            <span className={`font-${data.color}`}>{data.progress}</span><span className="animate-circle"></span></div>
                        </div><span className={`tag-content-${data.color} tag-hover-effect ${data.color === 'light' ? 'tag-light' : ''}`}><TrendingUp /></span> */}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
        </Row>
    )

}

export default TopStatBar