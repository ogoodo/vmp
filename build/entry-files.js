var glob = require('glob')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

var modulesName = 'modules'
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
    tmp = entry.split('/').splice(2);
    var filename = tmp[tmp.length - 1];
    filename = filename.substr(0, filename.lastIndexOf('.'));
    tmp[tmp.length - 1] = filename;
    pathname = tmp.join('/')
    entries[pathname] = entry;
  });
  return entries;
}

exports.getEntry = getEntry;

exports.test = function(plugins) {
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: modulesName + '/vendor',
            minChunks: function (module, count) {
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
            name: modulesName + '/manifest',
            chunks: [ modulesName + '/vendor']
        })
    );
}

exports.genMulPages = function (plugins) {
    console.log('html入口文件');
    var pages = getEntry('./src/modules/**/*.html');
    console.log(pages);
    for (var pathname in pages) {
        var conf = {
            filename: pathname + '.html', // 生成的模板名称
            template: pages[pathname], // 模板路径
            // template: pages[pathname].tmpl, // 模板路径
            minify: {                   //
                removeComments: true,
                collapseWhitespace: false
            },
            inject: true,
            chunks: [pathname,  modulesName + "/vendor", modulesName + "/manifest", ]
        };
        plugins.push(new HtmlWebpackPlugin(conf));
    }
}
