import { join } from 'path';
import { createServer } from 'http';

process.loadEnvFile(join(import.meta.dirname, 'config', '.env'));
const PORT = process.env.PORT;

// יוצרים את הסרבר
let server = createServer((req, res) => {
    if (req.url.includes('kuku')) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("hello");
    }
});

// הפעלת הסרבר
server.listen(PORT, () => {
    console.log(`[SERVER] live at: http://localhost:${PORT}`);
});