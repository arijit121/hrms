import { Router } from 'express';
import { uploadDocument, getEmployeeDocuments } from '../controllers/documentController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), uploadDocument);
router.get('/:employeeId', getEmployeeDocuments);

export default router;
