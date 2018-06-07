# KKBOX Open API Developer SDK for JavaScript

[![npm (scoped)](https://img.shields.io/npm/v/@kkbox/kkbox-js-sdk.svg)](https://www.npmjs.com/package/@kkbox/kkbox-js-sdk)
[![Build Status](https://travis-ci.org/KKBOX/OpenAPI-JavaScript.svg?branch=master)](https://travis-ci.org/KKBOX/OpenAPI-JavaScript)
[![License Apache](https://img.shields.io/badge/license-Apache-green.svg?style=flat)](https://raw.githubusercontent.com/KKBOX/OpenAPI-ObjectiveC/blob/master/LICENSE)

The SDK helps to access various metadata from KKBOX, including tracks, albums, artists, playlists and stations.

### Install Using npm

You can install the SDK using [npm](https://www.npmjs.com) by running

```bash
npm install @kkbox/kkbox-js-sdk
```

### Install from Source Code

Download the SDK and then input the following command under command line

```bash
npm install
```

### Build

```bash
npm run build
```

### Test

To test or start using the SDK, a valid client ID and client secret are required. Please visit [https://developer.kkbox.com/](https://developer.kkbox.com/), create a new developer account, and obtain the client ID and client secret of your app.

Then, create a file named `client_secrets.json`, put it into the `test` directory, and fill your client ID and client secret into it. It may look like

```json
{
    "kkbox_sdk": {
        "client_id": "YOUR CLIENT ID",
        "client_secret": "YOUR CLIENT SECRET"
    }
}
```

And then we could run the tests by calling

``` bash
npm run test
```

### SDK Documentation

Please browse [https://kkbox.github.io/OpenAPI-JavaScript/](https://kkbox.github.io/OpenAPI-JavaScript/)

## Usage

There are two classes Auth and Api and you should initialize an Auth object by client id and secret.

```js
import {Auth} from '@kkbox/kkbox-js-sdk'

const auth = new Auth(client_id, client_secret)
```

Then use the auth object to get access token.

```js
auth.clientCredentialsFlow.fetchAccessToken().then(response => {
    const access_token = response.data.access_token
})
```

After getting access token, use it to initialize Api object.

```js
import {Api} from '@kkbox/kkbox-js-sdk'

const api = new Api(access_token)
```

Now you can use various fetcher object to fetch data.

```js
api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
    console.log(response.data)
})
```

Most methods return paged result and we can use the `fetchNextPage` method to get the next page of result.

```js
api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
    console.log(response.data)
    api.searchFetcher.fetchNextPage(response).then(response => {
        console.log(response.data)
    })
})
```

All the code.

```js
import {Auth} from '@kkbox/kkbox-js-sdk'
import {Api} from '@kkbox/kkbox-js-sdk'

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

### Use the SDK in Web Browsers

The SDK plays fine with Node.js, but works partially in web browsers.

You can use the SDK in your Web and [Electron](https://electronjs.org) apps, but you need to prepare a middle man server to help you to obtain access tokens. That's because KKBOX's Open API server supports [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), but the Auth server does not.

In other words, your JavaScript code hosted on your own website could access data from KKBOX, but direct access to the Auth server is forbidden by the security policy of modern web browsers.

When developing an Electron app, you can choose to turn web security off to make you app able to fetch access tokens. You can do this while creating browser windows.

```js
mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    useContentSize: true,
    webPreferences: {
        webSecurity: false
    }
})
```

### Generate SDK Documentation

``` bash
npm run build-doc
```

Then open the the file `docs/index.html`

### [API Documentation](https://docs-en.kkbox.codes/)

### License

Copyright 2017 KKBOX Technologies Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
