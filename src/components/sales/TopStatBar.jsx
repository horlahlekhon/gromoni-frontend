import React from 'react'
import {Card, CardBody, Col, Row} from 'reactstrap'
import {TrendingDown, TrendingUp} from 'react-feather'
import '../../assets/images/other-images/salesStatBar.jpg'
import PropTypes from 'prop-types';
import {formatMoney} from "../common/utilityFunctions";
const TopStatBar = (props) => {


    return (
        <Row>
            <Col xl='12' className="xl-100 box-col-12 ">
                <Card className="bg-statBar">
                    <CardBody>
                        <Row className="r-hospital-chart ">
                            <Col xl="6" md="6" sm="6">
                                <div className="media hospital-small-chart">
                                    <div className="small-bar">
                                        <div className="small-chart1 flot-chart-container">
                                        {/*    maintain sanity on small screen*/}
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
                                        <div className="small-chart1 flot-chart-container p-t-20 text-center" >
                                            <h6  >{formatMoney(props.data.trend ? props.data.trend.amount : 0.0)}</h6>
                                            {
                                                props.data.trend.status === "increase" ?
                                                    <TrendingUp color="red" size={20} style={{width: "20px", height:"20px"}}/>
                                                    :
                                                    <TrendingDown color="red" size={20} style={{width: "20px", height:"20px"}}/>
                                            }
                                        </div>
                                    </div>
                                    <div className="media-body" >
                                        <h3 className="d-inline-block f-w-600 m-l-10 mb-0 ">{formatMoney(props.data.overallSales)}</h3>
                                        <h6 className="mb-0 f-w-600 m-l-10">Overall sales</h6>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )

}
TopStatBar.prototype = {
    data: PropTypes.exact({
        NosOfSales: PropTypes.number,
        overallSales: PropTypes.number,
        trend: PropTypes.exact({
            status: PropTypes.string,
            amount: PropTypes.number
        })
    })
}

TopStatBar.defaultProps = {
    data: {
        NosOfSales: 0,
        overallSales: 0,
        trend: {
            status: "increase",
            amount: 0
        }
    }
}

export default TopStatBar