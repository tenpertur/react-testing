const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new HtmlMinimizerPlugin(), new CssMinimizerPlugin()],
  },
});
