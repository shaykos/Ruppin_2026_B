import { readFile } from 'fs/promises';
import { join, extname, normalize } from 'path';

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
};


export async function handleWebsiteRoutes(req, res) {

    if (req.method !== 'GET') return false;

    const publicDir = join(process.cwd(), 'public');
    const rawPath = req.url?.split('?')[0] || '/';
    const relativePath = rawPath === '/' ? 'index.html' : rawPath.replace(/^\/+/, '');
    const safePath = normalize(relativePath);
    const filePath = join(publicDir, safePath);

    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return true;
    }

    try {
        const fileExt = extname(filePath).toLowerCase();
        const contentType = mimeTypes[fileExt] || 'application/octet-stream';
        const fileBuffer = await readFile(filePath);

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fileBuffer);
        return true;
    } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return true;
    }
}


