import React, {Fragment, useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import DataTable from 'react-data-table-component'
import {useCookie} from "@shopify/react-cookie";
import {HTTP} from '../../api'
import {responseErrorParser} from "../common/utilityFunctions";
import {parseData} from "./utils";
import {CardBody} from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
const Header = ({search, filter, business}) => {
    const [searchValue, setSearchValue] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const handleChange = (key) => {
        setSearchValue(key)
        if (searchValue !== "" || search !== undefined) {
            search(searchValue)
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

    return (
        <Row>
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
            <Col xl="2">
                <div>
                    <Link to={`/business/${business}/sales/new`}><Button className='btn-air-primary' color="primary">create
                        sale </Button></Link>
                </div>
            </Col>
        </Row>
    )
}


const SalesTable = (props) => {

    // const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared,] = useState(false);
    const [data, setData] = useState(parseData(props.data.results));
    const [, setLoading] = useState(false); // would be used for handling errors in table
    const [totalRows, setTotalRows] = useState(props.data.totalRow);
    const [apiError, setApiError] = useState(undefined)
    const [perPage,] = useState(10);
    const [accessToken,] = useCookie("accessToken")
    const [searchResult,] = useState([])
    // const [filterStartDate, setFilterStartDate] = useState(null)
    // const [filterDateDate, setFilterEndDate] = useState(null)
    const initialResults = parseData(props.data.results)
    const currentBusiness = localStorage.getItem("__grm__act__biz__")
    const tableColumns = [
        {
            name: 'Product name',
            selector: 'name',
            sortable: true,
            center: true,
        },
        {
            name: 'Purchased By',
            selector: 'customer',
            sortable: true,
            center: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            center: true,
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
            center: true,
        },
        {
            name: 'Discount',
            selector: 'discount',
            sortable: true,
            center: true,
        },
        {
            name: 'Date',
            selector: 'ts_created',
            sortable: true,
            center: true,
        },
    ]


    // eslint-disable-next-line
    async function fetchData(page, currentBusiness, token, perPage) {
        setLoading(true)
        //TODO refactor call to use getter from the API module
        const responseP = HTTP.growthApi(accessToken)

        const response = await responseP
            .get(`/business/${currentBusiness}/sales/?page=${page}&page_size=${perPage}`)
            .catch((error) => {
                setLoading(false)
                const parsedError = responseErrorParser(error.message)
                setApiError(parsedError)
            })
        if (!apiError) {
            if (response.status === 200) {
                setData(parseData(response.data.results))
                setTotalRows(response.data.count)
                setLoading(false)
            } else {
                const error = responseErrorParser(response.data)
                setApiError(error)
                error.forEach(e => toast.error(e.message))
            }
        } else {
            apiError.forEach(e => toast.error(e.message))
        }
    }

    const handlePageChange = (page) => {
        fetchData(page, currentBusiness, accessToken, perPage)
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        await fetchData(page, currentBusiness, accessToken, newPerPage)
    }

    useEffect(() => {
        async function fetchData(currentBusiness, accessToken) {
            setLoading(true)
            //TODO refactor call to use getter from the API module
            const response = await HTTP.growthApi(accessToken)
                .get(`/business/${currentBusiness}/sales/?page=${1}&page_size=${10}`)
                .catch((error) => {
                    setLoading(false)
                    const parsedError = responseErrorParser(error.message)
                    setApiError(parsedError)
                })
            if (!apiError) {
                if (response.status === 200) {
                    setData(parseData(response.data.results))
                    setTotalRows(response.data.count)
                    setLoading(false)
                } else {
                    const error = responseErrorParser(response.data)
                    setApiError(error)
                    error.forEach(e => toast.error(e.message))
                }
            } else {
                apiError.forEach(e => toast.error(e.message))
            }
        }

        fetchData(currentBusiness, accessToken)
    }, [currentBusiness, accessToken, apiError])


    // const handleRowSelected = useCallback(state => {
    //     setSelectedRows(state.selectedRows);
    // }, []);
    // const contextActions = useMemo(() => {
    //     const handleDelete = () => {
    //
    //         if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
    //             setToggleCleared(!toggleCleared);
    //             setData(differenceBy(props.data.results, selectedRows, 'name'));
    //             toast.success("Successfully Deleted !")
    //         }
    //     };
    //
    //     return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    // }, [data, selectedRows, toggleCleared]);

    const paging = {persistSelectedOnPageChange: false, persistSelectedOnSort: false}

    // TODO this is not done yet, should be changed to use api search endpoint which is presumable yet to be created.*sigh*
    const handleSearch = (searchKey) => {
        const res = typeof searchKey !== 'string' || !searchKey ? searchResult : initialResults.filter(e => e.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
        setData(res)
    }

    const filter = (filters) => {
        // handle filtering the data by date
        const startDate = filters.startDate
        const endDate = filters.endDate ? filters.endDate : new Date()
        const result = startDate === null ? initialResults : initialResults.filter(e => e.date >= startDate && e.date <= endDate)
        setData(result)
    }
    return (
        <Fragment>
            <ToastContainer/>
            {apiError === undefined ? '' : apiError.forEach(e => toast.error(e.message))}
            <CardBody>
                <Header
                    search={e => handleSearch(e)}
                    filter={e => filter(e)}
                    business={currentBusiness}
                />
                <DataTable
                    data={data}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    fixedHeader={true}
                    highlightOnHover={true}
                    // selectableRows
                    persistTableHead
                    pagination
                    paginationServer
                    noHeader
                    selectsRange
                    // contextActions={contextActions}
                    // onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                    paginationServerOptions={paging}
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                />
            </CardBody>
        </Fragment>


    );

};

Header.prototype = {
    search: PropTypes.func,
    filter: PropTypes.func,
    business: PropTypes.string
}

SalesTable.prototype = {
    title: PropTypes.string,
    data: PropTypes.exact({
        results: PropTypes.array,
        totalRow: PropTypes.number,
    })
}

export default SalesTable;