import React from "react";
import configDB from "../../data/customizer/config";

const primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;
const secondary = localStorage.getItem('secondary_color') || configDB.data.color.secondary_color;

export const decideStatus = (status) => {
    switch (status) {
        // case "PENDING":
        //     return <span className={`badge badge-pill pill-badge-info`}>Pending</span>
        case "A":
            return <span className={`badge badge-pill pill-badge-danger`}>Credited</span>
        case "I":
            return <span className={`badge badge-pill pill-badge-success`}>Cleared</span>
        default:
            return ""
    }
}
export const parseData = (data) => {
    if (data !== undefined) {
        const res = data.map(payload => {
            return {
                id: payload.id,
                name: payload.product.name,
                customer: payload.customer.name,
                price: new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN'
                }).format(payload.sales_order.total_cost),
                discount: `${payload.product.discount.percentage_discounted}%`,
                status: decideStatus(payload.credit_status),
                ts_created: payload.ts_created
            }
        })
        return res
    } else {
        return {}
    }
}

export const dataOptions = (series, labels, name) => {

    return {
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
                categories: labels === undefined ? [0] : labels,
                tickPlacement: 'on',
                labels: {
                    low: labels === undefined ? 0 : labels[0],
                    offsetX: 0, show: labels !== undefined
                },
                // axisBorder: {low: 0, offsetX: 0, show: false}
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
                            return val + " Units"
                        }
                    }
                },
            grid:
                {
                    borderColor: "#f5f8fd", clipMarkers: false, yaxis: {lines: {show: true}}
                },
            yaxis: {
                tickAmount: series === undefined ? 5 : Math.max(...series) / 10,
                min: 0,
                max: series === undefined ? 0 : Math.max(...series),
                labels: {style: {color: '#6e7e96'}}
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
        },
        series: series === undefined ? [{
            name: name,
            data: [0, 0, 0, 0, 0, 0, 0, 0]
        }] : [{name: name, data: series}]

    }
}
