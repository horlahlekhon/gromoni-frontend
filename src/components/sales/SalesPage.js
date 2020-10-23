import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
// import Home from '../components/home/Home'
import BreadCrumb from '../../layout/Breadcrumb';
import TopStatBar from '../../components/sales/TopStatBar';
import SalesGraph from '../../components/sales/SalesGraph';
import StatusBadges from '../../components/sales/StatusBadge';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import SalesTable from './SalesTable';
import {salesDashboardData} from './pageUtility';
import {useCookie} from "@shopify/react-cookie";
import {responseErrorParser} from "../../components/common/utilityFUnctions";
import {toast, ToastContainer} from 'react-toastify';
import {useHistory,NavLinK} from 'react-router-dom';
import data from "../../data/chat/chatMember";

const SalesPage = (props) => {
    const history = useHistory()
    const [salesUpdateStat, setSalesUpdateStat] = useState({})
    const [pendingSales, setPendingSales] = useState(0)
    const [clearedSales, setClearedSales] = useState(0)
    const [savedSales, setSavedSales] = useState(0)
    const [weeklyChartData, setWeeklyChartData] = useState({})
    const [monthlyChartData, setMonthlyChartData] = useState({})
    const [yearlyChartData, setYearlyChartData] = useState({})
    const [salesTableData, setSalesTableData] = useState([])
    const [chartData, setChartData] = useState( {})
    const [salesList, setSalesList] = useState([])
    const [topBarData, setTopBarData] = useState({})
    const [loading, setLoading] = useState(true)
    const [apiError, setApiError] = useState([])
    const [token, setToken] = useCookie("accessToken")
    const currentBusiness = localStorage.getItem("__grm__act__biz__")

    // const cleanWeeklyChart = (data) => {
    //     const labels = data.weekly_data.map(e => Object.keys(e)[0])
    //     const values =
    // }



    useEffect( () => {
        async function getPayload(token, currentBusiness) {
            const response = await salesDashboardData(token, currentBusiness)
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
                        redirectRoute: "/sales/"
                    }
                })
            } else if (response.status !== 200) {
                setLoading(false)
                setApiError(responseErrorParser(response.data))
            } else {
                const data = response.data.analytics
                setWeeklyChartData(data.weekly_data)
                setMonthlyChartData({
                    labels: data.monthly_data.labels,
                    series: [{name: "<b>ICU</b> (Sales for the week)", data: data.monthly_data.series}]
                })
                setYearlyChartData(data.yearly_data)
                // setChartData(response.data.analytics)
                setSalesList(response.data.results)
                setSavedSales(response.data.analytics.saved)
                setPendingSales(response.data.analytics.pending)
                setClearedSales(response.data.analytics.cleared)
                setTopBarData({
                    NosOfSales: response.data.analytics.sales_total_count,
                    overallSales: response.data.analytics.overall_sales_amount
                })
                setSalesTableData(response.data.results)
            }

        }
        getPayload(token, currentBusiness)



    }, [currentBusiness, token])

    const salesUpdateStatDummy = {
        pending: {
            count: pendingSales,
            tip: "This contains all sales that has NOT been paid for."
        },
        cleared: {
            count: clearedSales,
            tip: "This contains all sales that have been paid for."
        },
        archive: {
            count: savedSales,
            tip: "This contains all sales that have been saved, automatically empties after 14 days"
        },

    }

    console.log(`monthly data: ${monthlyChartData}`)

    const topBarDataDummy = {NosOfSales: 350, overallSales: 450}
    return (

        <Fragment>
            <BreadCrumb parent={<NavLink to="/">Home</NavLink>} subparent="Sales" title="Sales"/>
            <Container fluid={true}>
                <ToastContainer/>
                {apiError.length > 0 ? apiError.forEach(e => toast.error(e.message)) : ''}
                <TopStatBar data={topBarData}/>
                {/*{*/}
                {/*    console.log(`monthly chart daya: ${monthlyChartData.labels}`)*/}

                {/*}*/}
                {console.log(`top bar  data: ${topBarData}`)}
                <SalesGraph salesWeekChart={weeklyChartData} salesMonthlyChart={monthlyChartData}
                            salesYearlyChart={yearlyChartData}/>
                <StatusBadges data={salesUpdateStatDummy}/>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <SalesTable title="History" data={salesTableData}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default SalesPage;