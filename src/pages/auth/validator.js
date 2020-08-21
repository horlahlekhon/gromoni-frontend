// FIXME ideally we want to change this to an object that has the field and ots corresponding error passed into the function and index the error this way we have configurable errors
// TODO make this function more general for all validations
function validateRegisterForm(state, fields) {
    let errors = [];
    let idx;
    Object.keys(fields).forEach(e => {
        // console.log(`fields: ${fields}\t ${state}\t ${e}`)
        // console.log(`state[e]: ${state[e]}, field[e]: ${fields[e]}, ${regexValidate(e, state[e])}`)
        if (state[e] === fields[e] || regexValidate(e, state[e]) === false) {
            if (e === 'agree') {
                errors.push({ item: e, message: 'Please agree to continue' })
            } else {
                errors.push({ item: e, message: `Please enter a valid ${e}` }) 
            }
        }
    });
    
    console.log(`ierrors length: ${errors.length}`)
    if (errors.length <= 0) {
        return { isErrors: false, errors: [] }
    } else {
        
        return { isErrors: true, errors };
    }
};

export {
    validateRegisterForm
}

function regexValidate(type, data){
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