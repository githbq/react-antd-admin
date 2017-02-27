  const configs = require('require-dir')('./configs');
  const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = configs.paths;



  module.exports = {
      devtool: 'eval-source-map',
      devServer: configs.devServer,
      entry: {
          dev: [ 
              `webpack-dev-server/client?http://0.0.0.0:${configs.devServer.port}`, // WebpackDevServer host and port
              'webpack/hot/only-dev-server'
          ],
          index: './src/index',
      },
      output: { // 输出的目录和文件名
          path: BUILD_PATH,
          filename: '[name].bundle.js'
      },
      resolve: {
          modules: [
              APP_PATH,
              "node_modules"
          ],
          enforceExtension: false,
          extensions: ['.js', '.jsx'], // require的时候可以直接使用require('file')，不用require('file.js')
          alias: configs.alias
      },
      module: {
          rules: configs.rules
      },
      plugins: configs.plugins
  };