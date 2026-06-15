const net = require('net');
const TARGET = { host: 'ollama', port: 11434 };
const LISTEN_PORT = 11434;

const server = net.createServer((client) => {
  const upstream = net.connect(TARGET, () => {
    client.pipe(upstream);
    upstream.pipe(client);
  });
  client.on('error', () => upstream.destroy());
  upstream.on('error', () => client.destroy());
});

server.listen(LISTEN_PORT, '127.0.0.1', () => {
  console.log(`Forwarding 127.0.0.1:${LISTEN_PORT} -> ${TARGET.host}:${TARGET.port}`);
});
