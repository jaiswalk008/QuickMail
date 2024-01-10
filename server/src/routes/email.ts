import { Router } from 'express';
const router = Router();
import { sendEmail,inbox ,markEmailAsRead} from '../controllers/email';
import authentication from '../Middleware/auth';
router.post('/send',authentication,sendEmail);
router.get('/inbox',authentication,inbox);
router.get('/markread/:id',markEmailAsRead);
export default router;