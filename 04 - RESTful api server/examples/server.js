import { join } from 'path';
import { createServer } from 'http';

process.loadEnvFile(join(import.meta.dirname, 'config', '.env'));
const PORT = process.env.PORT;

// יוצרים את הסרבר
let server = createServer((req, res) => {
    switch(req.method){
        case 'GET':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World! GET request received');
            break;
        case 'POST':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World! POST request received');
            break;
        case 'PUT':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World! PUT request received');
            break;
        case 'DELETE':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World! DELETE request received');
            break;
        default:
            res.writeHead(405, {'Content-Type': 'text/plain'});
            res.end('Method Not Allowed');

    }
});

// הפעלת הסרבר
server.listen(PORT, () => {
    console.log(`[SERVER] live at: http://localhost:${PORT}`);
});