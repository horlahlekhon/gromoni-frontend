import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import configDB from '../../data/customizer/config'
import {responseErrorParser} from "../../components/common/utilityFUnctions";
import {toast} from 'react-toastify';
import {useCookie} from "@shopify/react-cookie";
import { HTTP } from '../../api';

const primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;
const secondary = localStorage.getItem('secondary_color') || configDB.data.color.secondary_color;
const currentBusiness = localStorage.getItem("__grm__act__biz__");


// QUERIES THE API AND PULL DATAA FOR HOME SALES CASH BALANCE
export const getHomeChartData = (token, business) => {
    return HTTP.growthApi(token)
        .get(`/report/${currentBusiness}/dashboards/business/`)
}

export const HomeCashBalanceChartData = (props) => {
  const history = useHistory()
  const [weeklyCashBalanceChartData, setWeeklyCashBalanceChartData] = useState({})
  const [monthlyCashBalanceChartData, setMonthlyCashBalanceChartData] = useState({})
  const [yearlyCashBalanceChartData, setYearlyCashBalanceChartData] = useState({})
  const [apiError, setApiError] = useState([])
  const [token, setToken] = useCookie("accessToken")
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
                // setChartData(response.data.analytics)
            }

        }
        getPayload(token, currentBusiness)



    }, [currentBusiness, token])
  
  return ;
};


export const HomeCashBalanceChartOptions = (series, labels, name) => {

  return {



     series: series === undefined ? [{
            name: "Total Sales",
            data: [0, 0, 0, 0, 0, 0, 0, 0]

        },
        {
            name: "Product Sold",
            data: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Debt",
           data: [0, 0, 0, 0, 0, 0, 0, 0]

        }] : [{

          name: "Total Sales",
          data: series.sales_total
        }, {

          name: "Product Sold",
          data: series.product_sold
        }, {

          name: "Debt",
          data: series.debt

        }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        colors:['#51bc25', primary, '#f10342'],
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: labels === undefined ? [0] : labels,
          tickPlacement: 'on',
                labels: {
                    low: labels === undefined ? 0 : labels[0],
                    offsetX: 0, show: labels !== undefined
                }
        },
        yaxis: {
          title: {
            text: '#(thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "# " + val + " thousands"
            }
          }
        }
      },
    
  }
    };
 