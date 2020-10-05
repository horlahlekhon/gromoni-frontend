import React, {Fragment, useHistory} from 'react'
// import Home from '../components/home/Home'
import BreadCrumb from '../layout/Breadcrumb'
import { Container} from 'reactstrap'
import TopStatBar from '../components/sales/TopStatBar'

 const SalesPage = (props) => {
    return (
    	<Fragment>
        <BreadCrumb parent="Home" subparent="Sales" title="Sales"/>
        <Container fluid={true}>
        <TopStatBar/>
        </Container>
      </Fragment>
    )
}

export default SalesPage;