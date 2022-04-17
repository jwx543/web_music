'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    // NODE_HOST: '"http://localhost:8888"'
    NODE_HOST: '"http://172.19.240.165:8888"'
})