const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath:"./",
  outputDir:"dist",
  indexPath:"index.html",
  filenameHashing:true,
  transpileDependencies: true,
  devServer:{
    port:8888,
    proxy:{
      '/api':{
        // target:'http://192.168.1.101/jbxx_jsc',
        target:'http://www.zhihuiyunxiao.net/jbxx_datashow',
        changeOrigin:true,
        pathRewrite: {
          ['^/api' ]: ''
        }
      },
      '/test':{
        target:'https://jike777.com',
        changeOrigin:true,
        pathRewrite: {
          ['^/test' ]: ''
        }
      },
      '/pro-dev':{
        target: 'http://192.168.1.10/YFDataView/Show',
        changeOrigin:true,
        pathRewrite: {
          ['^/pro-dev' ]: ''
        }
      }
    }
  },
  chainWebpack:config => {
    config
        .plugin('html').tap(args => {
      args[0].title = '江北中心学校数据驾驶舱';
      return args
    })
  }
})
