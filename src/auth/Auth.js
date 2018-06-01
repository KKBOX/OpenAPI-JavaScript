import ClientCredentialsFlow from './ClientCredentialsFlow'
import TokenFetcher from './TokenFetcher'

/**
 * Implements various KKBOX OAuth 2.0 authorization flows.
 */
export default class Auth {
    /**
     * Initialize the Auth object with client id and client secret.
     *
     * @param {string} clientID
     * @param {string} clientSecret
     * @example new Auth(clientID, clientSecret)
     */
    constructor(clientID, clientSecret) {
        /**
         * @type {TokenFetcher}
         */
        this.tokenFetcher = new TokenFetcher(clientID, clientSecret)

        /**
         * @type {ClientCredentialsFlow}
         */
        this.clientCredentialsFlow = new ClientCredentialsFlow(this.tokenFetcher)
    }
}
