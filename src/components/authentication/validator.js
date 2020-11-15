import {validateProductForm} from "../sales/utils";

const validateForm = (state, fields) => {
    let errors = [];
    Object.keys(fields).map(e => {

        if (state[e] === fields[e].default || !regexValidate(e, state[e])) {
            return errors.push({item: e, message: fields[e].message})

        }

        if (state[e] === state.password2 && state.password2 !== state.password1) {
            // pushing error to the "errors array"
            return errors.push({item: state.password2, message: fields.password2.message})
        }
        return []
    });


//  CHECKING IF ANY ERROR OCCURRED
    if (errors.length <= 0) {

        return {isErrors: false, errors: []}

    } else {

        return {isErrors: true, errors};
    }
}

function validateMultipleProductForm(defaults, data) {
    const res = data.map(e => {
        const errors = validateProductForm(defaults, e)
        // console.log("validateMultipleProductForm errors", errors)
        return errors.isErrors
    })
    return res
}

// validating createNewSales Form
const validateCreateNewSaleForm = ({saleData, productData}, fields) => {
    let errors = [];
    Object.keys(fields).map(e => {

        if (saleData[e] === fields[e].default) {
            return errors.push({item: e, message: fields[e].message})
        }
        return []
    });
    const productFields = {
        productName: {default: "", message: "Product name is required"},
        amountPaid: {default: "", message: "Paid amount is required"},
    }

    const productsError = validateMultipleProductForm(productFields, productData)
    console.log("validateCreateNewSaleForm productErrors", productsError)
    if (productsError === true) {
        errors.push(
            {
                item: "products",
                message: "Please recheck, some product data are not fully filled"
            })
    }
    if (errors.length <= 0) {
        return {isErrors: false, errors: []}
    } else {
        return {isErrors: true, errors};
    }
}


// use the one in ../common/utitilityFunctions
function responseErrorParser(payload) {
    if (typeof payload === 'undefined') {
        return [{message: 'Sorry, an unexpected error occured, please Check your Internet Network or contact support center'}]
    } else if (typeof payload === 'object') {
        const keys = Object.keys(payload)
        const errors = []
        keys.forEach(e => {
            errors.push({message: `${e}: ${payload[e][0]}`})
        })
        return errors
    } else {
        return [{message: payload}]
    }
}

export {
    validateForm,
    responseErrorParser,
    validateCreateNewSaleForm
}

function regexValidate(type, data) {
    const phoneRGEX = /^[0-9()+\\s-]*$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    switch (type) {
        case 'phone':
            return phoneRGEX.test(data)
        case 'email':
            return emailRegex.test(data)
        default:
            return true;
    }

}

// function regexForCreateNewSale(type, data) {
//     const numericRegex = /^[0-9\b]+$/;
//     switch (type) {
//         case 'number':
//             return numericRegex.test(data)
//         default:
//             return true;
//     }
// }