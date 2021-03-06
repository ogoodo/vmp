var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var entryFiles = require('./entry-files.js')
var env = config.build.env
// var glob = require('glob')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('[id].[chunkhash].js')
    // filename: utils.assetsPath('js33/[name].[chunkhash].js'),
    // chunkFilename: utils.assetsPath('js33/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('[name].[contenthash].css')),
    // new ExtractTextPlugin(utils.assetsPath('css33/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'temp/index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'hi/vendor',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'hi/manifest',
    //   chunks: ['vendor']
    // })
  ]
})

// if (config.build.productionGzip) {
//   var CompressionWebpackPlugin = require('compression-webpack-plugin')

//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: new RegExp(
//         '\\.(' +
//         config.build.productionGzipExtensions.join('|') +
//         ')$'
//       ),
//       threshold: 10240,
//       minRatio: 0.8
//     })
//   )
// }

entryFiles.test(webpackConfig.plugins);
entryFiles.genMulPages(webpackConfig.plugins);

module.exports = webpackConfig


// function getEntry(globPath) {
//   var entries = {},
//     basename, tmp, pathname;

//   glob.sync(globPath).forEach(function (entry) {
//     basename = path.basename(entry, path.extname(entry));
//     tmp = entry.split('/').splice(-3);
//     pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
//     entries[pathname] = entry;
//   });
//   console.log("prod-entrys:");
//   console.log(entries);
//   return entries;
// }

// var pages = getEntry('./src/module/**/*.html');
// console.log("prod pages-----");
// for (var pathname in pages) {
// 	console.log("filename:"+pathname + '.html');
//   console.log("template:"+pages[pathname]);
//   // 配置生成的html文件，定义路径等
//   var conf = {
//     filename: pathname + '.html',
//     template: pages[pathname], // 模板路径
//     minify:{                   //
//       removeComments:true,
//       collapseWhitespace: false
//     },
//     inject: true,             // js插入位置
//     chunks: [pathname, "vendor", "manifest"]        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
//   };
//   // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
// }

// module.exports = webpackConfig
