import { Router } from 'express';
import { userRouter } from './user-routes.js';

const router = Router();

console.log('Registering /users');
router.use('/users', userRouter);

export default router;
