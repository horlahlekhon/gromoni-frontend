import React, {Fragment, useCallback, useEffect, useState} from 'react'
// import Home from '../components/home/Home'
import BreadCrumb from '../../layout/Breadcrumb'
import TopStatBar from '../../components/sales/TopStatBar'
import SalesGraph from '../../components/sales/SalesGraph'
import StatusBadges from '../../components/sales/StatusBadge'
import {Bell} from 'react-feather'
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import SalesTable from '../../components/sales/SalesTable'
import {salesDashboardData} from './pageUtility'
import {useCookie} from "@shopify/react-cookie";
import {responseErrorParser} from "../../components/common/utilityFUnctions";
import {toast, ToastContainer} from 'react-toastify';
import {useHistory} from 'react-router-dom'

const SalesPage = (props) => {
    const  history = useHistory()
    const [salesUpdateStat, setSalesUpdateStat] = useState({})
    const [pendingSales, setPendingSales] = useState(0)
    const [clearedSales, setClearedSales] = useState(0)
    const [savedSales, setSavedSales] = useState(0)

    const [chartData, setChartData] = useState({})
    const [salesList, setSalesList] = useState([])
    const [topBarData, setTopBarData] = useState({})
    const [loading, setLoading] = useState(true)
    const [apiError, setApiError] = useState([])
    const [token, setToken] = useCookie("accessToken")
    const currentBusiness = localStorage.getItem("__grm__act__biz__")

    const getPayload = useCallback(() => {
        salesDashboardData(token, currentBusiness)
            .then(response => {
                if (response.status === 404) {
                    toast.error("Business not found please relogin")
                    history.push({
                        pathname: "/login",
                        state: {
                            error: "Business not found please re-login",
                            isRedirect: true,
                            redirectRoute: "/sales/"
                        }
                    })
                } else if (response.status !== 200) {
                    setLoading(false)
                    setApiError(responseErrorParser(response.data))
                } else {
                    setChartData(response.data.analytics)
                    setSalesList(response.data.results)
                    setSavedSales(response.data.analytics.saved)
                    setPendingSales(response.data.analytics.pending)
                    setClearedSales(response.data.analytics.cleared)
                    setTopBarData({
                        NosOfSales: response.data.analytics.sales_total_count,
                        overallSales: response.data.analytics.overall_sales_amount
                    })
                }
            })
            .catch((error) => {
                setLoading(false)
                setApiError(responseErrorParser(error.message))

            })
    }, [token, currentBusiness])

    useEffect(() => {
        getPayload()
    }, [getPayload])
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

    const salesWeekChart = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [
            [300, 600, 500, 800, 500, 400, 650],
            [400, 200, 100, 100, 300, 200, 50]
        ]
    }
    const salesMonthlyChart = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        series: [
            [300, 600, 500, 800, 500, 400, 650, 300, 600, 500, 800, 500],
            [300, 600, 500, 800, 500, 400, 650, 650, 650, 900, 300, 600]
        ]
    }

    const salesYearlyChart = {
        labels: ['2019', '2020'],
        series: [
            [30000, 25000],
            [400, 100]
        ]
    }
    const topBarDataDummy = {NosOfSales: 350, overallSales: 450}
    return (
        <Fragment>
            <BreadCrumb parent="Home" subparent="Sales" title="Sales"/>
            <Container fluid={true}>
                <ToastContainer/>
                {apiError.length > 0 ? apiError.forEach(e => toast.error(e.message)) : ''}
                <TopStatBar data={topBarData}/>
                <SalesGraph salesWeekChart={salesWeekChart} salesMonthlyChart={salesMonthlyChart}
                            salesYearlyChart={salesYearlyChart}/>
                <StatusBadges data={salesUpdateStatDummy}/>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <SalesTable title="History"/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default SalesPage;