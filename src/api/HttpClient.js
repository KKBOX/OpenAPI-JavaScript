import axios from 'axios'
import {apiError} from '../catchError'

/**
 * Do request to open api server with authorization header and error catch.
 */
export default class HttpClient {
    /**
     * @param {string} token - Need access token to initialize.
     */
    constructor(token) {
        /**
         * @private
         * @type {string}
         */
        this.token = 'Bearer ' + token
    }

    /**
     * Http get method.
     *
     * @param {string} endpoint - Uri endpoint.
     * @param {object} params - Uri parameters.
     * @return {Promise}
     */
    get(endpoint, params = {}) {
        return axios.get(endpoint, {
            params: params,
            headers: {Authorization: this.token, 'User-Agent': 'KKBOX JavaScript SDK'}
        }).catch(apiError)
    }

    /**
     * Http post method.
     *
     * @param {string} endpoint - Uri endpoint.
     * @param {object} data - Body json data.
     * @return {Promise}
     */
    post(endpoint, data = {}) {
        return axios.post(endpoint, data, {
            headers: {
                Authorization: this.token,
                'User-Agent': 'KKBOX JavaScript SDK'
            }
        }).catch(apiError)
    }
}