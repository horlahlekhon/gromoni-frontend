import React, {useState} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Row, Col,Form,FormGroup,Label,Input,InputGroup,
  InputGroupAddon,InputGroupText,Button} from 'reactstrap';
import {toast} from 'react-toastify';
import {Search} from 'react-feather';


const CustomersListQuery = ({search, filter, business}) => {
    const [searchValue, setSearchValue] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    
    const handleChange = (key) => {
        setSearchValue(key)
        if (searchValue !== "" || search !== undefined) {
            search(searchValue)
        }
    }

    return (
        <Row>
            <Col xl="2">
              <h4> Customers List</h4>
            </Col>
            <Col xl="2"></Col>
            <Col xl="4">
                <Form preventDefault>
                   
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><Search/></InputGroupText>
                        </InputGroupAddon>
                        <Input className="form-control" type="text" placeholder="Search BY Name....."/>
                        <Button color="primary"  className="m-r-15">Search</Button>
                      </InputGroup>

                    </FormGroup>
                </Form>
            </Col>
            <Col xl="2">
                <div className="cal-datepicker form-group">
                     <FormGroup>
                        <Input type="select" name="select" className="form-control digits" defaultValue="1">
                          <option>Sort By:</option>
                          <option>Last Trans Ascending</option>
                          <option>Last Trans Descending</option>
                          <option>Num of Trans Ascending</option>
                          <option>Num of Trans Descending</option>
                          <option>Hghest Spending</option>
                          <option>Lowest Spending</option>
                          <option>Higest Owing</option>
                          <option>Lowest Owing</option>
                          <option>Owing</option>
                          <option>Not Owing</option>
                        </Input>
                      </FormGroup>
                </div>
            </Col>
            <Col xl="2"></Col>
        </Row>
    )
}

export default CustomersListQuery;