// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

const options = {
  target: 'https://jsonplaceholder.typicode.com',
  changeOrigin: true,
  pathRewrite: {
    '^/service': '',
  },
  loglevel: 'debug',
  onProxyReq: function onProxyReq(proxyReq, req) {
    // eslint-disable-next-line no-console
    console.log('-->', req.method, req.path, '->', `${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`)
  },
}

const proxy = createProxyMiddleware(options)

module.exports = (app) => {
  app.use('/service', proxy)
}
