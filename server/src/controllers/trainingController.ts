import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Training Courses ---
export const createCourse = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const course = await prisma.trainingCourse.create({
            data: { title, description }
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.trainingCourse.findMany();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// --- Employee Training Assignments ---
export const assignTraining = async (req: Request, res: Response) => {
    const { employeeId, courseId } = req.body;
    try {
        const assignment = await prisma.employeeTraining.create({
            data: {
                employeeId,
                courseId,
                status: 'ASSIGNED'
            }
        });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getEmployeeTrainings = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {
        const trainings = await prisma.employeeTraining.findMany({
            where: { employeeId },
            include: { course: true }
        });
        res.json(trainings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateTrainingStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, certificateUrl } = req.body;
    try {
        const training = await prisma.employeeTraining.update({
            where: { id },
            data: { status, certificateUrl }
        });
        res.json(training);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
