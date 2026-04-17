import { join } from 'path';
import http from 'http';
import { handleRoutes } from './router.js';

process.loadEnvFile(join(import.meta.dirname, 'config', '.env'));
const PORT = process.env.PORT;


// יוצרים את הסרבר
let server = http.createServer(handleRoutes);

// הפעלת הסרבר
server.listen(PORT, () => {
    console.log(`server is live at: http://localhost:${PORT}`);
});