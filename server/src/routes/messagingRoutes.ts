import { Router } from 'express';
import { sendMessage, getMyMessages, markRead } from '../controllers/messagingController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/', sendMessage);
router.get('/:userId', getMyMessages);
router.put('/:id/read', markRead);

export default router;
