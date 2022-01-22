module.exports = {
    // 设置vscode调试工具
    configureWebpack: {
        devtool: 'source-map'
    },
    // 配置跨域请求代理
    devServer: {
        proxy: {
            // 不同的值代理不同的目标服务器请求地址，pathRewrite代理将接收到的请求地址中以/api开头的替换为''
            '/api': {
                target: 'http://localhost:7777',
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/api2': {
                target: 'http://localhost:9090',
                pathRewrite: {
                    '^/api2': ''
                }
            },
        }
    },
    // 尝试关闭eslint-loader
    lintOnSave: false
}