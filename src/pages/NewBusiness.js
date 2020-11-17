import React from 'react'
// import { Container, Row, Col, CardBody, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreateBusiness from '../components/CreateBusiness'


const NewBusiness = (props) => {
    return (
        <>
            <ToastContainer/>
            <CreateBusiness/>
        </>
    )
}
export default NewBusiness