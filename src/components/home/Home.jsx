import React, {useState, useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb';
import {useHistory,NavLink} from 'react-router-dom';
import {responseErrorParser} from "../../components/common/utilityFUnctions";
import {toast} from 'react-toastify';
import {useCookie} from "@shopify/react-cookie";
import {HomeCashBalanceChartData,getHomeChartData} from './homeUtility';
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
                setWeeklyCashBalanceChartData({
                    labels: data.weekly_data.labels,
                    series: [{name: "<b>ICU</b> (Weekly Sales CashBalance)", data: data.weekly_data.series}]

                })
                setMonthlyCashBalanceChartData({
                    labels: data.monthly_data.labels,
                    series: [{name: "<b>ICU</b> (Monthly Sales CashBalance)", data: data.monthly_data.series}]
                })
                setYearlyCashBalanceChartData({
                   labels: data.yearly_data.labels,
                    series:  [{name: "<b>ICU</b> (Yearly Sales CashBalance)", data: data.yearly_data.series}]

                })
            }

        }
        getPayload(token, currentBusiness)


    }, [currentBusiness, token])
  
	
	return (
		<div className="homePage">

			<BreadCrumb parent={<NavLink to="/"> Home </NavLink>} subparent={<NavLink to="/">Dashboard</NavLink>} title="Home"/>
			<SalesCashBalance />
			<SalesCashBalanceChart weeklyCashBalanceChart={weeklyCashBalanceChartData}
									monthlyCashBalanceChart={monthlyCashBalanceChartData}
                            		yearlyCashBalanceChart={yearlyCashBalanceChartData}
            />
			<CreateNewButtons />
		</div>
	)
}

export default Home;