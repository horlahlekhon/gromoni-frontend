
const validateForm = (state, fields) => {
    let errors = [];
    Object.keys(fields).map(e => {
       
        if (state[e] === fields[e].default || !regexValidate(e, state[e])) {
            return errors.push({ item: e, message: fields[e].message })

        }
        
        if ( state[e] === state.password2 && state.password2 !== state.password1) {
            // pushing error to the "errors array"
            return errors.push({ item: state.password2, message: fields.password2.message })
        }

    });

     
//  CHECKING IF ANY ERROR OCCURRED
    if (errors.length <= 0) {

        return { isErrors: false, errors: [] }

    } else {

        return { isErrors: true, errors };
    }
}
function responseErrorParser(payload) {
    if (typeof payload === 'undefined') {
        return [{ message: 'Sorry, an unexpected error occured, please Check your Internet Network or contact support center' }]
    } else if (typeof payload === 'object') {
        const keys = Object.keys(payload)
        const errors = []
        keys.forEach(e => {
            console.log(`eeeeeeeeeee: ${e}`)
             errors.push({ message: `${e}: ${payload[e][0]}` })
        })
        return errors
    } else {
        return [{ message: payload }]
    }
}

export {
    validateForm,
    responseErrorParser
}

function regexValidate(type, data) {
    const phoneRGEX = /^[0-9()+\\s-]*$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    switch (type) {
        case 'phone':
            return phoneRGEX.test(data)
        case 'email':
            return emailRegex.test(data)
        default:
            return true;
    }

}

