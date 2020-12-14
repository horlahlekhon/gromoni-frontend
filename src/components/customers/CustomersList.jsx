//DISPLAY EXISTING CUSTOMER, AND MANAGE CUSTOMERS 
import React, {Fragment,useState,useCallback,useMemo} from 'react';
import {Container,Row, Col, Card, CardBody} from 'reactstrap';
import {useCookies} from "react-cookie";
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';

import {paging,handleSearch,filter} from './CustomersUtility'
import DataTable from 'react-data-table-component';
import CustomersListQuery from './CustomersListQuery'
//import CustomersUtility from './CustomersUtility'

const CustomersList = (props) => {

    const currentBusiness = localStorage.getItem("__grm__act__biz__");
	const [toggleCleared,setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]) //(parseData(props.data.results));
    //const [, setLoading] = useState(false); // would be used for handling errors in table
    const [totalRows, setTotalRows] = useState(10) //(props.data.totalRow);
    //const [apiError, setApiError] = useState(undefined)
    const [perPage,] = useState(10);
    const [cookies,] = useCookies(["accessToken"])
    const [searchResult,] = useState([])
    const initialResults = "good" //parseData(props.data.results)

	const tableColumns = [
        {
            name: 'Customer aNme',
            selector: 'name',
            sortable: true,
            center: true,
        },
        {
            name: 'Email',
            selector: 'email',
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
            name: 'Transactions',
            selector: 'transactions',
            sortable: true,
            center: true,
        },
         {
            name: 'Date of Last Trans',
            selector: 'last_trans',
            sortable: true,
            center: true,
        },
        {
            name: 'Amount Owed',
            selector: 'discount',
            sortable: true,
            center: true,
        },
        {
            name: 'Total Spending',
            selector: 'Total_spending',
            sortable: true,
            center: true,
        },
    ]


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

    const handlePageChange = (page) => {
        // fetchData(page, currentBusiness, accessToken, perPage)

        return {}
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        // await fetchData(page, currentBusiness, accessToken, newPerPage)
        return {}
    }

    const handleRowSelected = useCallback(state => {
      setSelectedRows(state.selectedRows);
    }, []);
    const contextActions = useMemo(() => {
      const handleDelete = () => {
        
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
          setToggleCleared(!toggleCleared);
          setData(differenceBy(data, selectedRows, 'name'));
          toast.success("Successfully Deleted !")
        }
      };
  
      return (
            <div>
                <button key='reminder'className="btn btn-info m-r-10">
                    <span className="m-r-5">
                        <i className="fa fa-send"></i>
                    </span>
                    <span>Send Reminder</span>
                </button>
                <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
            </div>
        )
    }, [data, selectedRows, toggleCleared]);
	return(
		 <Fragment>
            {/*console.log("api err", apiError)}
            <ToastContainer/>
            {{apiError ? apiError.foreach(e => toast.error(e.message)) : ''}*/}
            <CardBody>
               <CustomersListQuery
                    search={e => handleSearch(e)}
                    filter={e => filter(e)}
                    business={currentBusiness}
                />
                <DataTable
                   // data={data}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    fixedHeader={true}
                    highlightOnHover={true}
                    selectableRows
                    persistTableHead
                    pagination
                    paginationServer
                    noHeader
                    selectsRange
                    contextActions={contextActions}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                    paginationServerOptions={paging}
                    paginationTotalRows={totalRows}
                    //onChangePage={handlePageChange}
                    //onChangeRowsPerPage={handlePerRowsChange}
                />
            </CardBody>
        </Fragment>
	)
}

export default CustomersList;