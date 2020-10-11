export function responseErrorParser(payload) {
    if (typeof payload === 'undefined') {
        return [{ message: 'Sorry, an unexpected error occured, please Check your Internet Network or contact support center' }]
    } else if (typeof payload === 'object') {
        const keys = Object.keys(payload)
        const errors = []
        keys.forEach(e => {
            errors.push({ message: `${e}: ${payload[e][0]}` })
        })
        return errors
    } else {
        return [{ message: payload }]
    }
}

// export const pathBuilder = ()