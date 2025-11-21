import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendMessage = async (req: Request, res: Response) => {
    const { senderId, receiverId, content } = req.body;
    try {
        const message = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                content
            }
        });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMyMessages = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { receiverId: userId },
                    { senderId: userId }
                ]
            },
            include: {
                sender: { select: { email: true } },
                receiver: { select: { email: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const markRead = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const message = await prisma.message.update({
            where: { id },
            data: { isRead: true }
        });
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
