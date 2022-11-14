const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const path = require('path');

const glob = require('glob');

const PATHS = {
    src: path.join(__dirname, 'src')
};

const paths = [
    {
        path: '',
        priority: '1'
    },
    {
        path: '/index.html',
        priority: '0.5'
    }
];

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|webp|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]',
                            esModule: false
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 100
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.90,0.99],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './videos/[name].[ext]'
                        }
                    }
                ]
            },
        ],
    },
    plugins: [

        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: './index.html',
            dest: './index.html',
            inline: true,
            minify: false,
            extract: false,
            width: 2560,
            height: 1440,
            penthouse: {
                blockJSRequests: false,
            }
        }),

        new WebappWebpackPlugin({
            logo: './src/assets/favicon/favicon.png',
            prefix: ".",
            favicons: {
                appName: 'Template',
                appDescription: 'Template',
                background: '#ddd',
                theme_color: '#333',
            }
        }),

        new CopyWebpackPlugin([{
            from: './src/assets/fb',
            to: 'images'
        }]),

        new CopyWebpackPlugin([{
            from: './src/assets/images/tags/iksurfmag.png',
            to: 'images'
        }]),


        new CopyWebpackPlugin([{
            from: './sitemap.xml',
            to: '.'
        }]),

        new CopyWebpackPlugin([{
            from: './vendor',
            to: '.'
        }]),

        new CopyWebpackPlugin([{
            from: './contact.php',
            to: '.'
        }]),

        new CopyWebpackPlugin([{
            from: './newsletter.php',
            to: '.'
        }]),

        new CopyWebpackPlugin([{
            from: './.htaccess',
            to: '.'
        }]),

/*        new SitemapPlugin('https://mysite.com', paths, {
            filename: 'sitemap.xml',
            lastmod: true,
        }),*/

        new RobotstxtPlugin(),

/*        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/!**!/!*`,  { nodir: true }),
        }),*/

        new MinifyPlugin()
    ]
});
