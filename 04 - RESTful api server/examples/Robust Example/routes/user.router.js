import { getUsers, createUser, updateUser, deleteUser } from '../controllers/user.ctrl.js';
import { sendResponse } from '../utils/responseHandler.js';

export async function handleUserRoutes(req, res) {
    switch (req.method) {
        case 'GET':
            return getUsers(req, res);
         case 'POST':
             return createUser(req, res);
         case 'PUT':
             return updateUser(req, res);
         case 'DELETE':
             return deleteUser(req, res);
        default:
            return sendResponse(res, 405, { success: false, error: "Method Not Allowed" });
    }
}