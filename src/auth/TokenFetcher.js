import axios from 'axios'
import { authError } from '../catchError'
import querystring from 'querystring'
import { Token as ENDPOINT_TOKEN } from '../Endpoint'

/**
 * Fetches access token.
 */
export default class TokenFetcher {
    /**
     * @ignore
     */
    constructor(clientID, clientSecret) {
        /**
         * @ignore
         */
        this.clientID = clientID

        /**
         * @ignore
         */
        this.clientSecret = clientSecret
    }

    /**
     * Fetches access token.
     *
     * @param {object} params - Form data.
     * @return {Promise}
     */
    fetchAccessToken(params) {
        return axios.post(ENDPOINT_TOKEN, querystring.stringify(params), {
            auth: {
                username: this.clientID,
                password: this.clientSecret
            },
            headers: {}
        }).catch(authError)
    }
}
