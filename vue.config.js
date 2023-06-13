const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: '80',
    proxy: {
      // 匹配所有以 '/fan-web' 开头的请求路径
      '/fan-web': {
        target: 'http://localhost:8888', // 代理目标的基础路径
        // pathRewriter: {
        //   // 请求默认会加上拦截的前缀, 设置转发请求时去掉前缀 '/fan-web'
        //   '^ /fan-web': ''
        // },
        ws: true, // 用于支持 WebSocket
        // 默认值为 true, 服务器收到的请求头中的 host 为: localhost:8888, 代理目标的地址
        // 设置为 false 时, 服务器收到的请求头中的 host 为: localhost:80, 代理服务器的地址
        changeOrigin: true // 用于控制请求头中的 host 值
      },
      '/api': {
        target: "https://smms.app",
        ws: true,
        changeOrigin: true,
        // secure: false,
        // Headers: {
        //   'Referer': 'https://smms.app'
        // }
      }
    }
  }
})
