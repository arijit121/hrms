import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Assets ---
export const createAsset = async (req: Request, res: Response) => {
    const { name, serialNumber, type } = req.body;
    try {
        const asset = await prisma.asset.create({
            data: { name, serialNumber, type }
        });
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllAssets = async (req: Request, res: Response) => {
    try {
        const assets = await prisma.asset.findMany({
            include: { assignments: { where: { returnedAt: null }, include: { employee: true } } }
        });
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// --- Asset Assignments ---
export const assignAsset = async (req: Request, res: Response) => {
    const { assetId, employeeId, assignedAt } = req.body;
    try {
        const assignment = await prisma.assetAssignment.create({
            data: {
                assetId,
                employeeId,
                assignedAt: new Date(assignedAt)
            }
        });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const returnAsset = async (req: Request, res: Response) => {
    const { id } = req.params; // Assignment ID
    try {
        const assignment = await prisma.assetAssignment.update({
            where: { id },
            data: { returnedAt: new Date() }
        });
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
