module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
        content: "components/content",
        common: "components/common",
        assets: "@/assets",
        network: "@/network",
        views: "@/views",
        server: "@/server"
      }
    }
  },

  // 配置跨域代理
  devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000',    // 你自己的api接口地址
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': '/api/',  
            }
        }
    }
}
};
