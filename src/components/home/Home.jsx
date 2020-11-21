	// GLOBAL IMPORTS
import React, {useState, useEffect} from 'react';
import {useHistory,NavLink} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useCookies} from 'react-cookie';

// GENERAL USEABLE IMPORTS
import BreadCrumb from '../../layout/Breadcrumb';
import {responseErrorParser,convertDateToNames} from "../common/utilityFunctions";
import { GrowthAPI } from '../../api';

// COMPONENT SPECIFIC IMPORTS
import {ChartExtractor} from './homeUtility';
import SalesCashBalance from './SalesCashBalance';
import SalesCashBalanceChart from './SalesCashBalanceChart';
import CreateNewButtons from './CreateNewButtons';




const  Home = (props) => {
	const currentBusiness = localStorage.getItem("__grm__act__biz__");
    const history = useHistory();
    const [cookie,] = useCookies(["accessToken"]);
    const token = cookie.accessToken

    const [apiError, setApiError] = useState([])
    const [, setLoading] = useState(true)

    const [weeklyCashBalanceChartData, setWeeklyCashBalanceChartData] = useState({})
    const [monthlyCashBalanceChartData, setMonthlyCashBalanceChartData] = useState({})
    const [yearlyCashBalanceChartData, setYearlyCashBalanceChartData] = useState({})


useEffect( () => {
        async function getPayload(token, currentBusiness) {
        	const api = new GrowthAPI(token, currentBusiness)

            const response = await api
            	.getHomePageChart()
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
	                const data = response.payload
	                const weekly = ChartExtractor(data.weekly_data)
	                const monthly = ChartExtractor(data.monthly_data)
	                const yearly = ChartExtractor(data.yearly_data)
	                const monthsName = convertDateToNames(data.monthly_data.labels, 'month')

	                setWeeklyCashBalanceChartData({
	                    labels: data.weekly_data.labels,
	                    series: {
	                        totalSales: weekly.totalSales,
	                        productSold: weekly.productSold,
	                        debt: weekly.debt
	                    }
	                })
	                setMonthlyCashBalanceChartData({
	                    labels: monthsName,
	                    series: {
	                        totalSales: monthly.totalSales,
	                        productSold: monthly.productSold,
	                        debt: monthly.debt
	                    } 
	                })
	                setYearlyCashBalanceChartData({
	                   labels: data.yearly_data.labels,
	                    series: {
	                        totalSales: yearly.totalSales,
	                        productSold: yearly.productSold,
	                        debt: yearly.debt
	                    }
	                })  
	            } else {
	                const error = response.payload
	                setApiError(error)
	                error.forEach(e => toast.error(e.message))
	            }
        	//} else {

            //	apiError.forEach(e => toast.error(e.message))
        	
        	//}
    	}

        getPayload(token, currentBusiness)

}, [token, currentBusiness, apiError, history])


	return (
		<div className="homePage">

			<BreadCrumb parent={<NavLink to="/"> Home </NavLink>} subparent={<NavLink to="/">Dashboard</NavLink>} title="Home"/>
			<SalesCashBalance />
			<SalesCashBalanceChart	weeklyCashBalanceChartData = {weeklyCashBalanceChartData} 
									monthlyCashBalanceChartData = {monthlyCashBalanceChartData} 
									yearlyCashBalanceChartData = {yearlyCashBalanceChartData}
        />
			<CreateNewButtons />
		</div>
	)
}

export default Home;