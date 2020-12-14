import React, {Fragment} from 'react'
import Customers from '../components/customers/Customers'


const CustomersPage = (props) => {
    return (
        <Fragment>
            <h1> this is customers page </h1>
            <Customers />
        </Fragment>
    )
}

export default CustomersPage;