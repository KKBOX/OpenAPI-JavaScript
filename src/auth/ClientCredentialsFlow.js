/**
 * Implements the client credentials flow. Used for accessing APIs that don't need any KKBOX
 * user's personal data.
 * @see https://kkbox.gelato.io/docs/versions/1.1/authentication
 */
export default class ClientCredentialsFlow {
    /**
     * @ignore
     */
    constructor(token) {
        /**
         * @ignore
         */
        this.token = token
    }

    /**
     * Fetch access token.
     *
     * @return {Promise}
     * @example auth.clientCredentialsFlow.fetchAccessToken()
     */
    fetchAccessToken() {
        return this.token.fetchAccessToken({grant_type: 'client_credentials'})
    }
}