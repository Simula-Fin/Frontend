const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://5a7udyuiimjx3rngjs7lp4dxee0phmbl.lambda-url.us-east-1.on.aws',
      changeOrigin: true,
    })
  );
  app.use(
    '/stock-api',
    createProxyMiddleware({
      target: 'https://stock-api-f7tht.ondigitalocean.app',
      changeOrigin: true,
      pathRewrite: {
        '^/stock-api': '', // remove base path
      },
    })
  );
};