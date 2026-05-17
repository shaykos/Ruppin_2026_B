import { Router } from 'express';
import { handleStorageUpload, handleCloudStorage } from './user.ctrl.js';
import { saveToMemory, saveToStorage } from '../../middlewares/files.js'


const userRouter = Router();

userRouter
  .post('/uploads/storage', saveToStorage.single('kuku'), handleStorageUpload)
  .post('/uploads/cloud', saveToMemory.single('file'), handleCloudStorage)


export default userRouter;