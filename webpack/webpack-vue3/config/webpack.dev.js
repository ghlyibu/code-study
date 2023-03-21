const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js"
    },
    resolve: {
        alias: {
            "@":path.resolve("./src")
        }
    },
    module: {
        // loader
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../public/index.html")
        })
    ],
    devServer: {
        port: 8080,
        static: {
           directory: path.join(__dirname, "../public")
        }
    }
}