const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:'http://192.168.1.101/jbxx_jsc',
        changeOrigin:true,
        pathRewrite: {
          ['^/api' ]: ''
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
