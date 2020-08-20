import {type} from '../actionTypes'

import {HTTP} from '../../api'

const handleSetUser = (payload) => ({
    type: type.LOGIN,
     payload
})


export const handleUserLogin = (data) => dispatch => {
    dispatch({type: type.LOGIN})

    return HTTP.growthApi()
        .post('/users/login/', data)
        .then(response => {
            dispatch({ type: type.SUCCESSFUL_LOG})
            sessionStorage.setItem('__gct__ac__', response.data.access);
            sessionStorage.setItem('__gct__rf__', response.data.refresh);
            console.log(`respspspspspsps: ${response.data.access}`)
           return { status: true, message: 'Login successfully'};
          })
          .catch((error) => {
            // dispatch({ type: type.ERROR_IN_LOG, payload: error});
            console.log(error.message)
           return { status: false, message: 'Username or password not correct' }
          })
}


/**
 * @name handleUserRegister
 * @description  function handles user signup
 * @param {Object} data 
 * @return {Promise<{result: AxiosResponse<Object>}>} user object from backend
 */

export const handleUserRegister = (data) => dispatch => {
    dispatch({ type: type.REGISTER})
    return HTTP.growthApi()
    .post('/users/register/', data)
    .then((response) => {
      dispatch({ type: type.SUCCESSFUL_REG})
      sessionStorage.setItem('__gct__ac__', response.data.access);
      sessionStorage.setItem('__gct__rf__', response.data.refresh);
      console.log(`at least we went: ${response.data}`)
      return { status: true, message: 'Registeration successfully'};
    }).catch((error) => {
    //   dispatch({ type: type.ERROR_IN_REG, payload: error});
    
      return { status: false, message: error.message }
    })
  }