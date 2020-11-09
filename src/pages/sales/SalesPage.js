import React, {Fragment, useEffect, useState} from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {SalesGraph, SalesTable, StatusBadges, TopStatBar} from '../../components/sales'
import {Card, Col, Container, Row} from 'reactstrap';
import {useCookies} from "react-cookie";
import {convertDateToNames} from "../../components/common/utilityFunctions";
import {toast, ToastContainer} from 'react-toastify';
import {Link, useHistory} from 'react-router-dom'
import {Plus} from "react-feather";
import {GrowthAPI} from "../../api";
import TableHeader from "../../components/sales/TableHeader";

const SalesPage = () => {
    const history = useHistory()
    const [pageState, setPageState] = useState({})
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
                setPageState({
                    weeklyChartData: {
                        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
                        series: response.payload.analytics.weekly_data.series,
                        name: "<b>sales</b> (Sales for the Day)"
                    },
                    monthlyChartData: {
                        labels: convertDateToNames(response.payload.analytics.monthly_data.labels, "month"),
                        series: response.payload.analytics.monthly_data.series,
                        name: "<b>sales</b> (Sales for the Month)"
                    },
                    yearlyChartData: {
                        labels: response.payload.analytics.yearly_data.labels,
                        series: response.payload.analytics.yearly_data.series,
                        name: "<b>sales</b> (Sales for the Year)"
                    },
                    savedSales: response.payload.analytics.saved,
                    pendingSales: response.payload.analytics.pending,
                    clearedSales: response.payload.analytics.cleared,
                    topBarData: {
                        NosOfSales: response.payload.analytics.sales_total_count,
                        overallSales: response.payload.analytics.overall_sales_amount,
                        trend: {amount: 1000, status: "increase"}
                    },
                    salesTableData: {
                        results: response.payload.results,
                        totalRow: response.payload.count,
                    },

                })
                console.log("use effect data: ", pageState)
            } else {
                setLoading(false)
                setApiError(response.payload ? response.payload : [])
            }
        }

        getPayload()


    }, [token, currentBusiness, history])

    const salesUpdateStatDummy = {
        pending: {
            count: pageState.pendingSales,
            tip: "This contains all sales that has NOT been paid for."
        },
        cleared: {
            count: pageState.clearedSales,
            tip: "This contains all sales that have been paid for."
        },
        archive: {
            count: pageState.savedSales,
            tip: "This contains all sales that have been saved, automatically empties after 14 days"
        },

    }

    return (

        <Fragment>
            <BreadCrumb parent="Home" subparent="Sales" title="Home"/>
            <Container fluid={true}>
                <ToastContainer/>
                {apiError.length > 0 ? apiError.forEach(e => toast.error(e.message)) : ''}
                <TopStatBar data={pageState.topBarData}/>
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
                    salesWeeklyChart={pageState.weeklyChartData}
                    salesMonthlyChart={pageState.monthlyChartData}
                    salesYearlyChart={pageState.yearlyChartData}
                />
                <StatusBadges
                    data={salesUpdateStatDummy}
                />
                <Row>
                    <Col sm="12">
                        {console.log("Sales dashboard renders.....")}
                        <Card>
                            <SalesTable
                                title="History"
                                // data={salesTableData}
                                tableHeader={TableHeader}
                                currentBusiness={currentBusiness}
                                accessToken={token}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default SalesPage;