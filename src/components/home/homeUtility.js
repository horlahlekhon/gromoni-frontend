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



export const ChartExtractor = (period) => {
  var totalSales = []
  var productSold = []
  var debt = []

  for(let index = 0;index < period.series.length;index++){
     totalSales.push(parseFloat(period.series[index].sales_total))
     productSold.push(period.series[index].product_sold)
     debt.push(parseFloat(period.series[index].debt))
     
  }

  return {
    totalSales,
    productSold,
    debt
  };
}


export const convertDateToMonthNames = (dates) => {
    return dates.map(e => new Date(e).toLocaleString('default', {month: 'long'}))
}


// export const HomeCashBalanceChartData = (props) => {

//   const history = useHistory()
//   const [weeklyCashBalanceChartData, setWeeklyCashBalanceChartData] = useState({})
//   const [monthlyCashBalanceChartData, setMonthlyCashBalanceChartData] = useState({})
//   const [yearlyCashBalanceChartData, setYearlyCashBalanceChartData] = useState({})
//   const [apiError, setApiError] = useState([])
//   const [token, setToken] = useCookie("accessToken")
//   const [loading, setLoading] = useState(true)

  
// };

export const HomeCashBalanceChartOptions = (series, labels) => {

  //     for(let index = 0;index < series.length;index++){
  //   console.log(series[index].sales_total);
  //   total_sales = series[index].sales_total
  // }

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
          data: series.totalSales
        }, {

          name: "Product Sold",
          data: series.productSold
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
                    low: labels === undefined ? 0 : labels,
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
 