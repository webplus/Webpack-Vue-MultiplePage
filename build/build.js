// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV =  process.argv[2] || 'production'

var chalk = require('chalk')
var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig, spinner, assetsPath = null

if (env.NODE_ENV === 'production') {
    console.log(chalk.red('  NODE_ENV - production'));
    webpackConfig = require('./webpack.prod.conf')
    spinner = ora('building for production...')
    assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
} else if (env.NODE_ENV === 'staging') {
    console.log(chalk.red('  NODE_ENV - staging'))
    webpackConfig = require('./webpack.stg.conf')
    spinner = ora('building for staging...')
    assetsPath = path.join(config.stg.assetsRoot, config.stg.assetsSubDirectory)
}
console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

spinner.start()

rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    timings: true,
    modules: false,
    children: false,
    chunks: true,
    chunkModules: false
  }) + '\n')
})
