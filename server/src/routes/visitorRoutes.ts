import { Router } from 'express';
import { logVisitor, checkoutVisitor, getAllVisitors } from '../controllers/visitorController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.SECURITY_STAFF, Role.SUPER_ADMIN, Role.HR_MANAGER]), logVisitor);
router.put('/:id/checkout', authorize([Role.SECURITY_STAFF, Role.SUPER_ADMIN, Role.HR_MANAGER]), checkoutVisitor);
router.get('/', authorize([Role.SECURITY_STAFF, Role.SUPER_ADMIN, Role.HR_MANAGER]), getAllVisitors);

export default router;
