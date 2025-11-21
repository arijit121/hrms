"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleInterview = exports.updateApplicationStatus = exports.getApplicationsForJob = exports.applyForJob = exports.getJobPostings = exports.createJobPosting = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// --- Job Postings ---
const createJobPosting = async (req, res) => {
    const { title, description, department, status = 'OPEN' } = req.body;
    try {
        const job = await prisma.jobPosting.create({
            data: {
                title,
                description,
                department,
                status,
            },
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createJobPosting = createJobPosting;
const getJobPostings = async (req, res) => {
    try {
        const jobs = await prisma.jobPosting.findMany({
            where: { status: 'OPEN' }, // Default to open jobs
            orderBy: { id: 'desc' }, // Use ID as proxy for time since createdAt missing on JobPosting
        });
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getJobPostings = getJobPostings;
// --- Applications ---
const applyForJob = async (req, res) => {
    const { jobId } = req.params;
    const { candidateName, email, resumeUrl } = req.body;
    try {
        const application = await prisma.jobApplication.create({
            data: {
                jobId,
                candidateName,
                email,
                resumeUrl,
                status: 'APPLIED',
            },
        });
        res.status(201).json(application);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.applyForJob = applyForJob;
const getApplicationsForJob = async (req, res) => {
    const { jobId } = req.params;
    try {
        const applications = await prisma.jobApplication.findMany({
            where: { jobId },
            include: { interviews: true },
        });
        res.json(applications);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getApplicationsForJob = getApplicationsForJob;
const updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // INTERVIEW, OFFERED, REJECTED
    try {
        const application = await prisma.jobApplication.update({
            where: { id },
            data: { status },
        });
        res.json(application);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
// --- Interviews ---
const scheduleInterview = async (req, res) => {
    const { applicationId } = req.params;
    const { interviewerId, scheduledAt } = req.body;
    try {
        const interview = await prisma.interview.create({
            data: {
                applicationId,
                interviewerId,
                scheduledAt: new Date(scheduledAt),
            },
        });
        // Auto-update application status to INTERVIEW
        await prisma.jobApplication.update({
            where: { id: applicationId },
            data: { status: 'INTERVIEW' }
        });
        res.status(201).json(interview);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.scheduleInterview = scheduleInterview;
