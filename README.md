# KKBOX Open API Developer SDK for JavaScript

[![npm (scoped)](https://img.shields.io/npm/v/@kkbox/kkbox-js-sdk.svg)](https://www.npmjs.com/package/@kkbox/kkbox-js-sdk)
[![Build Status](https://travis-ci.org/KKBOX/OpenAPI-JavaScript.svg?branch=master)](https://travis-ci.org/KKBOX/OpenAPI-JavaScript)
[![License Apache](https://img.shields.io/badge/license-Apache-green.svg?style=flat)](https://raw.githubusercontent.com/KKBOX/OpenAPI-JavaScript/master/LICENSE.txt)

The SDK helps you to access various metadata from KKBOX, including tracks, albums, artists, playlists and stations.

## Getting Started

Install the SDK using npm

```bash
$ npm install @kkbox/kkbox-js-sdk
```

## Usage example
```js
import { Auth, Api } from '@kkbox/kkbox-js-sdk';

// Create an auth object with client id and secret
const auth = new Auth(client_id, client_secret);

// Fetch your access token
auth.clientCredentialsFlow
  .fetchAccessToken()
  .then(response => {
    const access_token = response.data.access_token;

    // Create an API object with your access token
    const api = new Api(access_token);

    // Fetch content with various fetchers
    api.searchFetcher
      .setSearchCriteria('五月天 派對動物', 'track')
      .fetchSearchResult()
      .then(response => {

        // Content from the KKBOX Open API
        console.log(response.data);

        // Continue to the next page
        api.searchFetcher.fetchNextPage(response).then(response => {
          console.log(response.data);
        });

      });
  });
```

## Test

To test the SDK, a valid client ID and client secret are required.

Please visit [https://developer.kkbox.com/](https://developer.kkbox.com/), create a new developer account, and obtain the client ID and client secret of your app.

Then, create a file named `client_secrets.json`, put it into the `test` directory, and fill your client ID and client secret into it.

It may look like

```json
{
  "kkbox_sdk": {
    "client_id": "YOUR CLIENT ID",
    "client_secret": "YOUR CLIENT SECRET"
  }
}
```

Run the test:
``` bash
$ npm test
```

## Documentation

See [https://kkbox.github.io/OpenAPI-JavaScript/](https://kkbox.github.io/OpenAPI-JavaScript/) for full documentation.

## Use the SDK in Web Browsers

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
});
```

## License

Copyright 2018 KKBOX Technologies Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
