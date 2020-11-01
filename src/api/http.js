import axios from "axios";

/*
* class for making api request, wrap around axios calls to return api requests as getters and setters
* */
export class GrowthAPI {

    /*
    * initialize the api with authentication token, and an optional business id*/
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
            return [{message: 'Sorry, an unexpected error occurred, please Check your Internet Network or contact support center'}]
        } else if (typeof payload === 'object') {
            if (payload.detail) {
                return [{message: payload.detail}]
            }
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
            console.log("axios error", error)
            return {success: false, payload: [{message: "An unexpected error occur kindly reload the page"}]}
        } else {
            return {success: false, payload: [error.message]}
        }
    }

    async _makeRequest({data, url, method, errorHandler, options}) {
        if (typeof url === "undefined" || typeof method === "undefined") {
            throw new Error("Url and method are mandatory")
        }
        return await this.api.request({
            url: url,
            data: data ? data : undefined,
            method: method,
            ...options
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                return {
                    payload: response.data,
                    success: response.status === 200 || response.status === 201,
                    statusCode: response.status
                }
            } else {
                return {
                    payload: errorHandler === undefined ? this._responseErrorParser(response.data) : errorHandler(response.data),
                    success: false,
                    statusCode: 500
                }
            }
        }).catch((error) => this._handleAxiosError(error))
    }

    async login(userName, password, errorHandler) {
        return await this._makeRequest({
            data: {username: userName, password: password},
            url: "/users/login/",
            method: "POST",
            errorHandler: errorHandler
        })
    }

    async register(data, errorHandler) {
        return await this._makeRequest({
            data: data,
            url: "/users/register/",
            method: "POST",
            errorHandler: errorHandler
        })
    }

    async getBusiness(errorHandler) {
        return await this._makeRequest({url: `/business/${this.business}/`, method: "GET", errorHandler: errorHandler})
    }

    async createBusiness(data, errorHandler) {
        return await this._makeRequest({data: data, url: `/business/new`, method: "POST", errorHandler: errorHandler})
    }

    async saleDashboard(errorHandler) {
        return await this._makeRequest({
            url: `/report/${this.business}/dashboards/sales/`,
            method: "GET",
            errorHandler: errorHandler
        })
    }

    async allSales({pageSize, page}, errorHandler) {
        return await this._makeRequest({
            url: `/business/${this.business}/sales/?page_size=${pageSize ? pageSize : 10}&page=${page ? page : 1}`,
            method: "GET",
            errorHandler: errorHandler
        })
    }

}
