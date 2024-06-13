const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;

const requestHandler = (request, response) => {
  const filePath = path.join(__dirname, '.output/public', request.url === '/' ? 'index.html' : request.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404);
      response.end(JSON.stringify(err));
      return;
    }
    response.writeHead(200);
    response.end(data);
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.error('Server failed to start:', err);
  }
  console.log(`Server is listening on ${PORT}`);
});
