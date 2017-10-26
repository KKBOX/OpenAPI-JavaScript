import axios from 'axios'
import {authError} from '../catchError'
import querystring from 'querystring'
import {Token as ENDPOINT_TOKEN} from '../Endpoint'

/**
 * Fetches access token.
 */
export default class TokenFetcher {
    /**
     * @ignore
     */
    constructor(client_id, client_secret) {
        /**
         * @ignore
         */
        this.client_id = client_id

        /**
         * @ignore
         */
        this.client_secret = client_secret
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
                username: this.client_id,
                password: this.client_secret
            },
            headers: {'User-Agent': 'KKBOX JavaScript SDK'}
        }).catch(authError)
    }
}