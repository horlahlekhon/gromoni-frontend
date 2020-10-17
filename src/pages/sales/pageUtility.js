import {HTTP} from '../../api'
import configDB from "../../data/customizer/config";

const primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;
const secondary = localStorage.getItem('secondary_color') || configDB.data.color.secondary_color

//TODO refactor call to use getter from the API module
export const salesDashboardData = (token, business) => {
    return HTTP.growthApi(token)
        .get(`/report/${business}/dashboards/sales/?page_size=10`)
}

export const chartOptions = (series, labels) => {
    // eslint-disable-next-line
    const data = {
        options: {
            chart: {
                toolbar: {show: false}
            },
            colors: [primary, secondary],
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '25px'
                }
            },
            dataLabels: {enabled: true},
            stroke: {show: true, width: 8, colors: ['transparent']},
            xaxis: {
                categories: [0], labels: {low: 0, offsetX: 0, show: false},
                axisBorder: {low: 0, offsetX: 0, show: false}
            },
            fill: {
                colors: [primary, secondary],
                type: 'gradient',
                gradient: {
                    shade: 'light', type: 'vertical',
                    shadeIntensity: 0.3, inverseColors: true,
                    opacityFrom: 1, opacityTo: 1, stops: [0, 100]
                }
            },
            tooltip:
                {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                },
            grid:
                {
                    borderColor: "#f5f8fd", clipMarkers: false, yaxis: {lines: {show: true}}
                },
            yaxis: {tickAmount: 6, min: 0, max: 120, labels: {style: {color: '#6e7e96'}}},
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
        },
        series: [{name: '<b>ICU</b> (intensive care unit)', data: [80, 45, 114, 20, 80, 40, 55, 40]}
            // , {
            //     name: '<b>OPD</b> (out patient Department)',
            //     data: [35, 65, 80, 68, 60, 70, 20, 80]
            // }
        ]
    }
}