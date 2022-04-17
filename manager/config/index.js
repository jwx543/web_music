'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    host: '0.0.0.0',
    port: 8080,
    notifyOnErrors: true,
    poll: false,
    autoOpenBrowser: false,
    errorOverlay: true,

    cssSourceMap: true,

    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true

  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),

    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    bundleAnalyzerReport: process.env.npm_config_report
  }
}
