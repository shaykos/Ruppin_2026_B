import { Router } from 'express';
import { addUser, loginUserBcrypt, getAllUsers, loginUserArgon2 } from './users.ctrl.js';

const usesrRouter = Router();

usesrRouter
  .get('/', getAllUsers)
  .post('/register', addUser)
  .post('/loginB', loginUserBcrypt)
  .post('/loginA', loginUserArgon2)

export default usesrRouter;