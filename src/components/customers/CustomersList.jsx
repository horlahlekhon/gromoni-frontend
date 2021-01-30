//DISPLAY EXISTING CUSTOMER, AND MANAGE CUSTOMERS 
import React, {Fragment,useState,useCallback,useMemo} from 'react';
import {Container,Row, Col, Card, CardBody} from 'reactstrap';
import {useCookies} from "react-cookie";
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';

//import {parseData,paging,handleRowSelected,handlePerRowsChange,handlePageChange}
   // from './CustomersUtility';
import DataTable from 'react-data-table-component';
import CustomersListQuery from './CustomersListQuery'
import {GrowthAPI} from "../../api/http";


const CustomersList = (props) => {

    const currentBusiness = localStorage.getItem("__grm__act__biz__");
	const [toggleCleared,setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState(props.data.customers);
    const [, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(props.data.totalRows);
    const [apiError, setApiError] = useState(undefined)
    const [perPage,] = useState(10);
    const [cookies,] = useCookies(["accessToken"])
    const accessToken = cookies.accessToken
    const [searchResult,] = useState([])
    const initialResults = props.data.customers
    //const [data, setData] = useState(tableData);

	const tableColumns = [
        {
            name: 'Customer Name',
            selector: 'name',
            sortable: true,
            center: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: false,
            center: true,
        },
        {
            name: 'Phone',
            selector: 'phone',
            sortable: false,
            center: true,
        },
        {
            name: 'Amount Owed',
            selector: 'amount_owed',
            sortable: true,
            center: true,
        },
        {
            name: 'Spendings',
            selector: 'Total_spent',
            sortable: true,
            center: true,
        },
        {
            name: 'Location',
            selector: 'Country',
            sortable: true,
            center: true,
        }
    ]

     // eslint-disable-next-line
     async function getQueriedData(page, currentBusiness, token, perPage) {
        setLoading(true)
        const api = new GrowthAPI(accessToken, currentBusiness)
        const response = await api
            .getCustomerQueryData({pageSize: perPage, page})
            .catch((error) => {
                setLoading(false)
                setApiError(error.payload)
            })
        if (!apiError) {
            if (response.statusCode === 200) {
                setData(response.payload.results)
                setTotalRows(response.payload.count)
                setLoading(false)
            } else {
                const error = response.payload
                setApiError(error)
                error.forEach(e => toast.error(e.message))
            }
        } else {
            apiError.forEach(e => toast.error(e.message))
        }
    }
    


    const paging = {persistSelectedOnPageChange: false, persistSelectedOnSort: false}

    const handlePageChange = (page) => {
        getQueriedData(page, currentBusiness, accessToken, perPage)
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        await getQueriedData(page, currentBusiness, accessToken, newPerPage)
    }

    const handleRowSelected = useCallback(state => {
      setSelectedRows(state.selectedRows);
    }, []);


    const handleSearch = (searchKey,initialResults) => {
         const res = typeof searchKey !== 'string' || !searchKey ? searchResult : initialResults.filter(e => e.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
         setData(res)
    }

    const contextActions = useMemo(() => {
      const handleDelete = () => {
        
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
          setToggleCleared(!toggleCleared);
          setData(differenceBy(data, selectedRows, 'name'));
          toast.success("Successfully Deleted !")
        }
      };
  
      return (
            <div className="m-t-2">
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
                    business={currentBusiness}
                />
                <DataTable
                    data={data}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    //fixedHeader={true}
                    highlightOnHover={true}
                    selectableRows
                    persistTableHead
                    pagination
                    paginationServer
                    //noHeader
                    selectsRange
                    contextActions={contextActions}
                    onSelectedRowsChange={contextActions}
                    clearSelectedRows={toggleCleared}
                    paginationServerOptions={paging}
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                />
            </CardBody>
        </Fragment>
	)
}

export default CustomersList;