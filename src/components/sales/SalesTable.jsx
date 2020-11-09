import React, {Fragment, useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {parseData} from "./utils";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';
import {GrowthAPI} from "../../api/http";
import Table from "../common/Table";
import TableHeader from "./TableHeader";


const SalesTable = (props) => {

    const [data, setData] = useState({});
     // would be used for handling errors in table
    const [apiError, setApiError] = useState(undefined)
    const [initialResult, setInitialResult] = useState({})

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
            selector: 'date',
            sortable: true,
            center: true,
        },
    ]



    // eslint-disable-next-line
    async function fetchData(page, currentBusiness, token, perPage) {
        const api = new GrowthAPI(token, currentBusiness)
        const response = await api
            .allSales({pageSize: perPage, page})
            .catch((error) => {
                setApiError(error.payload)
            })
        if (!apiError) {
            if (response.statusCode === 200) {
                setData({
                    results: parseData(response.payload.results),
                    totalRows: response.payload.count
                })
                console.log("response.payload, fetchData", response.payload)
            } else {
                const error = response.payload
                setApiError(error)
                error.forEach(e => toast.error(e.message))
            }
        } else {
            apiError.forEach(e => toast.error(e.message))
        }
    }

    const handlePageChange = (page) => {
        fetchData(page, props.currentBusiness, props.accessToken, 10)
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        await fetchData(page, props.currentBusiness, props.accessToken, newPerPage)
    }

    useEffect(() => {
        async function fetchData() {
            const api = new GrowthAPI(props.accessToken, props.currentBusiness)
            const perPage = 10
            const response = await api
                .allSales({pageSize: perPage, page: 1})
                .catch((error) => {
                    setApiError(error.payload)
                })
            if (apiError === undefined) {
                if (response.statusCode === 200) {
                    const tbData = {
                        results: parseData(response.payload.results),
                        totalRows: response.payload.count
                    }

                    setData(tbData)
                    setInitialResult(tbData)
                } else {
                    const error = response.payload
                    setApiError(error)
                    error.forEach(e => toast.error(e.message))
                }
            } else {
                apiError.forEach(e => toast.error(e.message))
            }
        }

        fetchData()
    }, [props.accessToken, props.currentBusiness, apiError])


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
    const handleSearch = ({key, showDefault}) => {
        if( showDefault === true ){
            console.log("returning initial result since search key is weird", initialResult.results)
            setData({
                results: initialResult.results,
                totalRows: initialResult.totalRows
            })
        }else{
            const res = initialResult.results.filter(e => e.name.toLowerCase().includes(key.toLocaleLowerCase()))
            setData({
                results: res,
                totalRows: initialResult.totalRows
            })
        }
    }

    const filter = (filters) => {
        // handle filtering the data by date
        const startDate = filters.startDate
        const endDate = filters.endDate ? filters.endDate : new Date()
        const result = startDate === null ? initialResult.results : initialResult.results.filter(e => e.ts_created >= startDate && e.ts_created <= endDate)
        setData({
            results: result,
            totalRows: initialResult.totalRows
        })
    }

    return (
        <Fragment>
            <ToastContainer/>
            {console.log("sales dashboard table renders")}
            <Table
                data={data}
                handleSearch={handleSearch}
                filter={filter}
                tableHeader={TableHeader}
                headerProps={{
                    filter: filter,
                    search: handleSearch,
                    business: props.business
                }}
                business={props.currentBusiness}
                tableColumns={tableColumns}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
            />
        </Fragment>


    );

};



SalesTable.prototype = {
    title: PropTypes.string,
    tableHeader: PropTypes.element,
    business: PropTypes.string,
    accessToken: PropTypes.string
}

export default React.memo(SalesTable);