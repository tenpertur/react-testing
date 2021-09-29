const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractorPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    devtool: "eval-source-map",
    devServer: {
        port: 3000,
        hot: true
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
        },
        extensions: ['.jsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractorPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
    }), new MiniCssExtractorPlugin()],
}
