import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TaskStatus, TaskPriority, Role } from '../constants';

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const { title, description, priority, assignedToId, dueDate } = req.body;

    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority: priority as TaskPriority,
                createdById: userId!,
                assignedToId,
                dueDate: dueDate ? new Date(dueDate) : null,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const role = (req as any).user?.role;

    try {
        let whereClause: any = {};

        if (role === Role.EMPLOYEE) {
            // Employees see tasks assigned to them or created by them
            whereClause = {
                OR: [
                    { assignedToId: userId },
                    { createdById: userId },
                ],
            };
        } else if (role === Role.TEAM_LEAD) {
            // Team leads see tasks for their team (simplified: all tasks for now, or refine by dept)
            // For now, let's allow them to see everything or refine later
        }
        // Admins see all

        const tasks = await prisma.task.findMany({
            where: whereClause,
            include: {
                assignedTo: { select: { employeeProfile: { select: { fullName: true } } } },
                createdBy: { select: { employeeProfile: { select: { fullName: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const task = await prisma.task.update({
            where: { id },
            data: { status: status as TaskStatus },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const addTaskComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = (req as any).user?.userId;

    try {
        const newComment = await prisma.taskComment.create({
            data: {
                taskId: id,
                userId: userId!,
                comment,
            },
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
