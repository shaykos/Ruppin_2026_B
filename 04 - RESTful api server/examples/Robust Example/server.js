import { join } from 'path';
import { createServer } from 'http';
import { createRoutes } from './routes/router.js';

process.loadEnvFile(join(import.meta.dirname, './config', '.env'));

const PORT = process.env.PORT || 3000;

let server = createServer(createRoutes);

server.listen(PORT, () => console.log(`[SERVER] running at http://localhost:${PORT}`));






