const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 向less loader传的值, 用于覆盖less源文件中的变量
// 有个小问题就是这个变量只会初始化一次, 不会随globalConfig的变化而变化
// 所以在webpack-dev-server中调试时, 热加载有点问题, 不能实时更新
const lessLoaderVars = {
    sidebarCollapsible: require('./globalConfig').sidebar.collapsible,
};
// 将babel-loader的配置独立出来, 因为webpack的限制: http://stackoverflow.com/questions/33117136/how-to-add-a-query-to-a-webpack-loader-with-multiple-loaders
const babelLoaderConfig = {
    presets: ['latest', 'stage-0', 'react'], // 开启ES6、部分ES7、react特性, preset相当于预置的插件集合
    plugins: [
        ['import', { libraryName: 'antd', style: true }]
    ], // antd模块化加载, https://github.com/ant-design/babel-plugin-import
    cacheDirectory: true,
};
module.exports = [ // 定义各种loader
    // {
    //       test: /.css$/,
    //      loader: ExtractTextPlugin.extract("style-loader", "css-loader", { publicPath: "/dist" })
    //      use: ExtractTextPlugin.extract({
    //        fallback: "style-loader",
    //        use: "css-loader",
    //       publicPath: "/dist"
    //       })
    //     }
    {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /(node_modules)/,
        use: [{
            loader: 'babel-loader',
            options: babelLoaderConfig
        }]
    },
    {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: [
            { loader: 'react-hot-loader' }
        ]
    },
    {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ]
    },
    {
        test: /\.less$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true,
                    modifyVars: lessLoaderVars
                }
            }
        ]
    },
    {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)$/,
        use: [{
            loader: 'url-loader',
            options: { limit: 8192, name: 'assets/imgs/[hash].[ext]' }
        }]
    }
];