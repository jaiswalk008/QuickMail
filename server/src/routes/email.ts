import { Router } from 'express';
const router = Router();
import { sendEmail,inbox } from '../controllers/email';
import authentication from '../Middleware/auth';
router.post('/send',authentication,sendEmail);
router.get('/inbox',authentication,inbox);
export default router;