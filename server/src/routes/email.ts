import { Router } from 'express';
const router = Router();
import { sendEmail,retrieveEmails ,markEmailAsRead ,deleteEmail} from '../controllers/email';
import authentication from '../middleware/auth';
router.post('/mail',authentication,sendEmail);
router.get('/mail',authentication,retrieveEmails);
router.patch('/mail/:id',markEmailAsRead);
router.delete('/mail/:id',authentication, deleteEmail)

export default router;