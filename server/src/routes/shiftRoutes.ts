import { Router } from 'express';
import { createShift, getAllShifts, assignShift, getEmployeeShifts } from '../controllers/shiftController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), createShift);
router.get('/', getAllShifts);

router.post('/assign', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD]), assignShift);
router.get('/employee/:employeeId', getEmployeeShifts);

export default router;
