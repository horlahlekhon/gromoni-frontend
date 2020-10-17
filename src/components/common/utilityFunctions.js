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

// export const pathBuilder = ()
export const convertDateToMonthNames = (dates) => {
    return dates.map(e => new Date(e).toLocaleString('default', {month: 'long'}))
}