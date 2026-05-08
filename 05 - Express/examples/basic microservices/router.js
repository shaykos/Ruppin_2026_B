import {Router} from 'express';

const router = Router();

router.use('/users', (await import('./features/users/user.routes.js')).default); // url: /api/users
//router.use('/products', 'need to implement products router');
//router.use('/orders', 'need to implement orders router');


export default router;