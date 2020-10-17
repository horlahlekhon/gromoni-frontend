const initialState = {
    isRequestingReg: false,
    isRequestingLog: false,
    errorInReg: false,
    errorInLog: false,
    successfulReg: false,
    successfulLog: false,
    userHaveNoBusiness: false,
    errorData: {},
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'LOGIN_DATA':
            return {
                ...state,
                ...payload
            }
        case 'REGISTER':
            return {
                ...state,
                isRequestingReg: true
            }
        case 'LOGIN':
            return {
                ...state,
                isRequestingLog: true
            }
        case 'ERROR_IN_REG':
            return {
                ...state,
                errorInReg: true,
                isRequestingReg: false,
                errorData: payload
            }
        case 'ERROR_IN_LOG':
            return {
                ...state,
                errorInLog: true,
                isRequestingLog: false,
                errorData: payload
            }
        case 'SUCCESSFUL_REG':
            return {
                ...state,
                successfulReg: true,
                isRequestingReg: false,
            }
        case 'SUCCESSFUL_LOG':
            return {
                ...state,
                successfulLog: true,
                isRequestingLog: false,
            }
        case 'USER_HAVE_NO_BUSINESS':
            return {
                ...state,
                userHaveNoBusiness: true
            }

        default:
            return state
    }
}
  