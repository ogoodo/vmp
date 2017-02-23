var glob = require('glob')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

/**
 * @param {string} globPath './src/module/**\*.js'
 */
function getEntry(globPath) {
  var entries = {};
  var basename;
  var tmp;
  var pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    console.log('entry:=> ', entry)
    // tmp = entry.split('/').splice(-4);
    tmp = entry.split('/').splice(2);
    var filename = tmp[tmp.length - 1];
    filename = filename.substr(0, filename.lastIndexOf('.'));
    tmp[tmp.length - 1] = filename;
    // console.log('tmp:=> ', tmp)
    // pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    // pathname = tmp.splice(0, 1) + '/testy/' + basename; // 正确输出js和html的路径
    pathname = tmp.join('/')
    //console.log('pathname:=> ', pathname)
    entries[pathname] = entry;
    // entries[pathname] = {
    //     tmpl: entry,
    //     modulePub: tmp.splice(0, 2).join('/')
    // };
  });
  // console.log("prod-entrys:");
  // console.log(entries);
  return entries;
}

exports.getEntry = getEntry;

function getPrefix () {
    var entries = {};
    var pages = getEntry('./src/module/**/*.html');
    for (var pathname in pages) {
        var pubPrefix = pathname.split('/').splice(0, 2).join('/');
        entries[pubPrefix] = '';
    }
    return entries;
}
function gen(plugins, pathname) {
    // plugins.push(
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: pathname + '/manifest',
    //         chunks: ['module/vendor']
    //     })
    // );
    // return;
    // pathname += '/';
    // plugins.push(
    //     new webpack.optimize.CommonsChunkPlugin({
    //         names: [pathname+'vendor', pathname+'manifest']
    //     })
    // )
    // return;
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: pathname + 'vendor',
            children:  false,
            // minChunks: function (module, count) {
            //     return true;
            //     // any required modules inside node_modules are extracted to vendor
            //     return (
            //     module.resource &&
            //     /\.js$/.test(module.resource) &&
            //     module.resource.indexOf(
            //         path.join(__dirname, '../node_modules')
            //     ) === 0
            //     )
            // }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: pathname + 'manifest',
            chunks: [ pathname + 'vendor']
        })
    );
}
exports.test = function(plugins) {
    var pubPrefix = getPrefix();
    console.log('pubPrefix:', pubPrefix);
    // plugins.push( new webpack.optimize.CommonsChunkPlugin({name: 'module/vendor'}) );
    for (var pathname in pubPrefix) {
      gen(plugins, pathname)
    }
    // gen(plugins, 'module')
    // plugins.push(
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name:  'module/vendor',
    //         minChunks: function (module, count) {
    //             console.log('minChunks: ', count, module.resource)
    //             // any required modules inside node_modules are extracted to vendor
    //             return (
    //             module.resource &&
    //             /\.js$/.test(module.resource) &&
    //             module.resource.indexOf(
    //                 path.join(__dirname, '../node_modules')
    //             ) === 0
    //             )
    //         }
    //     }),
    //     // extract webpack runtime and module manifest to its own file in order to
    //     // prevent vendor hash from being updated whenever app bundle is updated
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'module/manifest',
    //         chunks: ['module/vendor']
    //     })
    // );
}

exports.genMulPages = function (plugins) {
    console.log('html入口文件');
    var pages = getEntry('./src/module/**/*.html');
    console.log(pages);
    for (var pathname in pages) {
        // console.log("filename: "+pathname + '.html');
        // console.log("template: "+pages[pathname]);
        // 配置生成的html文件，定义路径等
        var pubPrefix = pathname.split('/').splice(0, 2).join('/');
        var conf = {
            filename: pathname + '.html', // 生成的模板名称
            template: pages[pathname], // 模板路径
            // template: pages[pathname].tmpl, // 模板路径
            minify: {                   //
                removeComments: true,
                collapseWhitespace: false
            },
            inject: true,             // js插入位置
            chunks: [pathname, pubPrefix + "/vendor", pubPrefix + "/manifest"]        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        };
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        plugins.push(new HtmlWebpackPlugin(conf));
    }
}