var glob = require('glob')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @param {string} globPath './src/module/**\*.js'
 */
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

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
  });
  // console.log("prod-entrys:");
  // console.log(entries);
  return entries;
}

exports.getEntry = getEntry;

exports.genMulPages = function (plugins) {
    console.log('html入口文件');
    var pages = getEntry('./src/module/**/*.html');
    console.log(pages);
    for (var pathname in pages) {
        console.log("filename: "+pathname + '.html');
        console.log("template: "+pages[pathname]);
        // 配置生成的html文件，定义路径等
        var conf = {
            filename: pathname + '.html', // 生成的模板名称
            template: pages[pathname], // 模板路径
            minify: {                   //
                removeComments: true,
                collapseWhitespace: false
            },
            inject: true,             // js插入位置
            chunks: [pathname, "vendor", "manifest"]        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        };
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        plugins.push(new HtmlWebpackPlugin(conf));
    }
}