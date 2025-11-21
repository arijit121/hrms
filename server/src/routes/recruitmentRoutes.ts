import { Router } from 'express';
import {
    createJobPosting,
    getJobPostings,
    applyForJob,
    getApplicationsForJob,
    updateApplicationStatus,
    scheduleInterview
} from '../controllers/recruitmentController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '../constants';

const router = Router();

// Public routes (or accessible by all employees)
router.get('/jobs', getJobPostings);
router.post('/jobs/:jobId/apply', applyForJob); // Public application

// Protected Management Routes
router.use(authenticate);

router.post('/jobs', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), createJobPosting);
router.get('/jobs/:jobId/applications', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER, Role.TEAM_LEAD]), getApplicationsForJob);
router.put('/applications/:id/status', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), updateApplicationStatus);
router.post('/applications/:applicationId/interview', authorize([Role.SUPER_ADMIN, Role.HR_MANAGER]), scheduleInterview);

export default router;
