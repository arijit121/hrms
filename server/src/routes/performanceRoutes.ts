import { Router } from 'express';
import {
    initiateAppraisal,
    getMyAppraisals,
    updateSelfAppraisal,
    updateManagerAppraisal,
    addGoal
} from '../controllers/performanceController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), initiateAppraisal);
router.get('/me', getMyAppraisals);
router.put('/:id/self', updateSelfAppraisal);
router.put('/:id/manager', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD]), updateManagerAppraisal);
router.post('/:appraisalId/goals', addGoal);

export default router;
