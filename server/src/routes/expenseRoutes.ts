import { Router } from 'express';
import { createExpenseClaim, getEmployeeExpenses, getAllExpenses, updateExpenseStatus } from '../controllers/expenseController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', createExpenseClaim); // Employees can create claims
router.get('/my/:employeeId', getEmployeeExpenses); // Employees can view their own
router.get('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.ACCOUNTANT]), getAllExpenses);
router.put('/:id/status', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.ACCOUNTANT]), updateExpenseStatus);

export default router;
