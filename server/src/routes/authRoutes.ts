import { Router } from 'express';
import { register } from '../controllers/authController';
import { login, createInitialAdmin } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/setup-admin', createInitialAdmin); // For initial setup
router.post('/register', register); // New user registration

export default router;
