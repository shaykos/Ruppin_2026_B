import { join } from 'path';

let envPath = join(import.meta.dirname, 'config', '.env');

process.loadEnvFile(envPath);

// console.log('process', process);
// console.log('env', process.env);
console.log('NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV == "development") {
    console.log("Hello");
}
else {
    console.log("Bye");
}