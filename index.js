import { createServer } from 'node:http';

const port = 8080;

const server = createServer((request, response) => {
  console.log(request.url);
  console.log(request.method);

  if (request.url.startsWith('/users')) {
    switch (request.method) {
      case 'GET':
        response.end(JSON.stringify(['Basti', 'Clara', 'Berta', 'Rüdiger']));
        break;
      case 'POST':
        console.log('new user');
        // response.statusCode = 201;
        // response.setHeader('Content-Type', 'application/json');

        response.writeHead(201, { 'Content-Type': 'application/json' });

        let body = '';
        request.on('data', (chunk) => (body += chunk));
        request.on('end', () => {
          console.log('Body', JSON.parse(body));
          response.end(body);
        });

        break;
    }
  }

  // response.end('Hallo Welt');
});

server.listen(port, () => {
  console.log(`Server listening to http://localhost:${port}`);
});
