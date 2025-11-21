import { Router } from 'express';
import { createAsset, getAllAssets, assignAsset, returnAsset } from '../controllers/assetController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), createAsset);
router.get('/', getAllAssets);

router.post('/assign', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), assignAsset);
router.put('/return/:id', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), returnAsset);

export default router;
