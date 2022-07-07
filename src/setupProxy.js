const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://query2.finance.yahoo.com',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/search/v7/finance',
    createProxyMiddleware(proxy)
  );
};