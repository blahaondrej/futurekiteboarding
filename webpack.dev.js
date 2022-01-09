const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|webp|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    }
                ]
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new StyleLintPlugin({
            configFile: '.stylelintrc',
            context: 'src',
            files: '**/*.scss',
            failOnError: false,
            quiet: false
        }),
    ]
});
