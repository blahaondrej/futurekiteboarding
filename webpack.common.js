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
            template: 'src/templates/about-us.html', // Cesta k templatu
            filename: 'about-us.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/contact.html', // Cesta k templatu
            filename: 'contact.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/dealers.html', // Cesta k templatu
            filename: 'dealers.html', // Cilovy soubor
        }),

        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main','vendor'], // Js soubory z entry
            template: 'src/templates/detail.html', // Cesta k templatu
            filename: 'detail.html', // Cilovy soubor
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
