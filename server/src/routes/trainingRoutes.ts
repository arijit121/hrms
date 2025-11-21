import { Router } from 'express';
import { createCourse, getAllCourses, assignTraining, getEmployeeTrainings, updateTrainingStatus } from '../controllers/trainingController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

router.use(authenticate);

router.post('/courses', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), createCourse);
router.get('/courses', getAllCourses);

router.post('/assign', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD]), assignTraining);
router.get('/employee/:employeeId', getEmployeeTrainings);
router.put('/assignment/:id', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD]), updateTrainingStatus);

export default router;
