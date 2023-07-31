module.exports = {
  title: 'YQ-UI组件库文档',
  description: '这是我的第一个 VuePress 站点',
  // base: '/',
  // port: 6666,
  // dest: './dist',   // 设置输出目录
  head: [['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `./favicon.ico` }]],
  markdown: {
    // lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    nav: [
      { text: '主页', link: '/' },
      { text: '基础组件', link: '/baseComponents/' }
    ],
    sidebar: {
      // '/': [
      //   {
      //     title: 'Vue项目',
      //     collapsable: false,
      //   }
      // ],
      '/baseComponents/': [
        {
          title: '基于element封装',
          collapsable: true,
          children: [
            {
              title: '常用组件',
              collapsable: false,
              children: [
                'YqSearch/base' // search组件
              ]
            }
          ]
        }
      ]
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  '@babel/preset-env', // 可以识别es6语法
                  '@vue/babel-preset-jsx' // 解析jsx语法
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsxSuffixTo: [/\.vue$/, /\.md$/]
              }
            }
          ]
        }
      ]
    }
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
        }
      }
    ],
    // ['@vuepress/plugins-back-to-top', false],
    [
      'vuepress-plugin-gotop-plus',
      {
        // mobileShow: false,
        threshold: 150
      }
    ],
    '@vuepress-reco/extract-code'
  ]
};
