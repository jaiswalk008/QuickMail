import { Router } from 'express';
const router = Router();
import { sendEmail,inbox ,markEmailAsRead,deleteEmail} from '../controllers/email';
import authentication from '../Middleware/auth';
router.post('/send',authentication,sendEmail);
router.get('/inbox',authentication,inbox);
router.get('/markread/:id',markEmailAsRead);
router.delete('/delete-email/:id',deleteEmail);

export default router;