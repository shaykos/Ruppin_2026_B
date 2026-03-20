import { currentDir } from './settings.js';
import { mkdir, rm } from 'fs/promises';

export async function createFolder(path) {
    try {
        await mkdir(`${currentDir}/${path}`, { recursive: true });
        console.log("path created");
    }
    catch (err) {
        console.error(err);
    }
}

export async function deleteFolder(path) {
    try {
        await rm(`${currentDir}/${path}`, { recursive: true, force: true });
        console.log("path deleted");
    }
    catch (err) {
        console.error(err);
    }
}