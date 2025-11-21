"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recruitmentController_1 = require("../controllers/recruitmentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Public routes (or accessible by all employees)
router.get('/jobs', recruitmentController_1.getJobPostings);
router.post('/jobs/:jobId/apply', recruitmentController_1.applyForJob); // Public application
// Protected Management Routes
router.use(authMiddleware_1.authenticate);
router.post('/jobs', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER]), recruitmentController_1.createJobPosting);
router.get('/jobs/:jobId/applications', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER, client_1.Role.TEAM_LEAD]), recruitmentController_1.getApplicationsForJob);
router.put('/applications/:id/status', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER]), recruitmentController_1.updateApplicationStatus);
router.post('/applications/:applicationId/interview', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER]), recruitmentController_1.scheduleInterview);
exports.default = router;
