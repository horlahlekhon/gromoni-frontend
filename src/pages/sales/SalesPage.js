import React, {Fragment, useEffect, useState} from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {SalesGraph, SalesTable, StatusBadges, TopStatBar} from '../../components/sales'
import {Card, Col, Container, Row} from 'reactstrap';
import {useCookies} from "react-cookie";
import {convertDateToNames} from "../../components/common/utilityFunctions";
import {toast, ToastContainer} from 'react-toastify';
import {Link, useHistory} from 'react-router-dom'
import {Plus} from "react-feather";
import {GrowthAPI} from "../../api/http";

const SalesPage = () => {
    const history = useHistory()
    const [pendingSales, setPendingSales] = useState(0)
    const [clearedSales, setClearedSales] = useState(0)
    const [savedSales, setSavedSales] = useState(0)
    const [weeklyChartData, setWeeklyChartData] = useState({})
    const [monthlyChartData, setMonthlyChartData] = useState({})
    const [yearlyChartData, setYearlyChartData] = useState({})
    const [salesTableData, setSalesTableData] = useState({})
    const [topBarData, setTopBarData] = useState({
        NosOfSales: 0,
        overallSales: 0,
        trend: {amount: 1000, status: "increase"}
    })
    const [, setLoading] = useState(true)
    const [apiError, setApiError] = useState([])
    const [cookies,] = useCookies(["accessToken"])
    const currentBusiness = localStorage.getItem("__grm__act__biz__")
    const token = cookies.accessToken
    useEffect(() => {
        async function getPayload() {
            const api = new GrowthAPI(token, currentBusiness)
            const response = await api.saleDashboard()
                .catch((error) => {
                    setLoading(false)
                    setApiError(error.payload ? error.payload : [])
                })

            if (response.statusCode === 404) {
                toast.error("Business not found please relogin")
                //TODO redirecting should be aware of the outgoing page... what bthis means is that for example here that we are redirecting to login
                // TODO whe the user logs in again, we should coe back to this page.
                history.push({
                    pathname: "/login",
                    state: {
                        error: "Business not found please re-login",
                        isRedirect: true,
                        redirectRoute: "/sales/"
                    }
                })
            } else if (response.statusCode === 200 || response.statusCode === 201) {
                setWeeklyChartData({
                    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
                    series: response.payload.analytics.weekly_data.series,
                    name: "<b>sales</b> (Sales for the Day)"
                })
                setMonthlyChartData({
                    labels: convertDateToNames(response.payload.analytics.monthly_data.labels, "month"),
                    series: response.payload.analytics.monthly_data.series,
                    name: "<b>sales</b> (Sales for the Month)"
                })
                setYearlyChartData({
                    labels: response.payload.analytics.yearly_data.labels,
                    series: response.payload.analytics.yearly_data.series,
                    name: "<b>sales</b> (Sales for the Year)"
                })
                setSavedSales(response.payload.analytics.saved)
                setPendingSales(response.payload.analytics.pending)
                setClearedSales(response.payload.analytics.cleared)
                setTopBarData({
                    NosOfSales: response.payload.analytics.sales_total_count,
                    overallSales: response.payload.analytics.overall_sales_amount,
                    trend: {amount: 1000, status: "increase"}
                })
                setSalesTableData({
                    results: response.payload.results,
                    totalRow: response.payload.count,
                })

            } else {
                setLoading(false)
                setApiError(response.payload ? response.payload : [])
            }
        }

        getPayload()


    }, [token, currentBusiness, history])

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
            <BreadCrumb parent="Home" subparent="Sales" title="Home"/>
            <Container fluid={true}>
                <ToastContainer/>
                {apiError.length > 0 ? apiError.forEach(e => toast.error(e.message)) : ''}
                <TopStatBar data={topBarData}/>
                <Row>
                    <Col xl={{size: 4, offset: 4}} className="text-center horizontal-item-alignment ">
                        <Link to={`/business/${currentBusiness}/sales/new`}>
                            <div
                                className="mb-4 b-r-10 shadow shadow-showcase create-sale-button vertical-items-alignment ">
                                <div className="horizontal-item-alignment ">
                                    <p className="m-b-0">Create sale</p>
                                    <Plus/>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>

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