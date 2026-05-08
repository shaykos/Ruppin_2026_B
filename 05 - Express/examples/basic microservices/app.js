import { join } from 'path';
import express from 'express';
import router from './router.js';

process.loadEnvFile(join(import.meta.dirname, 'config', '.env'));

// Port number can be set in .env file, otherwise it will default to 3000
const PORT = process.env.PORT || 3000;

// Create an Express server
const server = express();

// Middleware to parse JSON bodies in requests
server.use(express.json());

// Define a route
server.use('/api', router); 

// start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`[Server] http://localhost:${PORT}`);
});


