import React, {useState} from 'react';
import {Row,Col,Input} from 'reactstrap';
import {Search} from 'react-feather';


const CustomersListQuery = ({search, business}) => {
    const [searchValue, setSearchValue] = useState("")
    const handleChange = (key) => {
        setSearchValue(key)
        if (searchValue !== "" || search !== undefined) {
            search(searchValue)
        }
    }

    return (
        <Row>
            <Col xl="2">
                <h3> Customers List </h3>
            </Col>

            <Col xl="2">
                <div className="form-group">
                    <input
                        className="search form-control"
                        type="text"
                        placeholder='search...'
                        onChange={(e) => handleChange(e.target.value)}
                        value={searchValue}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default CustomersListQuery;