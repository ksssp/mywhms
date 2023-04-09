module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5200',
        changeOrigin: false
      }
    }
  }
}
