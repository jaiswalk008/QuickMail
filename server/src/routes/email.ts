import { Router } from 'express';
const router = Router();
import { sendEmail } from '../controllers/email';
import authentication from '../Middleware/auth';
router.post('/send',authentication,sendEmail);

export default router;