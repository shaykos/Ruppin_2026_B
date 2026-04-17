import { extname, join } from 'path';
import { readFile } from 'fs/promises';

export async function handleRoutes(req, res) {
    switch (req.url) {
        case '/':
            try {
                let data = await readFile(join(import.meta.dirname, 'public', 'home.html'));
                res.writeHead(200, { "content-type": "text/html" });
                res.end(data);
            }
            catch (err) {
                res.end(err);
            }
            break;
        case '/users':
            let users = [
                { id: 1, name: "John Doe", email: "john@example.com" },
                { id: 2, name: "Jane Smith", email: "jane@example.com" },
                { id: 3, name: "Bob Johnson", email: "bob@example.com" }
            ]
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(users));
            break;
        case '/500':
            res.writeHead(500, { "content-type": "text/plain" });
            res.end("SERVER ERROR!!! ");
            break;
        default:
            if (extname(req.url) == '.css') {
                try {
                    let data = await readFile(join(import.meta.dirname, 'public', req.url));
                    res.writeHead(200, { "content-type": "text/css" });
                    res.end(data);
                } catch (err) {
                    res.writeHead(404, { "content-type": "text/plain" });
                    res.end('File not found');
                }
            }
            else if (extname(req.url) == '.js') {
                try {
                    let data = await readFile(join(import.meta.dirname, 'public', req.url));
                    res.writeHead(200, { "content-type": "text/javascript" });
                    res.end(data);
                } catch (err) {
                    res.writeHead(404, { "content-type": "text/plain" });
                    res.end('File not found');
                }
            }
            else {
                res.writeHead(404, { "content-type": "text/plain" });
                res.end("Page not found");
            }
            break;
    }
}