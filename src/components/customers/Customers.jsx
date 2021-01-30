import React,{Fragment,useEffect,useState} from 'react';
import {responseErrorParser} from "../common/utilityFunctions";
import { GrowthAPI } from '../../api';
import {toast} from 'react-toastify';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

import CustomerStats from './CustomerStats'
import CustomersList from './CustomersList'
import {parseData} from './CustomersUtility'

const Customers = () => {
	const currentBusiness = localStorage.getItem("__grm__act__biz__");
    //const history = useHistory();
    const [cookie,] = useCookies(["accessToken"]);
    const token = cookie.accessToken;
    const [data, setData] = useState();

    const [apiError, setApiError] = useState([])
    const [, setLoading] = useState(true)

	 useEffect(() => {
        async function getCustomersData() {
            const api = new GrowthAPI(token, currentBusiness)
            const perPage = 10
            setLoading(true)
            const response = await api
                .getCustomerQueryData({pageSize: perPage, page: 1})
                .catch((error) => {
                    setLoading(false)
                    setApiError(error.payload)
                })
            if (apiError === undefined) {
                if (response.statusCode === 200 ||201) {
                    setData(
                    	{
                    		customers: response.payload.results,
                    		totalRows: response.payload.count
                    	}

                    )
                } else {
                    const error = response.payload
                    setApiError(error)
                    error.forEach(e => toast.error(e.message))
                }
            } else {
                apiError.forEach(e => toast.error(e.message))
            }
        }

        getCustomersData()
    }, [token, currentBusiness, apiError])

	return (
		<Fragment>
			<CustomerStats />
			<CustomersList data={data} />
		</Fragment>
	)
}

export default Customers;