const initialState = {
    business: {},
    isRequestingBusiness: false,
    isRequestingCreateBusiness: false,

}


export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'GET_SINGLE_BUSINESS':
            return {
                ...state,
                isRequestingBusiness: true
            }
        case 'REQUESTING_CREATE_BUSINESS':
            return {
                ...state,
                isRequestingCreateBusiness: !state.isRequestingCreateBusiness
            }

        default:
            return state;
    }
}