# KKBOX Open API Developer SDK for JavaScript
The SDK for accessing various metadata of KKBOX tracks, albums, artists, playlists and stations.

### npm install
```
npm install @kkboxorg/kkbox-javascript-developer-sdk
```

### Source Install 
```
npm install
```

### Build SDK
```
npm run build
```

### Test
For testing, you should first browse [https://developer.kkbox.com/](https://developer.kkbox.com/) and create an developer account, then create an app to get client id and client secret for that account.

Then, create a file name `client_secrets.json`, put it in the `test` directory and write the client id and client secret in it. The content will be like:

```
{
    "kkbox_sdk": {
        "client_id": "YOUR CLIENT ID",
        "client_secret": "YOUR CLIENT SECRET"
    }
}
```

And then we can run the tests.

```
npm run test
```

## How to use the SDK
There are two classes Auth and Api and you should initialize an Auth object by client id and secret.

```
import {Auth} from 'kkbox-javascript-developer-sdk'

const auth = new Auth(client_id, client_secret)
```

Then use the auth object to get access token.

```
auth.clientCredentialsFlow.fetchAccessToken().then(response => {
    const access_token = response.data.access_token
})
```

After getting access token, use it to initialize Api object.

```
import {Api} from 'kkbox-javascript-developer-sdk'

const api = new Api(access_token)
```

Now you can use various fetcher object to fetch data.

```
api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
	console.log(response.data)
})
```

Most methods return paged result and we can use the `fetchNextPage` method to get the next page of result.

```
api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
    console.log(response.data)
	api.searchFetcher.fetchNextPage(response).then(response => {
        console.log(response.data)
    })
})
```

All the code.

```
import {Auth} from 'kkbox-javascript-developer-sdk'
import {Api} from 'kkbox-javascript-developer-sdk'

const auth = new Auth(client_id, client_secret)
auth.clientCredentialsFlow.fetchAccessToken().then(response => {
    const access_token = response.data.access_token
    const api = new Api(access_token)    
    api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
	    console.log(response.data)
        api.searchFetcher.fetchNextPage(response).then(response => {
            console.log(response.data)
        })        
    })
})
```
### [API Documentation](https://kkbox.gelato.io)
