import {type} from '../actionTypes'

import {GrowthAPI} from "../../api";

export const getBusiness = (token, business) => async dispatch => {
    if (business === undefined || business === null) {
        return Promise.resolve({status: false, payload: 'User does not have any business '})
    } else {
        const api = new GrowthAPI(token, business)
        return api.getBusiness()
            .then((response) => {
                dispatch({type: type.GET_SINGLE_BUSINESS, payload: response.data})
                return {
                    status: response.success,
                    payload: response,
                    errorMsg: !response.success ? response.payload : []
                }
            })
    }
}

export const createBusiness = (token, data) => dispatch => {
    dispatch({type: type.CREATE_BUSINESS})
    const api = new GrowthAPI(token)
    return api.createBusiness(data)
        .then((response) => {
            return {status: response.success, payload: response.payload, statusCode: response.statusCode}
        })
}