import { Router } from 'express';
const router = Router();
import { sendEmail,inbox ,markEmailAsRead,deleteRecievedEmail ,deleteSentEmail, getSendEmails} from '../controllers/email';
import authentication from '../Middleware/auth';
router.post('/send',authentication,sendEmail);
router.get('/inbox',authentication,inbox);
router.get('/markread/:id',markEmailAsRead);
router.get('/sentEmails',authentication, getSendEmails)
router.delete('/delete-recieved-email/:id',deleteRecievedEmail);
router.delete('/delete-sent-email/:id',deleteSentEmail);

export default router;