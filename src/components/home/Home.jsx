import React, {useState, useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb';
import {useHistory,NavLink} from 'react-router-dom';
import {responseErrorParser} from "../../components/common/utilityFUnctions";
import {toast} from 'react-toastify';
import {useCookie} from "@shopify/react-cookie";
import {HomeCashBalanceChartData,getHomeChartData,ChartExtractor,convertDateToMonthNames} from './homeUtility';
import SalesCashBalance from './SalesCashBalance';
import SalesCashBalanceChart from './SalesCashBalanceChart';
import CreateNewButtons from './CreateNewButtons';

const currentBusiness = localStorage.getItem("__grm__act__biz__");



const  Home = (props) => {
  const history = useHistory();
  const [weeklyCashBalanceChartData, setWeeklyCashBalanceChartData] = useState({})
  const [monthlyCashBalanceChartData, setMonthlyCashBalanceChartData] = useState({})
  const [yearlyCashBalanceChartData, setYearlyCashBalanceChartData] = useState({})
  const [apiError, setApiError] = useState([])
  const [token, setToken] = useCookie("accessToken");
  const [loading, setLoading] = useState(true)


useEffect( () => {
        async function getPayload(token, currentBusiness) {
            const response = await getHomeChartData(token, currentBusiness)
                .catch((error) => {
                    setLoading(false)
                    setApiError(responseErrorParser(error.message))
                })

            if (response.status === 404) {
                toast.error("Business not found please login again")
                history.push({
                    pathname: "/login",
                    state: {
                        error: "Business not found please login again",
                        isRedirect: true,
                        redirectRoute: "/home/"
                    }
                })
            } else if (response.status !== 200) {
                setLoading(false)
                setApiError(responseErrorParser(response.data))
            } else {
                const data = response.data
                const weekly = ChartExtractor(data.weekly_data)
                const monthly = ChartExtractor(data.monthly_data)
                const yearly = ChartExtractor(data.yearly_data)
                const monthsName = convertDateToMonthNames(data.monthly_data.labels)

                setWeeklyCashBalanceChartData({
                    labels: data.weekly_data.labels,
                    series: [{
                      totalSales: weekly.totalSales,
                      productSold: weekly.productSold,
                      debt: weekly.debt
                    }]

                })
                setMonthlyCashBalanceChartData({
                    labels: monthsName,
                    series: [{
                      totalSales: monthly.totalSales,
                      productSold: monthly.productSold,
                      debt: monthly.debt
                    }]
                })
                setYearlyCashBalanceChartData({
                   labels: data.yearly_data.labels,
                    series:  [{
                      totalSales: yearly.totalSales,
                      productSold: yearly.productSold,
                      debt: yearly.debt
                    }]

                })

              console.log(weeklyCashBalanceChartData)
              console.log(weeklyCashBalanceChartData.labels)
              console.log(weeklyCashBalanceChartData.series.productSold)
              console.log(monthlyCashBalanceChartData.series.debt)
              console.log(monthlyCashBalanceChartData.labels)
              console.log(yearlyCashBalanceChartData)
              console.log(yearlyCashBalanceChartData.labels)
              console.log(yearlyCashBalanceChartData.series.totalSales)
              
            }

        }
        getPayload(token, currentBusiness)

    }, [currentBusiness, token])


	
	return (
		<div className="homePage">

			<BreadCrumb parent={<NavLink to="/"> Home </NavLink>} subparent={<NavLink to="/">Dashboard</NavLink>} title="Home"/>
			<SalesCashBalance />
			<SalesCashBalanceChart	weeklyCashBalanceChartData 
									monthlyCashBalanceChartData 
									yearlyCashBalanceChartData/>
			<CreateNewButtons />
		</div>
	)
}

export default Home;