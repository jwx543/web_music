'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // NODE_HOST: '"http://localhost:8888"'
  NODE_HOST: '"http://172.19.240.165:8888"'
})
