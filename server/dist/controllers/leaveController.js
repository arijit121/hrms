"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeaveStatus = exports.getAllLeaves = exports.getMyLeaves = exports.requestLeave = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const requestLeave = async (req, res) => {
    const userId = req.user?.userId;
    const { leaveType, startDate, endDate, reason } = req.body;
    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee)
            return res.status(404).json({ message: 'Employee profile not found' });
        const leave = await prisma.leaveRequest.create({
            data: {
                employeeId: employee.id,
                leaveType,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                status: client_1.LeaveStatus.PENDING,
            },
        });
        res.status(201).json(leave);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.requestLeave = requestLeave;
const getMyLeaves = async (req, res) => {
    const userId = req.user?.userId;
    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee)
            return res.status(404).json({ message: 'Employee profile not found' });
        const leaves = await prisma.leaveRequest.findMany({
            where: { employeeId: employee.id },
            orderBy: { startDate: 'desc' },
        });
        res.json(leaves);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMyLeaves = getMyLeaves;
const getAllLeaves = async (req, res) => {
    // TODO: Add filtering by department/team for Team Leads
    try {
        const leaves = await prisma.leaveRequest.findMany({
            include: {
                employee: { select: { fullName: true, employeeCode: true } }
            },
            orderBy: { startDate: 'desc' }
        });
        res.json(leaves);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllLeaves = getAllLeaves;
const updateLeaveStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // APPROVED, REJECTED
    const approverId = req.user?.userId;
    if (![client_1.LeaveStatus.APPROVED, client_1.LeaveStatus.REJECTED].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }
    try {
        const leave = await prisma.leaveRequest.update({
            where: { id },
            data: {
                status,
                approvedBy: approverId,
            },
        });
        res.json(leave);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateLeaveStatus = updateLeaveStatus;
