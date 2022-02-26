const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const path = require('path');

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            interpolate: true,
                            attrs: ['img:src', 'source:srcset', 'source:src']
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './fonts/[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [

        // templates

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/index.html', // Cesta k templatu
            filename: 'index.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/intro.html', // Cesta k templatu
            filename: 'intro.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/kiteboards.html', // Cesta k templatu
            filename: 'kiteboards.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/ambassadors.html', // Cesta k templatu
            filename: 'ambassadors.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/brand-history.html', // Cesta k templatu
            filename: 'brand-history.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/get-in-touch.html', // Cesta k templatu
            filename: 'get-in-touch.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/where-to-buy.html', // Cesta k templatu
            filename: 'where-to-buy.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/mucho.html', // Cesta k templatu
            filename: 'mucho.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/boss.html', // Cesta k templatu
            filename: 'boss.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/boss-carbon.html', // Cesta k templatu
            filename: 'boss-carbon.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/oraculum-carbon.html', // Cesta k templatu
            filename: 'oraculum-carbon.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/jiggy.html', // Cesta k templatu
            filename: 'jiggy.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/wholesale-pricelist-2022.html', // Cesta k templatu
            filename: 'wholesale-pricelist-2022.html', // Cilovy soubor
        }),

        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery"
        }),
    ],
    performance: {
        hints: false
    }
};
