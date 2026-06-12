import { join } from 'path';
import express from 'express';
import router from './routes.js';
import 'dotenv/config'; 

const PORT = process.env.PORT || 8800;

let server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', router);

server.listen(PORT, () => console.log(`[SERVER] running at http://localhost:${PORT}`));