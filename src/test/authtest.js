import should from 'should';
import Auth from '../auth/';
import { kkbox_sdk } from '../../client_secrets.json';

const CLIENT_ID = kkbox_sdk.client_id;
const CLIENT_SECRET = kkbox_sdk.client_secret;

describe('Auth Begin to Test', () => {
  const auth = new Auth(CLIENT_ID, CLIENT_SECRET);
  describe('clientCredentialsFlow', () => {
    describe('#fetchAccessToken()', () => {
      it('should get access token', () => {
        return auth.fetchAccessToken().then(response => {
          const access_token = response.data.access_token;
          access_token.should.be.ok;
        });
      });
    });
  });
});
