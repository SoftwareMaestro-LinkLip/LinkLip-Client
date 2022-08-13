const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://',
    createProxyMiddleware({
      target: '',
      changeOrigin: true,
    }),
  );
};
