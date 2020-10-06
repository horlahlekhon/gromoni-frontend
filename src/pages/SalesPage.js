import React, { Fragment, useHistory } from 'react'
// import Home from '../components/home/Home'
import BreadCrumb from '../layout/Breadcrumb'
import TopStatBar from '../components/sales/TopStatBar'
import SalesGraph from '../components/sales/SalesGraph'
import StatusBadge from '../components/sales/StatusBadge'
import { Bell } from 'react-feather'
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import SalesTable from '../components/sales/SalesTable'

const SalesPage = (props) => {


  const topBarData = { NosOfSales: 350, overallSales: 450 }
  return (
    <Fragment>
      <BreadCrumb parent="Home" subparent="Sales" title="Sales" />
      <Container fluid={true}>
        <TopStatBar data={topBarData} />
        <SalesGraph />
        <StatusBadge bgColor="secondary" icon={Bell} text="Notification" badgeColor="light" />
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Sales History</h5>
              </CardHeader>
              <CardBody>
                <SalesTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default SalesPage;