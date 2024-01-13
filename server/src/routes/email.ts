import { Router } from 'express';
const router = Router();
import { sendEmail,inbox ,markEmailAsRead,deleteEmail , getSentEmails} from '../controllers/email';
import authentication from '../Middleware/auth';
router.post('/send',authentication,sendEmail);
router.get('/inbox',authentication,inbox);
router.get('/markread/:id',markEmailAsRead);
router.get('/sentEmails',authentication, getSentEmails)
router.delete('/delete-email/:id',deleteEmail);

export default router;