import { Router } from 'express';

const router = Router();
import { addUser, login } from '../controllers/user';
router.post('/signup' , addUser);
router.post('/login' , login);
export default router;