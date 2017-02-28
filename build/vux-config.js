var path = require('path')


module.exports = {
  plugins: [
    {
      name: 'vux-ui'
    },
    {
        // 在构建后去除重复css代码
        name: 'duplicate-style'
    },
    // {
    //     name: 'i18n',
    //     vuxStaticReplace: true,
    //     vuxLocale: 'en'
    // },
    {
        name: 'less-theme',
        // path: 'src/styles/theme.less'
        path: path.resolve(__dirname, '../src/styles/theme.less'),
    },
    {
        // 减少一次http请求
        name: 'inline-manifest'
    }
  ]
}
