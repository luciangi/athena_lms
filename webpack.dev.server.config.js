const { resolve } = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
    devServer: {
        port: 3000
    },

    entry: resolve(__dirname, "src/main/js/app.jsx"),
    output: {
        path: resolve(__dirname, "build"),
        filename: argv.mode === "production" ? "[name].[hash].bundle.js" : "[name].bundle.js"
    },
    resolve: {
        extensions: [ ".js", ".jsx" ]
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                include: [
                    resolve(__dirname, "src/main/js")
                ],
                use: {
                    loader: "babel-loader",
                    query: {
                        cacheDirectory: true,
                        presets: [ "env", "react" ],
                        plugins: [ "transform-decorators-legacy" ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /(\.css$)/,
                loaders: [ "style-loader", "css-loader" ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000"
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: resolve(__dirname, "src/main/js/index.html")
        })
    ]
});