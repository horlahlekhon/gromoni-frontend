export function responseErrorParser(payload) {
    if (typeof payload === 'undefined') {
        return [{ message: 'Sorry, an unexpected error occurred, please Check your Internet Network or contact support center' }]
    } else if (typeof payload === 'object') {
        const keys = Object.keys(payload)
        const errors = []
        keys.forEach(e => {
            const data = payload[e]
            if(typeof data === 'string'){
                errors.push({ message: `${e}: ${payload[e]}` })
            }else if(Array.isArray(data)){
                errors.push({ message: `${e}: ${payload[e][0]}` })
            }
        })
        return errors
    } else {
        return [{ message: payload }]
    }
}

export const convertDateToNames = (dates, type) => {
    switch (type) {
        case "month":
            return dates.map(e => new Date(e).toLocaleString('en-NG', {month: 'short'}))
        case "week":
            return dates.map(e => new Date(e).toLocaleString('default', {weekday: 'short'}))
        default:
            return dates
    }
}

export const formatMoney = (money) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(money)
}