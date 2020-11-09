import React, {useState, useEffect, Fragment} from 'react'
import BreadCrumb from "../../layout/Breadcrumb";
import {Container} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {Plus} from "react-feather";
import {TopStatBar} from "../../components/products";
import {GrowthAPI} from "../../api";
import {parseData} from "../../components/products/utils";
import ProductTable from "../../components/products/ProductTable";
import {useCookies} from "react-cookie";

const ProductDashboard = (props) => {
    const currentBusiness = localStorage.getItem("__grm__act__biz__")
    const [topBarData, setTopBarData] = useState({
        totalNosOfProduct: 0,
        outOfStock: 0
    })
    const [cookies,] = useCookies(["accessToken"])
    const token = cookies.accessToken

    const [apiError, setApiError] = useState([])
    const [data, setData] = useState({})
const perPage = 10
     function fetchData(currentBusiness, token) {
        const api = new GrowthAPI(token, currentBusiness)
        const request =  (page, perPage) => {
            const response =  api
                .allProducts({pageSize: perPage, page})
                .then(response => {
                    if (response.statusCode === 200) {
                        setData({
                            results: parseData(response.payload.results),
                            totalRows: response.payload.count
                        })
                        console.log("producttable.response.payload, fetchData", response.payload)
                        setTopBarData({
                            totalNosOfProduct: response.payload.count,
                            outOfStock: response.payload.results.map(e => e.stock <= 0)
                        })
                    } else {
                        const error = response.payload
                        setApiError(error)
                        error.forEach(e => toast.error(e.message))
                    }
                })
                .catch((error) => {
                    setApiError(error.payload)
                    apiError.forEach(e => toast.error(e.message))
                })
        }

        return request
    }

    useEffect(() => {
        fetchData(currentBusiness, token)(1, perPage)
    }, [currentBusiness, token, perPage])

    return (
        <Fragment>
            <BreadCrumb parent="Home" subparent="Products" title="Home"/>
            <Container fluid={true}>
                <ToastContainer/>
                <TopStatBar data={topBarData}/>
                <Row>
                    <Col xl={{size: 4, offset: 4}} className="text-center horizontal-item-alignment ">
                        <Link to={`/business/${currentBusiness}/product/new`}>
                            <div
                                className="mb-4 b-r-10 shadow shadow-showcase create-sale-button vertical-items-alignment ">
                                <div className="horizontal-item-alignment ">
                                    <p className="m-b-0">Create product</p>
                                    <Plus/>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
                {
                    console.log("datatattattata", data)
                }
                <ProductTable
                    data={data}
                    perPage={perPage}
                    dataFunc={fetchData(currentBusiness, token)}
                    currentBusiness={currentBusiness}
                />
            </Container>
        </Fragment>
    )
}

export default ProductDashboard
