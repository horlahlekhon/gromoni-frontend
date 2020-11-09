import React from "react";


export const decideStatus = (status, stock) => {
    switch (status) {
        // case "PENDING":
        //     return <span className={`badge badge-pill pill-badge-info`}>Pending</span>
        case "A":
            if(stock <= 2){
                return <p >Available <span className={`badge badge-pill pill-badge-warn`}>{stock}</span></p>
            }else {
                return <p style={{color: "#0A9A64"}}>Available <span className={`badge badge-pill pill-badge-success`}>{stock}</span></p>
            }
        case "I":
            return <span className={`badge badge-pill pill-badge-danger`}>Out of stock</span>
        default:
            return ""
    }
}
export const parseData = (data) => {
    if (data !== undefined) {
        const res = data.map(payload => {
            return {
                name: payload.name,
                description: payload.description ? payload.description : '',
                price: new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN'
                }).format(payload.selling_price),
                // discount: `${payload.current_discount.reduce((total, cursor) => total + cursor)}%`,
                status: decideStatus(payload.status, payload.stock),
                // ts_created: new Date(payload.ts_created),
                sold: payload.sold,
                // date: new Date(payload.ts_created).toDateString()
            }
        })
        return res
    } else {
        return {}
    }
}