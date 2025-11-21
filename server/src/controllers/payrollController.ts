import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const generatePayroll = async (req: Request, res: Response) => {
    const { employeeId, month, basicSalary, allowances, deductions } = req.body;

    const netSalary = Number(basicSalary) + Number(allowances) - Number(deductions);

    try {
        const payroll = await prisma.payrollRecord.create({
            data: {
                employeeId,
                month,
                basicSalary,
                allowances,
                deductions,
                netSalary,
                status: 'PROCESSED'
            }
        });
        res.status(201).json(payroll);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getEmployeePayroll = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {
        const records = await prisma.payrollRecord.findMany({
            where: { employeeId },
            orderBy: { month: 'desc' }
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllPayrolls = async (req: Request, res: Response) => {
    const { month } = req.query;
    try {
        const where = month ? { month: String(month) } : {};
        const records = await prisma.payrollRecord.findMany({
            where,
            include: { employee: { select: { fullName: true, employeeCode: true } } }
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const markPaid = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const record = await prisma.payrollRecord.update({
            where: { id },
            data: {
                status: 'PAID',
                paymentDate: new Date()
            }
        });
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
