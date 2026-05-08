import { join } from 'path';
import express from 'express';

process.loadEnvFile(join(import.meta.dirname, 'config', '.env'));

// Port number can be set in .env file, otherwise it will default to 3000
const PORT = process.env.PORT || 3000;

// Create an Express server
const server = express();

// Middleware to parse JSON bodies in requests
server.use(express.json());

// Define a route for the root URL  
server.get('/', (req, res) => {
    res.send('Hello, World!');
});

server.get('/user/:id', (req, res) => {
    let { id } = req.params;
    res.send(`User ID: ${id}`);
});

server.get('/search', (req, res) => {
    let { category, minPrice, maxPrice, q } = req.query;
    res.send(`Search query: ${category}, ${minPrice}, ${maxPrice}, ${q}`);
});

// start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`[Server] http://localhost:${PORT}`);
});


