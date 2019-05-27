/*配置环境和webpack*/
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  /*production版本不要sourceMap*/
  productionSourceMap: false,
  /*crossorigin和integrity提供文件额外安全性*/
  crossorigin: "anonymous",
  integrity: true,
  devServer: {
    port: 8080,
    disableHostCheck: true //处理host不识别问题
  },
  configureWebpack: {
    devtool: "source-map"
  }
}
