const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
  proxy.web(req, res, {
    target: "http://mcpe.playwithbao.com:50938",
    changeOrigin: true
  });
}).listen(process.env.PORT || 10000);
