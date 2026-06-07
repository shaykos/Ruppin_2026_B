import express from 'express';
import router from './router.js';

const PORT = process.env.PORT || 1234;

const server = express();

server.use(express.json({ limit: '20mb' }));
server.use(express.urlencoded({ extended: true, limit: '20mb' })); 

server.use('/api', router);

server.listen(PORT, () => console.log(`[SERVER] running at http://localhost:${PORT}`));
