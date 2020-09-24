// FIXME ideally we want to change this to an object that has the field and ots corresponding error passed into the function and index the error this way we have configurable errors
// TODO make this function more general for all validations

// UNUSED FORM VALIDATOR 22-09-2020
// function validateFormV1(state, fields) {
//     let errors = [];
//     let idx;
//     Object.keys(fields).forEach(e => {
//         if (state[e] === fields[e] || !regexValidate(e, state[e])) {
//             if (e === 'agree') {
//                 errors.push({ item: e, message: 'Please agree to continue' })
//             } else {
//                 errors.push({ item: e, message: `Please enter a valid ${e}` })
//             }
//         }
//     });

//     if (errors.length <= 0) {
//         return { isErrors: false, errors: [] }
//     } else {
//         return { isErrors: true, errors };
//     }
// };

// currently used form validator ---readone22-09-2020
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
    // Object.keys(state.verifyPassword) () => {
    //     //  making sure passowrd and verify password inputs are the same
        // if (state.verifyPassword !== state.password) {
        //     // pushing error to the "errors array"
        //     return errors.push({ item: state.verifyPassword, message: fields.verifyPassword.message })
        // }
    // }
     
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

