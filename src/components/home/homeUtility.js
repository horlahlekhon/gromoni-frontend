
// const primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;


// EXTRACTS DATA FOR PARTICULAR FILEDS FROM THE PULLED API RESOURCES
export const ChartExtractor = (period) => {
  const totalSales = []
    const productSold = [];
    const debt = [];

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

export const HomeCashBalanceChartOptions = (series, labels) => {

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
          toolbar: {show: false},
          type: 'bar',
          height: 500
        },
        colors:['#c3c60a', '#dc07eb', '#f10342'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '45%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
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
      responsive: [
        {
          breakpoint: 992,
          options: {
              stroke: {
                  width: 5
              },
              chart: {
                  height: 200
              }
          }
        },
        {
          breakpoint: 480,
          options: {
              stroke: {
                  width: 1
              }
          }
        },
        {
          breakpoint: 420,
          options: {
              stroke: {
                  width: 1
              }
          }
        }
    ]
    
  }
};
 