const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       // 目标的路径
  //       target: 'http://localhost:1016',
  //       // 允许跨域
  //       changeOrigin: true,
  //       // 重写跨域
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }

})
