 const path = require('path');
 const webpack = require('webpack');
 const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require(('./configs/paths'));

 module.exports = {
     entry: {
         vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'antd', 'babel-polyfill']
     },
     output: {
         path: BUILD_PATH,
         filename: '[name].dll.js',
         /**
          * output.library
          * 将会定义为 window.${output.library}
          * 在这次的例子中，将会定义为`window.vendor_library`
          */
         library: '[name]_library'
     },
     plugins: [
         new webpack.DllPlugin({
             /**
              * path
              * 定义 manifest 文件生成的位置
              * [name]的部分由entry的名字替换
              */
             path: path.join(BUILD_PATH, '[name]-manifest.json'),
             /**
              * name
              * dll bundle 输出到那个全局变量上
              * 和 output.library 一样即可。 
              */
             name: '[name]_library'
         })
     ]
 };