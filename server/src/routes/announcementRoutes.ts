import { Router } from 'express';
import { createAnnouncement, getAllAnnouncements } from '../controllers/announcementController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), createAnnouncement);
router.get('/', getAllAnnouncements);

export default router;
