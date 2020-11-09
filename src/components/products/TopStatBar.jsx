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
                                    <div className="media-body text-center">
                                        <h3 className="d-inline-block f-w-600 m-l-10 ">{props.data.totalNosOfProduct}</h3>
                                        <h6 className="mb-10 f-w-600 m-l-10">Total number of sales</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="6" md="6" sm="6" className="b-l-light">
                                <div className="media hospital-small-chart">
                                    <div className="media-body  text-center" >
                                        <h3 className="d-inline-block f-w-600 m-l-10">{formatMoney(props.data.outOfStock)}</h3>
                                        <h6 className=" f-w-600 m-l-10">Overall sales</h6>
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
        totalNosOfProduct: PropTypes.number,
        outOfStock: PropTypes.number,
    })
}
export default TopStatBar