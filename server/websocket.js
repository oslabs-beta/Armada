const server = require('http').createServer();

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling'],
});

io.on('connection', (client) => {
  setInterval(() => {
    fetch(
      'http://127.0.0.1:9090/api/v1/query?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (pod)'
    )
      .then((res) => res.json())
      .then((data) => client.emit('cpu', data));
  }, 5000);
});
