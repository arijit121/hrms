import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logVisitor = async (req: Request, res: Response) => {
    const { visitorName, purpose, hostId, checkIn } = req.body;
    try {
        const log = await prisma.visitorLog.create({
            data: {
                visitorName,
                purpose,
                hostId,
                checkIn: new Date(checkIn)
            }
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const checkoutVisitor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const log = await prisma.visitorLog.update({
            where: { id },
            data: { checkOut: new Date() }
        });
        res.json(log);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllVisitors = async (req: Request, res: Response) => {
    try {
        const logs = await prisma.visitorLog.findMany({
            orderBy: { checkIn: 'desc' }
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
