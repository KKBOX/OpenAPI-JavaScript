import axios from 'axios';
import { authError } from '../catchError';
import { Token as ENDPOINT_TOKEN } from '../Endpoint';

/**
 * Implements various KKBOX OAuth 2.0 authorization flows.
 */
export default class Auth {
  /**
   * Initialize the Auth object with client id and client secret.
   *
   * @param {string} clientID
   * @param {string} clientSecret
   * @example new Auth(clientID, clientSecret);
   */
  constructor(clientID, clientSecret) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
  }

  /**
   * Fetch access token.
   *
   * @return {Promise}
   * @example auth.fetchAccessToken();
   */
  fetchAccessToken() {
    return axios({
      method: 'POST',
      url: ENDPOINT_TOKEN,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials',
      auth: {
        username: this.clientID,
        password: this.clientSecret
      }
    })
    .catch(authError);
  }
}
