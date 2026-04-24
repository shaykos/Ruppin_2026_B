import { sendResponse } from '../utils/responseHandler.js';
import { parseBodyRequest } from '../utils/parseBodyRequest.js';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';


export async function getUsers(req, res) {
    try {
        const data = await readFile(join(process.cwd(), 'data', 'users.json'), 'utf-8');
        const users = JSON.parse(data);
        return sendResponse(res, 200, { success: true, data: users });
    } catch (error) {
        console.error('Error reading users:', error);
        return sendResponse(res, 500, { success: false, error: 'Internal Server Error' });
    }
}

export async function createUser(req, res) {
    try {
        const newUser = await parseBodyRequest(req);
        const data = await readFile(join(process.cwd(), 'data', 'users.json'), 'utf-8');
        const users = JSON.parse(data);
        newUser.id = users.length + 1;
        users.push(newUser);
        await writeFile(join(process.cwd(), 'data', 'users.json'), JSON.stringify(users));
        return sendResponse(res, 201, { success: true, data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return sendResponse(res, 500, { success: false, error: 'Internal Server Error' });
    }
}

export async function updateUser(req, res) {
    try {
        const userId = Number(req.url.split('/').pop());
        const updatedUser = await parseBodyRequest(req);
        const data = await readFile(join(process.cwd(), 'data', 'users.json'), 'utf-8');
        const users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return sendResponse(res, 404, { success: false, error: 'User Not Found' });
        }
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        await writeFile(join(process.cwd(), 'data', 'users.json'), JSON.stringify(users));
        return sendResponse(res, 200, { success: true, data: users[userIndex] });
    } catch (error) {
        console.error('Error updating user:', error);
        return sendResponse(res, 500, { success: false, error: 'Internal Server Error' });
    }
}

export async function deleteUser(req, res) {
    try {
        const userId = Number(req.url.split('/').pop()); 
        const data = await readFile(join(process.cwd(), 'data', 'users.json'), 'utf-8');
        const users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return sendResponse(res, 404, { success: false, error: 'User Not Found' });
        }   
        users.splice(userIndex, 1);
        await writeFile(join(process.cwd(), 'data', 'users.json'), JSON.stringify(users));
        return sendResponse(res, 200, { success: true, data: users });
    } catch (error) {
        console.error('Error deleting user:', error);
        return sendResponse(res, 500, { success: false, error: 'Internal Server Error' });
    }
}
