import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus, addTaskComment } from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id/status', updateTaskStatus);
router.post('/:id/comments', addTaskComment);

export default router;
