import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import createDebug from 'debug';

const debug = createDebug('app:server');

const PORT = process.env.PORT || 3000;

const appRouter = (request: IncomingMessage, response: ServerResponse) => {
    const { url, method } = request;

    if (!url) {
        response.statusCode = 404;
        response.end('Not Found');
        return;
    }
    debug(method, 'Request received', url);

    switch (method) {
        case 'GET':
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html; charset=utf8');
            response.end('<h1>Hola pepe</h1>');
            break;
        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'DELETE':
        default:
            response.statusCode = 405;
            response.setHeader('Content-Type', 'text/html; charset=utf8');
            response.end('Method not allowed');
            break;
    }
};

const server = createServer(appRouter);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    debug(`Server running on http://localhost:${PORT}`);
});
