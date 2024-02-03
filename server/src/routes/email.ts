import { Router } from 'express';
const router = Router();
import { sendEmail,retrieveEmails ,markEmailAsRead} from '../controllers/email';
import authentication from '../middleware/auth';
router.post('/mail',authentication,sendEmail);
router.get('/mail',authentication,retrieveEmails);
router.put('/mail/:id',markEmailAsRead);


export default router;