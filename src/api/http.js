import axios from "axios";


/**
 * @name 
 * @description  function initates axios instances  and passes their default values 
 * @type {{growthApi:{Promise<{axios: AxiosInstance<Function}>}}
 * @return {Object}
 */
export default (() => {
    const growthApi = (token = false) => axios.create({
        baseURL: 'https://growthapi-staging.herokuapp.com/api',
        timeout: 4000,
        [token ? 'headers' : ''] : token ? {Authorization: `Bearer ${token}`} : ''
    });

    return {
        growthApi
    }
})();