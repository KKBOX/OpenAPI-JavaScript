const path = require('path');

const commonConfig = {
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};

const clientConfig = Object.assign(
  {
    target: 'web',
    output: {
      filename: './dist/kkbox-client-sdk.js',
      library: 'KKBOX',
      libraryTarget: 'umd'
    }
  },
  commonConfig
);

module.exports = [clientConfig];
