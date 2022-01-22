//http-proxy-middlewar 1.0.0版本使用
const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app){
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:8989/', changeOrigin: true , 
  secure: false,
  pathRewrite: {
      '^/api': ''
  } }));
} 

//http-proxy-middlewar 0.X.X版本使用
// const proxy = require('http-proxy-middleware')

// module.exports = function (app) {
//     app.use(proxy('/api', {
//       target: 'http://localhost:8989',
//       secure: false,
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api": "/api"
//       }
//     }))
// }