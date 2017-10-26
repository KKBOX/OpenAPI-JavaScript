const path = require('path')

const commonConfig = {
    entry: ["babel-polyfill", './src/SDK.js'],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['env', {modules: false}]],
                    plugins: [
                        'syntax-dynamic-import',
                        'transform-async-to-generator',
                        'transform-regenerator',
                        'transform-runtime']
                }
            }]
        }]
    }
}

const clientConfig = Object.assign({
    target: 'web',
    output: {
        filename: './dist/kkbox-client-sdk.js',
        library: 'SDK',
        libraryTarget: 'umd'
    }
}, commonConfig)

const serverConfig = Object.assign({
    target: 'async-node',
    output: {
        filename: './dist/kkbox-server-sdk.js',
        library: 'SDK',
        libraryTarget: 'umd'
    }
}, commonConfig)

module.exports = [clientConfig, serverConfig]