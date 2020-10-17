import {type} from '../actionTypes'

import {HTTP} from '../../api'

// const handleSetUser = (payload) => ({
//     type: type.LOGIN,
//      payload
// })


export const handleUserLogin = (data) => async dispatch => {
    dispatch({type: type.LOGIN})
    const response = await HTTP.growthApi().post('/users/login/', data)
    dispatch({type: type.SUCCESSFUL_LOG})
    // TODO put user's business in local storage
    if (response.status === 200) {
        return {status: true, payload: response};
    } else {
        return {status: false, payload: 'Username or password not correct', business: undefined}
    }

}


/**
 * @name handleUserRegister
 * @description  function handles user signup
 * @param {Object} data
 * @return {Promise<{result: AxiosResponse<Object>}>} user object from backend
 */

export const handleUserRegister = (data) => dispatch => {
    dispatch({type: type.REGISTER})
    return HTTP.growthApi()
        .post('/users/register/', data)
        .then((response) => {
            dispatch({type: type.SUCCESSFUL_REG})
            return {status: response.status === 201, payload: response};
        }).catch((error) => {
            //   dispatch({ type: type.ERROR_IN_REG, payload: error});
            return {status: false, payload: error.message}
        })
}