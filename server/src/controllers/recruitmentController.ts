import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Job Postings ---

export const createJobPosting = async (req: Request, res: Response) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getJobPostings = async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.jobPosting.findMany({
            where: { status: 'OPEN' }, // Default to open jobs
            orderBy: { id: 'desc' }, // Use ID as proxy for time since createdAt missing on JobPosting
        });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// --- Applications ---

export const applyForJob = async (req: Request, res: Response) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getApplicationsForJob = async (req: Request, res: Response) => {
    const { jobId } = req.params;

    try {
        const applications = await prisma.jobApplication.findMany({
            where: { jobId },
            include: { interviews: true },
        });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // INTERVIEW, OFFERED, REJECTED

    try {
        const application = await prisma.jobApplication.update({
            where: { id },
            data: { status },
        });
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// --- Interviews ---

export const scheduleInterview = async (req: Request, res: Response) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
