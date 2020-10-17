import React, {Fragment, useEffect, useState} from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {SalesGraph, SalesTable, StatusBadges, TopStatBar} from '../../components/sales'
import {Card, Col, Container, Row} from 'reactstrap';
import {salesDashboardData} from './pageUtility'
import {useCookie} from "@shopify/react-cookie";
import {convertDateToMonthNames, responseErrorParser} from "../../components/common/utilityFunctions";
import {toast, ToastContainer} from 'react-toastify';
import {useHistory} from 'react-router-dom'

const SalesPage = () => {
    const history = useHistory()
    const [pendingSales, setPendingSales] = useState(0)
    const [clearedSales, setClearedSales] = useState(0)
    const [savedSales, setSavedSales] = useState(0)
    const [weeklyChartData, setWeeklyChartData] = useState({})
    const [monthlyChartData, setMonthlyChartData] = useState({})
    const [yearlyChartData, setYearlyChartData] = useState({})
    const [salesTableData, setSalesTableData] = useState({})
    const [topBarData, setTopBarData] = useState({})
    const [, setLoading] = useState(true)
    const [apiError, setApiError] = useState([])
    const [token,] = useCookie("accessToken")
    const currentBusiness = localStorage.getItem("__grm__act__biz__")

    useEffect(() => {
        async function getPayload(token, currentBusiness) {
            const response = await salesDashboardData(token, currentBusiness)
                .catch((error) => {
                    setLoading(false)
                    setApiError(responseErrorParser(error.message))
                })

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
                setWeeklyChartData({
                    labels: response.data.analytics.weekly_data.labels,
                    series: response.data.analytics.weekly_data.series,
                    name: "<b>sales</b> (Sales for the Day)"
                })
                setMonthlyChartData({
                    labels: convertDateToMonthNames(response.data.analytics.monthly_data.labels),
                    series: response.data.analytics.monthly_data.series,
                    name: "<b>sales</b> (Sales for the Month)"
                })
                setYearlyChartData({
                    labels: response.data.analytics.monthly_data.labels,
                    series: response.data.analytics.yearly_data.series,
                    name: "<b>sales</b> (Sales for the Year)"
                })
                setSavedSales(response.data.analytics.saved)
                setPendingSales(response.data.analytics.pending)
                setClearedSales(response.data.analytics.cleared)
                setTopBarData({
                    NosOfSales: response.data.analytics.sales_total_count,
                    overallSales: response.data.analytics.overall_sales_amount
                })
                setSalesTableData({
                    results: response.data.results,
                    totalRow: response.data.count,
                })
            }

        }

        getPayload(token, currentBusiness)


    }, [currentBusiness, token, history])

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

    return (

        <Fragment>
            <BreadCrumb parent="Home" subparent="Sales" title="Sales"/>
            <Container fluid={true}>
                <ToastContainer/>
                {apiError.length > 0 ? apiError.forEach(e => toast.error(e.message)) : ''}
                <TopStatBar data={topBarData}/>
                <SalesGraph
                    salesWeeklyChart={weeklyChartData}
                    salesMonthlyChart={monthlyChartData}
                    salesYearlyChart={yearlyChartData}
                />
                <StatusBadges
                    data={salesUpdateStatDummy}
                />
                <Row>
                    <Col sm="12">
                        <Card>
                            <SalesTable title="History" data={salesTableData}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default SalesPage;