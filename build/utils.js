var path = require('path')
var chalk = require('chalk')
var glob = require("glob")
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory
  if (process.env.NODE_ENV === 'production') {
    assetsSubDirectory = config.build.assetsSubDirectory
  } else if (process.env.NODE_ENV === 'staging') {
    assetsSubDirectory = config.stg.assetsSubDirectory
  } else {
    assetsSubDirectory = config.dev.assetsSubDirectory
  }
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

// 输出正确的 js 和 html 路径，支持多层目录，如：admin/user.html
exports.getEntry = function (globPath) {
  var entries = {}, basename, tmp, pathname
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    // './src/views/admin/login/main.js'.split('/').splice(3).pop() => admin/login
    tmp = entry.split('/').splice(3)
    tmp.pop()
    pathname = tmp.join('/')
    entries[pathname] = entry
  });
  console.log(chalk.red('\n  multipage entry and path list: \n'))
  console.log(entries);
  console.log('\n')
  return entries;
}

exports.getHtmlConfig = function () {
  var entries = []
  var pages = this.getEntry('./src/views/**/index.html')
  for (var pathname in pages) {
    var conf = {
      filename: pathname + '.html',
      template: pages[pathname],
      chunks: ['vendor', 'common', 'manifest', pathname],
      inject: true,
      chunksSortMode: 'dependency'
    }
    entries.push(conf)
  }
  // console.log(entries)
  return entries
}
