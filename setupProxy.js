const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://apidev.polarispos.com',
      changeOrigin: true,
      headers: {
        Referer: 'https://apidev.polarispos.com',
      },
    })
  );
};