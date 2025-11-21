import { Router } from 'express';
import { createDepartment, getAllDepartments, updateDepartment, deleteDepartment } from '../controllers/departmentController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), createDepartment);
router.get('/', getAllDepartments); // All authenticated users can view departments
router.put('/:id', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), updateDepartment);
router.delete('/:id', authorize([Role.SUPER_ADMIN]), deleteDepartment);

export default router;
