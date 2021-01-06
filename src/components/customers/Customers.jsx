import React,{Fragment,useEffect,useState} from 'react';
import {responseErrorParser} from "../common/utilityFunctions";
import { GrowthAPI } from '../../api';
import {toast} from 'react-toastify';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

import CustomerStats from './CustomerStats'
import CustomersList from './CustomersList'

const Customers = () => {
	const currentBusiness = localStorage.getItem("__grm__act__biz__");
    const history = useHistory();
    const [cookie,] = useCookies(["accessToken"]);
    const token = cookie.accessToken

    const [apiError, setApiError] = useState([])
    const [, setLoading] = useState(true)

	useEffect( () => {
		async function getCustomers(token, currentBusiness) {
        	const api = new GrowthAPI(token, currentBusiness)

            const response = await api
            	.getCustomersData()
                .catch((error) => {
                    setLoading(false)
                    setApiError(responseErrorParser(error.message))
                })

            if (response.statusCode === 404) {
                toast.error("Business not found please login again")
                history.push({
                    pathname: "/login",
                    state: {
                        error: "Business not found please login again",
                        isRedirect: true,
                        redirectRoute: "/home/"
                    }
                }) 
            } else if (response.statusCode === 200) {
            	console.log("DATA PLENTY")
            } else {
	                const error = response.payload
	                setApiError(error)
	                error.forEach(e => toast.error(e.message))
	                console.log("NO DATA");
	        }
        }

        getCustomers(token, currentBusiness);

	}, [token, currentBusiness, apiError, history])

	return (
		<Fragment>
			<CustomerStats />
			<CustomersList />
		</Fragment>
	)
}

export default Customers;