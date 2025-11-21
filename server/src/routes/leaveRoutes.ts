import { Router } from 'express';
import { requestLeave, getMyLeaves, getAllLeaves, updateLeaveStatus } from '../controllers/leaveController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', requestLeave);
router.get('/me', getMyLeaves);
router.get('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD]), getAllLeaves);
router.put('/:id/status', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD]), updateLeaveStatus);

export default router;
