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
    // 配置支持英文
    // {
    //     name: 'i18n',
    //     vuxStaticReplace: true,
    //     vuxLocale: 'en'
    // },
    // 如果你想和demo站点一样可以写i18nblock，并且需要动态切换语言，那么需要配置插件抽取i18n的内容，并设置非静态替换
    // {
    //     name: 'i18n',
    //     vuxStaticReplace: false,
    //     staticReplace: false,
    //     extractToFiles: 'src/locales/components.yml',
    //     localeList: ['en', 'zh-CN']
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
