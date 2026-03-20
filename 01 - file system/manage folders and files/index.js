
import {createFolder, deleteFolder} from './functions.js';

await createFolder(`app/files/logs`);
await createFolder(`app/files/db`);

//await deleteFolder(`app/`);