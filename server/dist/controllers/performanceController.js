"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGoal = exports.updateManagerAppraisal = exports.updateSelfAppraisal = exports.getMyAppraisals = exports.initiateAppraisal = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// For now, we'll just use a string for cycle in the EmployeeAppraisal model as per schema
// In a real app, we might want a separate AppraisalCycle model
const initiateAppraisal = async (req, res) => {
    const { employeeId, cycle } = req.body;
    try {
        const appraisal = await prisma.employeeAppraisal.create({
            data: {
                employeeId,
                cycle,
            },
        });
        res.status(201).json(appraisal);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.initiateAppraisal = initiateAppraisal;
const getMyAppraisals = async (req, res) => {
    const userId = req.user?.userId;
    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee)
            return res.status(404).json({ message: 'Employee profile not found' });
        const appraisals = await prisma.employeeAppraisal.findMany({
            where: { employeeId: employee.id },
            include: { goals: true },
        });
        res.json(appraisals);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMyAppraisals = getMyAppraisals;
const updateSelfAppraisal = async (req, res) => {
    const { id } = req.params;
    const { selfRating, comments } = req.body;
    const userId = req.user?.userId;
    try {
        // Verify ownership
        const appraisal = await prisma.employeeAppraisal.findUnique({
            where: { id },
            include: { employee: true }
        });
        if (!appraisal || appraisal.employee.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const updated = await prisma.employeeAppraisal.update({
            where: { id },
            data: {
                selfRating,
                comments: comments ? `[Self]: ${comments} \n ${appraisal.comments || ''}` : appraisal.comments,
            },
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateSelfAppraisal = updateSelfAppraisal;
const updateManagerAppraisal = async (req, res) => {
    const { id } = req.params;
    const { managerRating, comments } = req.body;
    try {
        const updated = await prisma.employeeAppraisal.update({
            where: { id },
            data: {
                managerRating,
                comments: comments ? `[Manager]: ${comments} \n` : undefined, // Append logic needs care in real app
            },
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateManagerAppraisal = updateManagerAppraisal;
const addGoal = async (req, res) => {
    const { appraisalId } = req.params;
    const { description } = req.body;
    try {
        const goal = await prisma.goal.create({
            data: {
                appraisalId,
                description,
                status: 'PENDING',
            },
        });
        res.status(201).json(goal);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addGoal = addGoal;
