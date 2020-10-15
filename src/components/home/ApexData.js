import React from 'ract';
import configDB from '../../data/customizer/config'
const primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;
const secondary = localStorage.getItem('secondary_color') || configDB.data.color.secondary_color;

export const apexColumnChartsone = {


     series: series === undefined ? [{
            name: name,
            data: [0, 0, 0, 0, 0, 0, 0, 0]
        }] : [{

          name: "Total Sales",
          data: sales_total
        }, {

          name: "Products Sold",
          data: Product_sold
        }, {

          name: "Debts",
          data: debt

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
    
    
    };
 