var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].bundle.js',
        // publicPath: 'http://localhost/'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            title: 'this is index.html!',
            // excludeChunks: ['b','c'],
            // minify: {//最小化打包选项
            //     removeComments: true
            // }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [//自动添加CSS属性前缀
                    require("autoprefixer")({
                        browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                    })
                ]
            }
        })
    ],
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.ejs$/,
            loader: 'ejs-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',//ES6转ES5
            include: path.resolve(__dirname, 'src'), //包含的检测目录
            exclude: path.resolve(__dirname, 'node_modules'), //排除的检测目录
            options: {
                presets: ['latest']
            }
        }, {
            test: /\.(png|jpg|gif|webp|svg)$/i,
            use: [
                {
                    loader: 'url-loader',//limit小于指定值会转base64
                    options: {
                        limit: 2000,
                        name: 'assets/[name]-[hash:5].[ext]'
                    }
                },
                'image-webpack-loader'//压缩图片
            ]
        }]
    }
}
