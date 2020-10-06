import React, { useState, Fragment } from 'react'
import { Button, Badge, Row, Col } from 'reactstrap'


const StatusBadge = (props) => {

    const Icon = props.icon

    return (
        <Fragment>
            <div className="mb-4 b-r-10 shadow shadow-showcase tool sales-stat-badge" data-tip="This contains all sales that have been paid for." >
                <div>
                    <Icon />
                </div>
                <div>Cleared</div>
                <div>200</div>
            </div>

        </Fragment>
    )
}


const StatusBadges = (props) => {

    return (
        <Fragment>

        </Fragment>
    )
}

export default StatusBadge