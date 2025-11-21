import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const uploadDocument = async (req: Request, res: Response) => {
    const { employeeId, title, fileUrl, type } = req.body;
    try {
        const doc = await prisma.document.create({
            data: { employeeId, title, fileUrl, type }
        });
        res.status(201).json(doc);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getEmployeeDocuments = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {
        const docs = await prisma.document.findMany({ where: { employeeId } });
        res.json(docs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
