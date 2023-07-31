const { defineConfig } = require('@vue/cli-service');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 强制内联CSS（使用组件时，不需要再引入css）
  css: {
    extract: false
  },
  // 别名
  configureWebpack: config => {
    config.resolve.alias['@'] = resolve('examples');
    config.resolve.alias['components'] = resolve('examples/components');
    config.resolve.alias['~'] = resolve('packages');
    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      };
    }
  },
  devServer: {
    host: '0.0.0.0', //可以忽略不写
    port: 8080, //它是用来修改你打开后的端口号的
    open: true, //值为 true的话，项目启动时自动打开到浏览器里边， false不会打开
    proxy: {
      '/api': {
        target: 'http://192.168.4.160:7001/api', //跨域请求的公共地址
        ws: false, //也可以忽略不写，不写也不会影响跨域
        changeOrigin: true, //是否开启跨域，值为 true 就是开启， false 不开启
        pathRewrite: {
          '^/api': '' //注册全局路径， 但是在你请求的时候前面需要加上 /api
        }
      }
    }
  }
});
