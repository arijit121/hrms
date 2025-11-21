import { Router } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../controllers/employeeController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

// Only HR and Admin can create employees
router.post('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), createEmployee);

// HR, Admin, and Team Lead can view all employees (Team Lead might be restricted in future)
router.get('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD, Role.ACCOUNTANT]), getAllEmployees);

router.get('/:id', getEmployeeById); // Users can view profiles (add self-check logic if needed)

router.put('/:id', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), updateEmployee);

export default router;
