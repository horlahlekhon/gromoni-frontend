import {type} from '../actionTypes'
import {GrowthAPI} from "../../api/http";

// const handleSetUser = (payload) => ({
//     type: type.LOGIN,
//      payload
// })

const api = new GrowthAPI()
export const handleUserLogin = (data) => async dispatch => {
    dispatch({type: type.LOGIN})
    return await api.login(data.username, data.password)
        .then((resp) => {
            dispatch({type: type.SUCCESSFUL_LOG})
            return resp
        })
}


/**
 * @name handleUserRegister
 * @description  function handles user signup
 * @param {Object} data
 * @return {Promise<{result: AxiosResponse<Object>}>} user object from backend
 */

export const handleUserRegister = (data) => dispatch => {
    return api.register(data)
}