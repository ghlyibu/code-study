const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/main.ts'),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js"
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname,"../src")
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/, // ts或tsx
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: false,
                            appendTsSuffixTo: ["\\.vue$"] // 用于编译 .vue文件中的ts
                        }
                    }
                ],

            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
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