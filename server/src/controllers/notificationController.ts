import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMyNotifications = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const markNotificationRead = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const notification = await prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
