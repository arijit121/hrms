import { Router } from 'express';
import { getMyNotifications, markNotificationRead } from '../controllers/notificationController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/:userId', getMyNotifications);
router.put('/:id/read', markNotificationRead);

export default router;
