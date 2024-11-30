const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: "css"
        }
      ]
    ]
  },
  webpack: {
    configure: (webpackConfig) => {
      return webpackConfig;
    },
    plugins: {
      add: [
        new ESLintPlugin({
          extensions: ['js', 'jsx', 'ts', 'tsx'],
          fix: true, // 自动修复
          emitWarning: true,
          emitError: true,
          failOnError: process.env.NODE_ENV === 'production', // 生产环境构建时，如果有错误则构建失败
          lintDirtyModulesOnly: true, // 只检查修改的文件
          cache: true, // 启用缓存
        }),
      ],
    },
  },
  devServer: {
    // 代理配置等
  },
  plugins: [
    // 插件配置
  ]
}; 