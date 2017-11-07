/*global __dirname module require */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack.config.js')
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')

const AppHtmlConfig = new HtmlWebpackPlugin({
  template: path.resolve(SRC_PATH, 'index.html'),
  filename: 'index.html',
  inject: 'body',
  chunks: ['index']
})

config.context = ROOT_PATH
config.entry = {
  index: path.resolve(SRC_PATH, 'index.js')
}

config.output = {
  path: DIST_PATH,
  pathinfo: true,
  filename: '[name].bundle.js',
  chunkFilename: '[name].chunk.js',
  publicPath: '/',
  devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath)
}

config.plugins = [
  AppHtmlConfig,
  ...config.plugins
]

config.devServer = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  },
  port: 8080,
  host: '0.0.0.0',
  disableHostCheck: true,
  historyApiFallback: {
    disableDotRule: true
  },
  publicPath: '/',
  inline: true
}

module.exports = config