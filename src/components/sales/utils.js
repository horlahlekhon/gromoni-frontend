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


export const validateProductForm = (defaults, data) => {
    let ers = []
    console.log("defaults", defaults, "data", data)
    Object.keys(defaults).map(e => {
            if (data[e] === defaults[e].default) {
                ers.push({field: e, msg: defaults[e].message})
                return ers
            }
            return []
        }
    )
    if (ers.length <= 0) {
        return {isErrors: false, errors: []}
    } else {
        return {isErrors: true, errors: ers};
    }
}


export const dummyProductAndCustomerData = {
    customers: [
        {
            "id": "47c18fc7-269a-49b2-91a0-7accf25f6c05",
            "ts_created": "2021-10-17T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:52.373333+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 39.56,
                "latitude": 20.43,
                "place_name": "579307 city"
            },
            "name": "noname-3276636",
            "phone": "91443276761",
            "email": "temi8320125288@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "e11d7d94-c40e-462b-8171-c7cf399bb5ab",
            "ts_created": "2021-10-16T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:51.840821+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 61.23,
                "latitude": 69.19,
                "place_name": "776891 city"
            },
            "name": "noname-2528",
            "phone": "24200406722",
            "email": "temi6036283@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "af68a2b2-2703-40be-a566-580448e304b2",
            "ts_created": "2021-10-14T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:51.595880+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 67.85,
                "latitude": 51.1,
                "place_name": "821377 city"
            },
            "name": "noname-262623037023",
            "phone": "60985599787",
            "email": "temi322487@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "de778275-f96e-4d5b-9141-15edcbb0ce7d",
            "ts_created": "2021-10-13T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:45.935311+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 12.79,
                "latitude": 56.8,
                "place_name": "764974 city"
            },
            "name": "noname-6934299989",
            "phone": "33555854288",
            "email": "temi26328627@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "cf28b74c-cf41-461f-859f-cfbb93bcbcb0",
            "ts_created": "2021-10-13T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:52.145024+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 6.16,
                "latitude": 29.39,
                "place_name": "156405 city"
            },
            "name": "noname-92526006",
            "phone": "20631809251",
            "email": "temi1264752016@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "87e1d8fb-6f6e-4e3d-a2a5-4a4bfcfdd4c5",
            "ts_created": "2021-10-12T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:45.707167+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 38.73,
                "latitude": 22.82,
                "place_name": "809601 city"
            },
            "name": "noname-6667634030",
            "phone": "76880890137",
            "email": "temi162562@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "f32304fd-72d5-4326-bcac-b3b4a5829382",
            "ts_created": "2021-10-10T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:46.873884+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 23.38,
                "latitude": 34.94,
                "place_name": "231418 city"
            },
            "name": "noname-1163660765",
            "phone": "12751107906",
            "email": "temi10373@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "048698b5-2e28-4215-85fb-aef6a7b594f8",
            "ts_created": "2021-10-08T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:51.874989+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 45.59,
                "latitude": 49.57,
                "place_name": "475057 city"
            },
            "name": "noname-114390084",
            "phone": "68851757555",
            "email": "temi258062456@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "29c6be62-08ed-4003-8d1e-62931a2e19c9",
            "ts_created": "2021-10-04T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:46.021413+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 27.99,
                "latitude": 13.49,
                "place_name": "481490 city"
            },
            "name": "noname-156523526",
            "phone": "73918436633",
            "email": "temi899212871645@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "2d874d17-f5f1-4ff5-8d33-976d1cb32df8",
            "ts_created": "2021-09-19T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:46.107187+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 31.66,
                "latitude": 51.99,
                "place_name": "858450 city"
            },
            "name": "noname-20055",
            "phone": "70419628134",
            "email": "temi306569002603@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "7e08b966-4ca9-4f61-8458-2b67f57ad26e",
            "ts_created": "2021-09-18T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:51.803607+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 38.6,
                "latitude": 64.71,
                "place_name": "592815 city"
            },
            "name": "noname-3836760",
            "phone": "38985791760",
            "email": "temi1139501@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "8ea0890f-88b3-4982-91ee-c7d1b818ea49",
            "ts_created": "2021-09-01T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:46.449753+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 68.19,
                "latitude": 26.16,
                "place_name": "71041 city"
            },
            "name": "noname-46749",
            "phone": "51701141707",
            "email": "temi1988076040@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "3fd87256-6c70-4aa7-b89f-4eb44d12f7c1",
            "ts_created": "2021-08-30T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:52.506187+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 24.83,
                "latitude": 6.05,
                "place_name": "165102 city"
            },
            "name": "noname-16273",
            "phone": "10327525697",
            "email": "temi56698027@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "e8cb59a6-d95c-4ce7-ba37-fb50e27403fd",
            "ts_created": "2021-08-19T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:52.124111+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 66.36,
                "latitude": 25.37,
                "place_name": "923219 city"
            },
            "name": "noname-24636242308",
            "phone": "93626466267",
            "email": "temi27063542@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "e71b11b2-3bf5-45e2-9340-5249b50bf1b0",
            "ts_created": "2021-08-19T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:46.526898+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 7.82,
                "latitude": 42.98,
                "place_name": "18585 city"
            },
            "name": "noname-8863194",
            "phone": "99009247779",
            "email": "temi115386@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "4379a00b-eec3-4236-ba96-97567fc5e2db",
            "ts_created": "2021-08-15T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:51.857568+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 30.28,
                "latitude": 35.35,
                "place_name": "566830 city"
            },
            "name": "noname-914487723",
            "phone": "39354743457",
            "email": "temi600181@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "826928f0-e415-4c2b-bad1-19a676cf825f",
            "ts_created": "2021-08-14T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:52.070243+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 51.66,
                "latitude": 8.09,
                "place_name": "973472 city"
            },
            "name": "noname-71652854",
            "phone": "66572466828",
            "email": "temi107692186115@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "b70456bf-40a7-45d9-a74d-b3583ad94b16",
            "ts_created": "2021-08-03T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:46.607190+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 24.18,
                "latitude": 17.3,
                "place_name": "583265 city"
            },
            "name": "noname-1949",
            "phone": "65313414846",
            "email": "temi114825794@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "2c52978f-fedb-4ba9-9a0c-5a2b5eb78966",
            "ts_created": "2021-08-01T00:25:51.518455+01:00",
            "ts_updated": "2020-10-29T00:25:52.523166+01:00",
            "customer_type": "C",
            "billing_address": {
                "longitude": 35.17,
                "latitude": 41.04,
                "place_name": "223173 city"
            },
            "name": "noname-67080826477",
            "phone": "78607252550",
            "email": "temi3905@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        },
        {
            "id": "06813ee5-119d-4163-9f0f-671eb3b000fe",
            "ts_created": "2021-07-30T00:25:51.518455+01:00",
            "ts_updated": "2020-11-09T00:15:45.009894+01:00",
            "customer_type": "I",
            "billing_address": {
                "longitude": 28.17,
                "latitude": 40.84,
                "place_name": "252470 city"
            },
            "name": "noname-34402",
            "phone": "59668570121",
            "email": "temi105725667@yahoo.com",
            "country": "Nigeria",
            "gender": "None",
            "avatar": null,
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd"
        }
    ],
    products: [
        {
            "id": "5931d54e-8e90-482a-99b8-0b9c6e96f426",
            "ts_created": "2021-10-12T00:00:00+01:00",
            "ts_updated": "2021-10-12T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 13905.96,
            "margin": 1396.955,
            "margin_by_percentage": 995.45,
            "cost_of_production": 12509.0,
            "production_items": [
                {
                    "name": "78400588",
                    "cost": "6667.00",
                    "ts_created": "2020-11-08T23:15:46.945970Z"
                },
                {
                    "name": "2389400702",
                    "cost": "5842.00",
                    "ts_created": "2020-11-08T23:15:46.954574Z"
                }
            ],
            "current_discount": {
                "id": "d9eef5f3-8a60-4bf6-8e67-09d925d51afe",
                "ts_created": "2020-11-08T23:15:44.718253Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "13181.00",
            "sold": 4,
            "sold_this_month": 0,
            "name": "Kaftan-23914441",
            "vat_percentage": "7.5000",
            "product_type": "Casual-10",
            "status": "A",
            "avatar": null,
            "stock": 91,
            "description": null
        },
        {
            "id": "b1e56dd1-e721-48da-a2bc-55361a5c12a4",
            "ts_created": "2021-10-10T00:00:00+01:00",
            "ts_updated": "2021-10-10T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 4176.74,
            "margin": -8332.255,
            "margin_by_percentage": -50.13,
            "cost_of_production": 12509.0,
            "production_items": [
                {
                    "name": "78400588",
                    "cost": "6667.00",
                    "ts_created": "2020-11-08T23:15:46.945970Z"
                },
                {
                    "name": "2389400702",
                    "cost": "5842.00",
                    "ts_created": "2020-11-08T23:15:46.954574Z"
                }
            ],
            "current_discount": {
                "id": "d9eef5f3-8a60-4bf6-8e67-09d925d51afe",
                "ts_created": "2020-11-08T23:15:44.718253Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "3959.00",
            "sold": 4,
            "sold_this_month": 0,
            "name": "Kaftan-45559",
            "vat_percentage": "7.5000",
            "product_type": "Casual-3",
            "status": "A",
            "avatar": null,
            "stock": 91,
            "description": null
        },
        {
            "id": "e2333fbf-fe99-424a-a6b3-d09087b21d33",
            "ts_created": "2021-10-07T00:00:00+01:00",
            "ts_updated": "2021-10-07T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 4982.76,
            "margin": -7808.235,
            "margin_by_percentage": -63.81,
            "cost_of_production": 12791.0,
            "production_items": [
                {
                    "name": "6537883271",
                    "cost": "3842.00",
                    "ts_created": "2020-10-28T23:25:52.525597Z"
                },
                {
                    "name": "3202129644",
                    "cost": "8949.00",
                    "ts_created": "2020-10-28T23:25:52.528730Z"
                }
            ],
            "current_discount": {
                "id": "a7c51e9d-c205-4a61-9052-c8746cd9fe7b",
                "ts_created": "2020-10-28T23:25:51.530292Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "4723.00",
            "sold": 7,
            "sold_this_month": 1,
            "name": "Kaftan-727444907",
            "vat_percentage": "7.5000",
            "product_type": "Casual-2",
            "status": "A",
            "avatar": null,
            "stock": 86,
            "description": null
        },
        {
            "id": "450284b6-909f-42fb-ba85-a74ab63628aa",
            "ts_created": "2021-10-06T00:00:00+01:00",
            "ts_updated": "2021-10-06T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 9142.63,
            "margin": -3648.37,
            "margin_by_percentage": -250.59,
            "cost_of_production": 12791.0,
            "production_items": [
                {
                    "name": "6537883271",
                    "cost": "3842.00",
                    "ts_created": "2020-10-28T23:25:52.525597Z"
                },
                {
                    "name": "3202129644",
                    "cost": "8949.00",
                    "ts_created": "2020-10-28T23:25:52.528730Z"
                }
            ],
            "current_discount": {
                "id": "a7c51e9d-c205-4a61-9052-c8746cd9fe7b",
                "ts_created": "2020-10-28T23:25:51.530292Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "8666.00",
            "sold": 4,
            "sold_this_month": 1,
            "name": "Kaftan-1555820546",
            "vat_percentage": "7.5000",
            "product_type": "Casual-6",
            "status": "A",
            "avatar": null,
            "stock": 94,
            "description": null
        },
        {
            "id": "e92ec186-a9af-4c78-91f5-08e0e3561b7e",
            "ts_created": "2021-09-24T00:00:00+01:00",
            "ts_updated": "2021-09-24T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 1818.82,
            "margin": -10690.18,
            "margin_by_percentage": -17.01,
            "cost_of_production": 12509.0,
            "production_items": [
                {
                    "name": "78400588",
                    "cost": "6667.00",
                    "ts_created": "2020-11-08T23:15:46.945970Z"
                },
                {
                    "name": "2389400702",
                    "cost": "5842.00",
                    "ts_created": "2020-11-08T23:15:46.954574Z"
                }
            ],
            "current_discount": {
                "id": "d9eef5f3-8a60-4bf6-8e67-09d925d51afe",
                "ts_created": "2020-11-08T23:15:44.718253Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "1724.00",
            "sold": 3,
            "sold_this_month": 0,
            "name": "Kaftan-279846249",
            "vat_percentage": "7.5000",
            "product_type": "Casual-6",
            "status": "A",
            "avatar": null,
            "stock": 95,
            "description": null
        },
        {
            "id": "646ccbb4-0616-45d6-a69e-c49a2035f284",
            "ts_created": "2021-09-07T00:00:00+01:00",
            "ts_updated": "2021-09-07T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 34995.4,
            "margin": 22204.405,
            "margin_by_percentage": 157.61,
            "cost_of_production": 12791.0,
            "production_items": [
                {
                    "name": "6537883271",
                    "cost": "3842.00",
                    "ts_created": "2020-10-28T23:25:52.525597Z"
                },
                {
                    "name": "3202129644",
                    "cost": "8949.00",
                    "ts_created": "2020-10-28T23:25:52.528730Z"
                }
            ],
            "current_discount": {
                "id": "a7c51e9d-c205-4a61-9052-c8746cd9fe7b",
                "ts_created": "2020-10-28T23:25:51.530292Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "33171.00",
            "sold": 4,
            "sold_this_month": 0,
            "name": "Kaftan-93019430482",
            "vat_percentage": "7.5000",
            "product_type": "Casual-6",
            "status": "A",
            "avatar": null,
            "stock": 87,
            "description": null
        },
        {
            "id": "73345e0e-6648-4319-8c78-9c1b93f4cb3e",
            "ts_created": "2021-08-31T00:00:00+01:00",
            "ts_updated": "2021-08-31T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 17349.48,
            "margin": 4840.475,
            "margin_by_percentage": 358.43,
            "cost_of_production": 12509.0,
            "production_items": [
                {
                    "name": "78400588",
                    "cost": "6667.00",
                    "ts_created": "2020-11-08T23:15:46.945970Z"
                },
                {
                    "name": "2389400702",
                    "cost": "5842.00",
                    "ts_created": "2020-11-08T23:15:46.954574Z"
                }
            ],
            "current_discount": {
                "id": "d9eef5f3-8a60-4bf6-8e67-09d925d51afe",
                "ts_created": "2020-11-08T23:15:44.718253Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "16445.00",
            "sold": 2,
            "sold_this_month": 0,
            "name": "Kaftan-40383711122",
            "vat_percentage": "7.5000",
            "product_type": "Casual-8",
            "status": "A",
            "avatar": null,
            "stock": 93,
            "description": null
        },
        {
            "id": "c3695b62-ef3c-435d-a6e4-d9f5a4df30ef",
            "ts_created": "2021-08-13T00:00:00+01:00",
            "ts_updated": "2021-08-13T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 22433.52,
            "margin": 9642.52,
            "margin_by_percentage": 232.65,
            "cost_of_production": 12791.0,
            "production_items": [
                {
                    "name": "6537883271",
                    "cost": "3842.00",
                    "ts_created": "2020-10-28T23:25:52.525597Z"
                },
                {
                    "name": "3202129644",
                    "cost": "8949.00",
                    "ts_created": "2020-10-28T23:25:52.528730Z"
                }
            ],
            "current_discount": {
                "id": "a7c51e9d-c205-4a61-9052-c8746cd9fe7b",
                "ts_created": "2020-10-28T23:25:51.530292Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "21264.00",
            "sold": 4,
            "sold_this_month": 0,
            "name": "Kaftan-139353662570",
            "vat_percentage": "7.5000",
            "product_type": "Casual-1",
            "status": "A",
            "avatar": null,
            "stock": 93,
            "description": null
        },
        {
            "id": "9e9038e2-509a-4be5-b1a0-ba6e17d6ed37",
            "ts_created": "2021-08-05T00:00:00+01:00",
            "ts_updated": "2021-08-05T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 16618.36,
            "margin": 3827.36,
            "margin_by_percentage": 434.2,
            "cost_of_production": 12791.0,
            "production_items": [
                {
                    "name": "6537883271",
                    "cost": "3842.00",
                    "ts_created": "2020-10-28T23:25:52.525597Z"
                },
                {
                    "name": "3202129644",
                    "cost": "8949.00",
                    "ts_created": "2020-10-28T23:25:52.528730Z"
                }
            ],
            "current_discount": {
                "id": "a7c51e9d-c205-4a61-9052-c8746cd9fe7b",
                "ts_created": "2020-10-28T23:25:51.530292Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "15752.00",
            "sold": 5,
            "sold_this_month": 0,
            "name": "Kaftan-176419",
            "vat_percentage": "7.5000",
            "product_type": "Casual-4",
            "status": "A",
            "avatar": null,
            "stock": 87,
            "description": null
        },
        {
            "id": "e58c2f86-1f23-4eef-884c-02a74c0b27c4",
            "ts_created": "2021-08-04T00:00:00+01:00",
            "ts_updated": "2021-08-04T00:00:00+01:00",
            "business": "8edf931b-bf15-4145-88ce-6e4fddc873fd",
            "selling_price": 8611.96,
            "margin": -4179.035,
            "margin_by_percentage": -206.08,
            "cost_of_production": 12791.0,
            "production_items": [
                {
                    "name": "6537883271",
                    "cost": "3842.00",
                    "ts_created": "2020-10-28T23:25:52.525597Z"
                },
                {
                    "name": "3202129644",
                    "cost": "8949.00",
                    "ts_created": "2020-10-28T23:25:52.528730Z"
                }
            ],
            "current_discount": {
                "id": "a7c51e9d-c205-4a61-9052-c8746cd9fe7b",
                "ts_created": "2020-10-28T23:25:51.530292Z",
                "name": "End Of the year Bonzai",
                "percentage_discounted": 2.0,
                "end_date": "2021-10-02T09:46:00Z"
            },
            "initial_price": "8163.00",
            "sold": 4,
            "sold_this_month": 0,
            "name": "Kaftan-98581055348",
            "vat_percentage": "7.5000",
            "product_type": "Casual-8",
            "status": "A",
            "avatar": null,
            "stock": 96,
            "description": null
        }
    ]
}