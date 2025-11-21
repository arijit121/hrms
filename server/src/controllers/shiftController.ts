import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Shifts ---
export const createShift = async (req: Request, res: Response) => {
    const { name, startTime, endTime } = req.body;
    try {
        const shift = await prisma.shift.create({
            data: { name, startTime, endTime }
        });
        res.status(201).json(shift);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllShifts = async (req: Request, res: Response) => {
    try {
        const shifts = await prisma.shift.findMany();
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// --- Employee Shift Assignments ---
export const assignShift = async (req: Request, res: Response) => {
    const { employeeId, shiftId, startDate, endDate } = req.body;
    try {
        const assignment = await prisma.employeeShift.create({
            data: {
                employeeId,
                shiftId,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null
            }
        });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getEmployeeShifts = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {
        const shifts = await prisma.employeeShift.findMany({
            where: { employeeId },
            include: { shift: true }
        });
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
