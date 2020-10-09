import React, { useState, Fragment } from 'react'
import { Row, Col } from 'reactstrap'

import { Clock, CheckCircle, Archive } from 'react-feather'

export const StatusBadge = (props) => {

    const Icon = props.icon
    return (
        <Fragment>
            <div className="mb-4 b-r-10 shadow shadow-showcase tool sales-stat-badge" data-tip={props.tip} >
                <div className='sales-stat-badge-icon-name-grp'>
                    <Icon />
                    <div>{props.text}</div>
                </div>
                <div>{props.count}</div>
            </div>
        </Fragment>
    )
}


const clearedIcon = (props) => {
    return (
        <div className="sales-stat-icon-wrapper sales-stat-icon-cleared">
            <CheckCircle />
        </div>
    )
}

const archiveIcon = (props) => {
    
    return (
        <div className="sales-stat-icon-wrapper sales-stat-icon-archive">
            <Archive />
        </div>
    )
}

const pendingIcon = (props) => {
    return (
        <div className="sales-stat-icon-wrapper sales-stat-icon-pending">
            <Clock  />
        </div>
    )
}

const StatusBadges = (props) => {
    return (
        <Fragment>
            <Row  >
                <Col xl='4' md="4" className="horizontal-alignmet" >
                    <StatusBadge  icon={clearedIcon} text="Cleared" count={props.data.cleared.count} tip={props.data.cleared.tip} />
                </Col>
                <Col xl='4' md="4" className="horizontal-alignmet">
                    <StatusBadge icon={pendingIcon} text="Pending" count={props.data.pending.count} tip={props.data.pending.tip}/>
                </Col>
                <Col xl='4' md="4" className="horizontal-alignmet">
                    <StatusBadge icon={archiveIcon} text="Archived" count={props.data.archive.count} tip={props.data.archive.tip} />
                </Col>
            </Row>
        </Fragment>
    )
}

export default StatusBadges
