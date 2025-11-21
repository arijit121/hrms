import { Router } from 'express';
import { generatePayroll, getEmployeePayroll, getAllPayrolls, markPaid } from '../controllers/payrollController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/generate', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.ACCOUNTANT]), generatePayroll);
router.get('/my/:employeeId', getEmployeePayroll);
router.get('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.ACCOUNTANT]), getAllPayrolls);
router.put('/:id/pay', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.ACCOUNTANT]), markPaid);

export default router;
