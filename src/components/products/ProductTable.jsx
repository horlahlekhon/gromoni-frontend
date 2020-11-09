import React,  {useState, Fragment} from "react";
import {toast, ToastContainer} from "react-toastify";
import {CardBody} from "reactstrap";
import DataTable from "react-data-table-component";
import Table from "../common/Table";
import {GrowthAPI} from "../../api";
import {parseData} from "../sales/utils";


const ProductTable = (props) => {

    const [data, setData] = useState(props.initialData)
    const [apiError, setApiError] = useState([])


    const tableColumns = [
        {
            name: 'Product name',
            selector: 'name',
            sortable: true,
            center: true,
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: false,
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
            name: 'Sold',
            selector: 'sold',
            sortable: true,
            center: true,
        },
    ]

    const handlePageChange = (page) => {
        props.dataFunc(page, props.perPage)
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        await props.dataFunc(page, newPerPage)
    }
    const handleSearch = (e) => {
        console.log("search", e)
    }
    return (
        <Fragment>
            <ToastContainer/>
            {/*{apiError ? apiError.foreach(e => toast.error(e.message)) : ''}*/}
            <CardBody>
                {/*<Header*/}
                {/*    search={e => handleSearch(e)}*/}
                {/*    filter={e => filter(e)}*/}
                {/*    business={currentBusiness}*/}
                {/*/>*/}
                <Table
                    data={props.data}
                    handleSearch={handleSearch}
                    business={props.currentBusiness}
                    tableColumns={tableColumns}
                    handlePageChange={handlePageChange}
                    handlePerRowsChange={handlePerRowsChange}
                />
            </CardBody>

        </Fragment>
    )
}

export default ProductTable