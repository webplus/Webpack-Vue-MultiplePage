var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = config.stg.env
var htmlConfig = utils.getHtmlConfig()

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.stg.productionSourceMap, extract: true })
  },
  devtool: config.stg.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.stg.assetsRoot,
    publicPath: config.stg.assetsPublicPath,
    filename: utils.assetsPath('js/[name].js?v=[chunkhash:8]'),
    chunkFilename: utils.assetsPath('js/[name].chunk.js?v=[chunkhash:8]')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.stg.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // new StatsPlugin('stats.json',{ 
    //   chunkModules: true,  
    //   chunks:true,  
    //   assets:true,
    //   modules:true,  
    //   children:true,  
    //   chunksSort:true,
    //   assetsSort:true
    // }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[contenthash:8]')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   assetsPath: config.stg.assetsPublicPath,
    //   filename: 'news.html',
    //   template: 'src/views/news/index.html',
    //   chunks: ['vendor', 'common', 'manifest', 'news'],
    //   inject: true,
    //   chunksSortMode: 'dependency'
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'login.html',
    //   template: 'src/views/login/index.html',
    //   chunks: ['vendor', 'common', 'manifest', 'login'],
    //   inject: true,
    //   chunksSortMode: 'dependency'
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // name: 'vendor',
    //   name: ['common', 'libs'],
    //   minChunks: 2
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})
for (let i = 0; i < htmlConfig.length; i ++ ) {
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlConfig[i]))
}

if (config.stg.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.stg.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
