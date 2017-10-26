import ClientCredentialsFlow from './ClientCredentialsFlow'
import TokenFetcher from './TokenFetcher'

/**
 * Implements various KKBOX OAuth 2.0 authorization flows.
 */
export default class Auth {
    /**
     * Initialize the Auth object with client id and client secret.
     *
     * @param {string} client_id
     * @param {string} client_secret
     * @example new Auth(client_id, client_secret)
     */
    constructor(client_id, client_secret) {
        /**
         * @type {TokenFetcher}
         */
        this.tokenFetcher = new TokenFetcher(client_id, client_secret)

        /**
         * @type {ClientCredentialsFlow}
         */
        this.clientCredentialsFlow = new ClientCredentialsFlow(this.tokenFetcher)
    }
}