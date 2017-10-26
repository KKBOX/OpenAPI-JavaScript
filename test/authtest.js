import should from 'should'
import TokenFetcher from '../src/auth/TokenFetcher'
import ClientCredentialsFlow from '../src/auth/ClientCredentialsFlow'
import {kkbox_sdk} from './client_secrets.json'
const CLIENT_ID = kkbox_sdk.client_id
const CLIENT_SECRET = kkbox_sdk.client_secret

describe('Auth Begin to Test', () => {
    const tokenFetcher = new TokenFetcher(CLIENT_ID, CLIENT_SECRET)
    describe('clientCredentialsFlow', () => {
        describe('#fetchAccessToken()', () => {
            it('should get access token', () => {
                const clientCredentialsFlow = new ClientCredentialsFlow(tokenFetcher)
                return clientCredentialsFlow.fetchAccessToken().then(response => {
                    const access_token = response.data.access_token
                    access_token.should.be.ok
                })
            })
        })
    })
})