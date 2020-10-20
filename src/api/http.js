import axios from "axios";

/**
 * @name
 * @description  function initates axios instances  and passes their default values
 * @type {{growthApi:{Promise<{axios: AxiosInstance<Function}>}}
 * @return {Object}
 */
export default (() => {
    const growthApi = (token = false) => axios.create({
        baseURL: 'https://growthapi-staging.herokuapp.com/api/v1',
        timeout: 10000,
        [token ? 'headers' : '']: token ? {Authorization: `Bearer ${token}`} : '',
        validateStatus: function () {
            return true;
        }
    });
    return {
        growthApi
    }
})();

export class GrowthAPI {

    constructor(token, business) {
        this.token = token
        this.business = business
        this.api = axios.create({
            baseURL: 'https://growthapi-staging.herokuapp.com/api/v1',
            timeout: 5000,
            [token ? 'headers' : '']: token ? {Authorization: `Bearer ${token}`} : '',
            validateStatus: function () {
                return true;
            }
        })
    }

     _responseErrorParser(payload) {
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
            const errors = [{message: payload}]
            return errors
        }
    }

    _handleAxiosError(error) {
        if (error.isAxiosError) {
            return {success: false, payload: [{message: "An unexpected error occur kindly reload the page"}]}
        } else {
            return {success: false, payload: [error.message]}
        }
    }

    async _makeRequest(data, url, method, options) {
        if (typeof url === "undefined" || typeof method === "undefined") {
            throw new Error("Url and method are mandatory")
        }
        return await this.api.request({
            url: url,
            data: data ? data : undefined,
            method: method,
            ...options
        }).then((response) => {
            if(response.status === 200 || response.status === 201){
                return {payload: response.data, success: response.status === 200 || response.status === 201}
            }else{
                return {payload: this._responseErrorParser(response.data), success: false}
            }
        }).catch((error) => this._handleAxiosError(error))
    }

    async login(userName, password) {
        return await this._makeRequest({username: userName, password: password}, "/users/login/", "POST")
    }

    async register(data){
        return await this._makeRequest(data, "/users/register/", "POST")
    }

}