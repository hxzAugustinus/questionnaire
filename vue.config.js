/*配置环境和webpack*/
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  /*production版本不要sourceMap*/
  productionSourceMap: false,
  /*crossorigin和integrity提供文件额外安全性*/
  crossorigin: "anonymous",
  integrity: true,
  devServer: {
    port: 443,
    /* https: true, */
    disableHostCheck: true //处理host不识别问题
    /*  host: "gqjy.jinlingkeji.cn" */
  },
  configureWebpack: {
    devtool: "source-map"
  }
}
