
import React, { Fragment, useHistory } from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter } from 'reactstrap'
import { apexBarChart, apexSmallChart } from '../common/chartsData/apexChart'
import { operationSmallChart, visitorSmallChart, medicineSmallChart, hospitalSmallChartOptions, smallChartListener, hospitalCurveChart, hospitalCurveChartOptions } from '../common/chartsData/chartist'
import ChartistGraph from 'react-chartist';
import { TrendingUp, DollarSign } from 'react-feather'
import Heart from '../../assets/images/dashboard-hospital/heart.png'
import { size } from 'lodash';
import { Bell} from 'react-feather'

const TopStatBar = (props) => {

  const data = { id: 1, cardBg: '', title: "Total Sale", scorr: '841,162', color: 'primary', bdgeFont: '', bdgeValue: '3.56%', progress: '75%' }

  const overallSales = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN'
  }).format(props.data.overallSales)

  return (
    <Row>
      <Col xl='12' className="xl-100 box-col-12">
        <Card>
          <CardBody>
            <Row className="r-hospital-chart">
              <Col xl="6" md="6" sm="6">
                <div className="media hospital-small-chart">
                  <div className="small-bar">
                    <div className="small-chart1 flot-chart-container">
                      <ChartistGraph data={visitorSmallChart} listener={smallChartListener} options={hospitalSmallChartOptions} type={'Bar'} />
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="d-inline-block f-w-600 m-l-10 mb-0">{props.data.NosOfSales}</h3>
                    <h6 className="mb-0 f-w-600 m-l-10">Total number of sales</h6>
                  </div>
                </div>
              </Col>
              <Col xl="6" md="6" sm="6" className="b-l-light">
                <div className="media hospital-small-chart">
                  <div className="small-bar">
                    <div className="small-chart1 flot-chart-container">
                      <ChartistGraph data={visitorSmallChart} listener={smallChartListener} options={hospitalSmallChartOptions} type={'Bar'} />
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="d-inline-block f-w-600 m-l-10 mb-0">{overallSales}</h3>
                    <h6 className="mb-0 f-w-600 m-l-10">Overall sales</h6>
                  </div>
                  <span className={`tag-content-${data.color} tag-hover-effect ${data.color === 'light' ? 'tag-light' : ''}`}><TrendingUp color="red" /></span>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )

}

export default TopStatBar