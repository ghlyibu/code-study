const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js"
    },
    resolve: {
        alias: {
            "@": path.resolve("./src")
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".json"]
    },
    module: {
        // loader
    },
}