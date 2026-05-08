// Router --> defines the routes and connects them to the controllers

import { Router } from 'express';
import { handleCreateUser, handleGetAllUsers, handleUpdateUser } from './user.ctrl.js';

const router = Router();

router
    .get('/', handleGetAllUsers) // url: /api/users
    .post('/', handleCreateUser) // url: /api/users
    .put('/:id', handleUpdateUser) // url: /api/users/:id

export default router;
