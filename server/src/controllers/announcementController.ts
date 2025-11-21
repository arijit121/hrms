import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAnnouncement = async (req: Request, res: Response) => {
    const { title, content, isPinned } = req.body;
    try {
        const announcement = await prisma.announcement.create({
            data: { title, content, isPinned }
        });
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllAnnouncements = async (req: Request, res: Response) => {
    try {
        const announcements = await prisma.announcement.findMany({
            orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }]
        });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
