const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'ws://localhost:8080',
      changeOrigin: true,
    }),
  );
  app.use('/ws-stomp', createProxyMiddleware({ target: 'ws://local:8080', ws: true }));
};
