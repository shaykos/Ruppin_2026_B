import { currentDir } from './settings.js';
import { readFile, writeFile, unlink, appendFile } from 'fs/promises';

export async function readLocalFile(num) {
    try {
        let data = await readFile(`${currentDir}/files/file_${num}.txt`, 'utf8');
        console.log(data);
    }
    catch (err) {
        console.error(err);
    }
}

export function getRandNumber() {
    let max = 10, min = 1;
    return Math.floor(Math.random() * (max - min) + min);
}

export async function writeMultipleTable(limit) {
    let text = "";
    for (let row = 1; row <= limit; row++) {
        for (let col = 1; col <= limit; col++) {
            text += `${row * col}\t`;
        }
        text += '\n';
    }

    try {
        await writeFile(`${currentDir}/files/multiple_${limit}.txt`, text);
        console.log("File created");
    } catch (err) {
        console.error(err);
    }
}

export async function deleteFile(file) {
    try {
        await unlink(`${currentDir}/files/${file}`);
        console.log('file deleted');
    }
    catch (err) {
        console.error(err);
    }
}