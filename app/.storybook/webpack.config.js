/*global __dirname module process require */
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '8081'
const ROOT_PATH = path.resolve(__dirname, '..')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')
const ENV = process.env.NODE_ENV || 'development'

const config = {
  
  output: {
    path: DIST_PATH,
    publicPath: '/'
  },
  resolve: {
    alias: {
      components: path.resolve(SRC_PATH, 'components'),
      reducers: path.resolve(SRC_PATH, 'reducers'),
      static: path.resolve(SRC_PATH, 'static'),
      styles: path.resolve(SRC_PATH, 'styles'),
      utils: path.resolve(SRC_PATH, 'utils'),
      modules: path.resolve(SRC_PATH, 'modules'),
      '.storybook': path.resolve(ROOT_PATH, '.storybook')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }  
          }
        ]
      },
      {
        test: /\.md$/,
        use: "raw-loader"
      },
      {
        test: /\.js$/,
        include: SRC_PATH,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/static', to: 'static' },
      { from: 'node_modules/normalize.css/normalize.css', to:'static/normalize.css'},
      { from: 'node_modules/codemirror/lib/codemirror.css', to:'static/codemirror.css'}
    ])
  ],
}

module.exports = config