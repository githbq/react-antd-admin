const webpack = require('webpack');
const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globalConfig = require('./globalConfig');
const path = require('path');
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./paths');
const devServer = require('./devServer');
let chunks = ['index'];
module.exports = [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
        context: ROOT_PATH,
        /**
         * 在这里引入 manifest 文件
         */
        manifest: require(path.join(BUILD_PATH, 'vendor-manifest.json'))
    }),
    new webpack.BannerPlugin('This file is created by jxy'), // 生成文件时加上注释
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        __DEV__ // magic globals, 用于打印一些调试的日志, webpack -p时会删除
    }),
    // 生成html文件
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: TEMPLATE_PATH,
        inject: 'body',
        chunks, //选定需要插入的chunk名,
        title: globalConfig.name,
        __DEV__: __DEV__,
        port: devServer.port,
        // HtmlWebpackPlugin自己有一个favicon属性, 但用起来有点问题, 所以自己重新搞个favIcon属性
        favIcon: globalConfig.favicon,
        chunksSortMode: function(a, b) {
            return sortChunk(chunks, a.names[0], b.names[0]);
        }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     sourceMap: true,
    //     compress: {
    //         warnings: true
    //     }
    // }),
    // new webpack.LoaderOptionsPlugin({
    //     minimize: true
    // })
];

function sortChunk(arr, nameA, nameB) {
    var indexA = _.indexOf(arr, nameA);
    var indexB = _.indexOf(arr, nameB);
    return indexA > indexB;
}