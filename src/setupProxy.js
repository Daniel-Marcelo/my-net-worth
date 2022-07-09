const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/search',
    createProxyMiddleware({
      target: 'https://query2.finance.yahoo.com/v1/finance',
      changeOrigin: true,
    })
  );

  app.use(
    '/search',
    createProxyMiddleware({
      target: 'https://query2.finance.yahoo.com/v1/finance',
      changeOrigin: true,
    })
  );
};