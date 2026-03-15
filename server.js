const http = require("http");
const httpProxy = require("http-proxy");
const url = require("url");

const TARGET = "http://mcpe.playwithbao.com:50938";

let players = new Map();

const proxy = httpProxy.createProxyServer({
  target: TARGET,
  ws: true,
  changeOrigin: true
});

function showPlayers() {
  const list = [...players.values()];
  console.log("👥 Voice online (" + list.length + "):", list.join(", "));
}

const server = http.createServer((req, res) => {
  proxy.web(req, res);
});

server.on("upgrade", (req, socket, head) => {

  const query = url.parse(req.url, true).query;
  const username = query.username || "Unknown";

  players.set(socket, username);

  console.log("🎤 JOIN:", username);
  showPlayers();

  socket.on("close", () => {
    const name = players.get(socket);
    players.delete(socket);

    console.log("❌ LEAVE:", name);
    showPlayers();
  });

  proxy.ws(req, socket, head);
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Voice proxy running");
});
