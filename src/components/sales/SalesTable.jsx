import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import differenceBy from 'lodash/differenceBy';
import {toast, ToastContainer} from 'react-toastify';
import DataTable from 'react-data-table-component'
import {useCookie} from "@shopify/react-cookie";
import {HTTP} from '../../api'
import {responseErrorParser} from "../common/utilityFUnctions";
import {parseData} from "./utils";
import {CardBody} from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const SalesTable = (props) => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState(parseData(props.data.results));
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(props.data.totalRow);
    const [apiError, setApiError] = useState(undefined)
    const [perPage, setPerPage] = useState(10);
    const [accessToken,] = useCookie("accessToken")
    const [searchKey, setSearchKey] = useState("")
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


    const fetchData = async (page) => {
        setLoading(true)
        const response = await HTTP.growthApi(accessToken)
            .get(`/report/${currentBusiness}/dashboards/sales/?page=${page}&page_size=${perPage}`)
            .catch((error) => {
                setLoading(false)
                setApiError(responseErrorParser(error.message))
            })
        setData(parseData(response.data.results))
        setTotalRows(response.data.count)
        setLoading(false)
    }
    const handlePageChange = (page) => {
        fetchData(page)
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await HTTP.growthApi(accessToken)
            .get(`/report/${currentBusiness}/dashboards/sales/?page=${page}&page_size${newPerPage}`)
            .catch((error) => {
                setLoading(false)
                setApiError(responseErrorParser(error.message))
            })
        setData(parseData(response.data.results))
        setTotalRows(response.data.count)
        setPerPage(newPerPage)
        setLoading(false)
    }
    useEffect(() => {
        fetchData(1)
    }, [])


    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);
    const contextActions = useMemo(() => {
        const handleDelete = () => {

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(props.data.results, selectedRows, 'name'));
                toast.success("Successfully Deleted !")
            }
        };

        return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    }, [data, selectedRows, toggleCleared]);

    const paging = {persistSelectedOnPageChange: false, persistSelectedOnSort: false}

    const Header = (props) => {

        const handle = (e) => {
            e.preventDefault()
            setSearchKey(e.target.value)
            const res = !searchKey ? data:  data.filter(e => e.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
            setData(res)
        }
        return (
            <Row className="">
                <Col xl="4">
                    <div className="form-group pull-right">
                        <input
                            type="text"
                            className="search form-control"
                            placeholder="search"
                            value={searchKey}
                            onChange={(e) => handle(e)}
                        />
                    </div>
                </Col>
            </Row>
        )
    }
    return (
        <Fragment>
            <ToastContainer/>
            {apiError === undefined ? '' : apiError.forEach(e => toast.error(e.message))}

            <DataTable
                title={<Header/>}
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
                contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                paginationServerOptions={paging}
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
            />
        </Fragment>


    );

};

export default SalesTable;