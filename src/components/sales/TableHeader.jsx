import React, {useState} from "react";
import {toast} from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const TableHeader = ({search, filter, business}) => {
    const [searchValue, setSearchValue] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const handleChange = (key) => {
        setSearchValue(key)
        if (!key && search) {
            search({key, showDefault: true})
        } else {
            search({key: searchValue, showDefault: false})
        }

    }
    const handleDatePickerChange = (startDatePicked, endDatePicked) => {
        setStartDate(startDatePicked)
        setEndDate(endDatePicked)
        if (startDatePicked !== null) {
            filter({startDate: startDatePicked, endDate: endDatePicked})
        } else {
            filter({startDate: startDatePicked, endDate: endDatePicked})
            toast.warn("Filtering by date requires a start date")
        }
    }

    function handleBlur(e) {
        e.preventDefault()
        console.log("handle blur", e.target.value)
    }

    return (
        <Row>
            {
                console.log("Sales dashbard table header renders......")
            }
            <Col xl="2">
                <h3> History </h3>
            </Col>
            <Col xl="2">
                <div className="form-group">
                    <input
                        className="search form-control"
                        type="text"
                        placeholder="search"
                        onChange={(e) => handleChange(e.target.value)}
                        value={searchValue}
                        onBlur={e => handleBlur(e)}
                    />
                </div>
            </Col>
            <Col xl="2">
                <div className="cal-datepicker form-group">
                    <DatePicker
                        placeholderText="from date"
                        selected={startDate}
                        className="search form-control digits"
                        onChange={(date) => handleDatePickerChange(date, endDate)}
                        selectsStart
                        isClearable
                        closeOnScroll={true}
                        startDate={startDate}
                        endDate={endDate}
                        showPopperArrow={true}
                        popperPlacement="left"
                        // onBlur={handleBlur}
                    />
                </div>

            </Col>
            <Col xl="2">
                <div className="cal-datepicker form-group">
                    <DatePicker
                        placeholderText="To date"
                        selected={endDate}
                        className="search form-control digits"
                        onChange={(date) => handleDatePickerChange(startDate, date)}
                        selectsEnd
                        isClearable
                        closeOnScroll={true}
                        endDate={endDate}
                        showPopperArrow={true}
                        popperPlacement="left"
                        // onBlur={handleBlur}
                    />
                </div>

            </Col>
        </Row>
    )
}

const arePropsEqual = (prevProps, nextProps) => {
    return prevProps.filter !== nextProps.filter
}

TableHeader.prototype = {
    search: PropTypes.func,
    filter: PropTypes.func,
    business: PropTypes.string
}

export default React.memo(TableHeader)
