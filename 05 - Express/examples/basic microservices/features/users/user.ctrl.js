// Controller --> functions that handle the incoming requests and send responses
import { buildSuccessResponse, buildErrorResponse } from '../../utils/response.builder.js';
import { createUser, getAllUsers, updateUser } from './user.model.js';

export async function handleCreateUser(req, res) {
    try {
        let data = req.body;
        if(!data.name || !data.email) {
            throw new Error('Name and email are required');
        }
        const user = await createUser(data);
        res.status(201).json(buildSuccessResponse(user));
    } catch (error) {
        res.status(400).json(buildErrorResponse(error.message));
    }
}

export async function handleGetAllUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(buildSuccessResponse(users));
    } catch (error) {
        res.status(500).json(buildErrorResponse(error.message));
    }
}

export async function handleUpdateUser(req, res) {
    try {
        const { id }  = req.params;
        const data = req.body;
        const user = await updateUser(id, data);
        res.status(200).json(buildSuccessResponse(user));
    } catch (error) {
        res.status(400).json(buildErrorResponse(error.message));
    }
}