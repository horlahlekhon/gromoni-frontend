import React, {Fragment, useHistory} from 'react'
// import Home from '../components/home/Home'
import BreadCrumb from '../layout/Breadcrumb'
import { Container} from 'reactstrap'
import TopStatBar from '../components/sales/TopStatBar'
import SalesGraph from '../components/sales/SalesGraph'

 const SalesPage = (props) => {

  const topBarData = {NosOfSales: 350, overallSales: 450}
    return (
    	<Fragment>
        <BreadCrumb parent="Home" subparent="Sales" title="Sales"/>
        <Container fluid={true}>
        <TopStatBar data={topBarData}/>
        <SalesGraph/>
        </Container>
      </Fragment>
    )
}

export default SalesPage;