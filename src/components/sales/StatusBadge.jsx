import React, {Fragment} from 'react'
import {Col, Row} from 'reactstrap'
import PropTypes from 'prop-types';
import {Archive, CheckCircle, Clock} from 'react-feather'

export const StatusBadge = (props) => {

    const Icon = props.icon
    return (
        <Fragment>
            <div className="mb-4 b-r-10 shadow shadow-showcase tool sales-stat-badge" data-tip={props.tip}>
                <div className='sales-stat-badge-icon-name-grp'>
                    <Icon/>
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
            <CheckCircle/>
        </div>
    )
}

const archiveIcon = (props) => {

    return (
        <div className="sales-stat-icon-wrapper sales-stat-icon-archive">
            <Archive/>
        </div>
    )
}

const pendingIcon = (props) => {
    return (
        <div className="sales-stat-icon-wrapper sales-stat-icon-pending">
            <Clock/>
        </div>
    )
}

const StatusBadges = (props) => {
    return (
        <Fragment>
            <Row  className="m-t-30 m-b-40">
                <Col xl='4' md="4" className="horizontal-item-alignment">
                    <StatusBadge icon={clearedIcon} text="Cleared" count={props.data.cleared.count}
                                 tip={props.data.cleared.tip}/>
                </Col>
                <Col xl='4' md="4" className="horizontal-item-alignment">
                    <StatusBadge icon={pendingIcon} text="Pending" count={props.data.pending.count}
                                 tip={props.data.pending.tip}/>
                </Col>
                <Col xl='4' md="4" className="horizontal-item-alignment">
                    <StatusBadge icon={archiveIcon} text="Archived" count={props.data.archive.count}
                                 tip={props.data.archive.tip}/>
                </Col>
            </Row>
        </Fragment>
    )
}
StatusBadge.prototype = {
    text: PropTypes.string,
    count: PropTypes.number,
    icon: PropTypes.oneOf([archiveIcon, pendingIcon, clearedIcon]),
    tip: PropTypes.string
}
StatusBadges.prototype = {
    data: PropTypes.exact({
        pending: PropTypes.object,
        cleared: PropTypes.object,
        archive: PropTypes.object
    })
}
export default StatusBadges
