/*
eslint
  no-underscore-dangle: ["error", { "allow": ["__DEV__"] }]
*/
const path = require('path')

// const ROOT_PATH = path.resolve(__dirname, '../')
const ROOT_PATH = path.join(process.cwd())
const APP_PATH = path.join(ROOT_PATH, 'src') // __dirname 中的src目录，以此类推
const BUILD_PATH = path.join(ROOT_PATH, 'dist')
const PUBLIC_PATH = ''
    // 获取命令行NODE_ENV环境变量,默认为development
const NODE_ENV = process.env.NODE_ENV || 'development'

// 判断当前是否处于开发状态下
const __DEV__ = NODE_ENV === 'development'
const TEMPLATE_PATH = path.join(ROOT_PATH, './dev-config/server/template.html'); //是从根目录相对的

module.exports = { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ }