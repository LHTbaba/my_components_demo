module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  devServer: {
    port: process.env.port, // 端口
    open: true, //自动打开浏览器
    proxy: { //跨域请求
      '/api': {
        target: process.env.VUE_APP_URL, //要请求的地址
        //ws: true, // 启用websockets
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}