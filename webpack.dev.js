const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  devServer: {
    port: 3000,
    hot: true,
    static: "./dist",
  },
  mode: "development",
  devtool: "inline-source-map",
});
