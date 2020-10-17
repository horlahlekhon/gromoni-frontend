import {type} from '../actionTypes'

import {HTTP} from '../../api'

// TODO apparently we need to change this action name because this cant be as a default action for frtching a business
export const getBusiness = (token, thisBusiness) => dispatch => {

    if (thisBusiness === undefined || thisBusiness === null) {
        return Promise.resolve({status: false, payload: 'User does not have any business '})
    } else {
        return HTTP.growthApi(token)
            .get(`/business/${thisBusiness}/`)
            .then((response) => {
                dispatch({type: type.GET_SINGLE_BUSINESS, payload: response.data})
                return {
                    status: response.status === 200,
                    payload: response,
                    errorMsg: response.data.detail ? response.data : undefined
                }
            })
            .catch((error) => {
                dispatch({type: type.ERROR_GETTING_USER_BUSINESS, payload: error.message})
                return {status: false, payload: error.message, errorMsg: error.message}
            })
    }
}

export const createBusiness = (token, data) => dispatch => {
    dispatch({type: type.CREATE_BUSINESS})
    return HTTP.growthApi(token)
        .post(`/business/new`, data)
        .then((response) => {
            return {status: response.status === 201 || response.status === 200, payload: response}
        })
        .catch((err) => {
            return {status: false, payload: err.message}
        })
}