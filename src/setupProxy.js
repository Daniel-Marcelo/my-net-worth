const { createProxyMiddleware } = require("http-proxy-middleware");

function abc(app) {
  app.use(
    "/search",
    createProxyMiddleware({
      target: "https://query2.finance.yahoo.com/v1/finance",
      changeOrigin: true,
    })
  );

  app.use(
    "/chart",
    createProxyMiddleware({
      target: "https://query1.finance.yahoo.com/v8/finance",
      changeOrigin: true,
    })
  );

  app.use(
    "/quoteSummary",
    createProxyMiddleware({
      target: "https://query1.finance.yahoo.com/v10/finance",
      changeOrigin: true,
    })
  );

    app.use(
      "/quote",
      createProxyMiddleware({
        target: "https://finance.yahoo.com/",
        changeOrigin: true,
      })
    );
}
module.exports = abc;
