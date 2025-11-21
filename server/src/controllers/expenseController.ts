import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createExpenseClaim = async (req: Request, res: Response) => {
    const { employeeId, amount, description, receiptUrl } = req.body;
    try {
        const claim = await prisma.expenseClaim.create({
            data: {
                employeeId,
                amount,
                description,
                receiptUrl,
                status: 'PENDING'
            }
        });
        res.status(201).json(claim);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getEmployeeExpenses = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {
        const claims = await prisma.expenseClaim.findMany({
            where: { employeeId }
        });
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const claims = await prisma.expenseClaim.findMany({
            include: { employee: { select: { fullName: true, employeeCode: true } } }
        });
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateExpenseStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const claim = await prisma.expenseClaim.update({
            where: { id },
            data: { status }
        });
        res.json(claim);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
