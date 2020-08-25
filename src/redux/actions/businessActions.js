import { type } from '../actionTypes'

import { HTTP } from '../../api'
import data from '../../data/chat/chatMember'

// TODO apparently we need to change this action name because this cant be as a default action for frtching a business
export const getBusiness = (token) => dispatch => {
    const thisBusiness = localStorage.getItem('__grm__act__biz__')
    // TODO user must have a business for this call to work, so what happens if a user doesnt have a business, 
    // TODO what we should do is that, we check if the user has business which can be 
    //checked as thisBusiness !== undefined, we just call the business and log in to the biz,
    //TODO in other case where thisBusiness returns undefined, we will have to dispatch an action to set a value in the
    // state to notify the component that the user doesnt have a business so that 
    // the AuthenticatedRoute can just send him to either create a new business or select another
    // business(when we implement multiple business), this will navigate a user going from register pgase and hasnt create a business
    if(thisBusiness === undefined){
        return {status: false, payload: 'User does not have any business '}
    }else{
        return HTTP.growthApi(token)
        .get(`/business/${thisBusiness}/`)
        .then((response) => {
            dispatch({ type: type.GET_SINGLE_BUSINESS, payload: response.data })
            return { status: response.status === 200, payload: response }
        })
        .catch((error) => {
            dispatch({ type: type.ERROR_GETTING_USER_BUSINESS, payload: error.message })
            return { status: false, payload: error.message }
        })
    }
}

export const createBusiness = (token, data) => dispatch => {
    dispatch({type: type.CREATE_BUSINESS})
    return HTTP.growthApi(token)
                .post(`/business/new`, data)
                .then((response) => {
                   dispatch({type: type.REQUESTING_CREATE_BUSINESS})
                   return {status: response.status === 201 || response.status === 200, payload: response}
                })
                .catch((err) => {
                    return {status: false, payload: err.message}
                })
}