import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { LeaveStatus, TaskStatus, AttendanceStatus } from '../constants';
import { startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalEmployees = await prisma.employeeProfile.count();

        const pendingLeaves = await prisma.leaveRequest.count({
            where: { status: LeaveStatus.PENDING }
        });

        const activeTasks = await prisma.task.count({
            where: {
                status: {
                    in: [TaskStatus.TODO, TaskStatus.IN_PROGRESS]
                }
            }
        });

        const today = new Date();
        const todayAttendance = await prisma.attendanceRecord.count({
            where: {
                date: {
                    gte: startOfDay(today),
                    lte: endOfDay(today)
                },
                status: AttendanceStatus.PRESENT
            }
        });

        res.json({
            totalEmployees,
            pendingLeaves,
            activeTasks,
            todayAttendance
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
};
