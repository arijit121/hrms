import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { LeaveStatus, Role } from '../constants';

const prisma = new PrismaClient();

export const requestLeave = async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const { leaveType, startDate, endDate, reason } = req.body;

    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const leave = await prisma.leaveRequest.create({
            data: {
                employeeId: employee.id,
                leaveType,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                status: LeaveStatus.PENDING,
            },
        });

        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMyLeaves = async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const leaves = await prisma.leaveRequest.findMany({
            where: { employeeId: employee.id },
            orderBy: { startDate: 'desc' },
        });

        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllLeaves = async (req: Request, res: Response) => {
    // TODO: Add filtering by department/team for Team Leads
    try {
        const leaves = await prisma.leaveRequest.findMany({
            include: {
                employee: { select: { fullName: true, employeeCode: true } }
            },
            orderBy: { startDate: 'desc' }
        });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const updateLeaveStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // APPROVED, REJECTED
    const approverId = (req as any).user?.userId;

    if (![LeaveStatus.APPROVED, LeaveStatus.REJECTED].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const leave = await prisma.leaveRequest.update({
            where: { id },
            data: {
                status,
                approvedBy: approverId,
            },
        });

        res.json(leave);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
