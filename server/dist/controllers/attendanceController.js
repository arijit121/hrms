"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyAttendance = exports.checkOut = exports.checkIn = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
const checkIn = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee)
            return res.status(404).json({ message: 'Employee profile not found' });
        const today = new Date();
        const start = (0, date_fns_1.startOfDay)(today);
        const end = (0, date_fns_1.endOfDay)(today);
        // Check if already checked in today
        const existingRecord = await prisma.attendanceRecord.findFirst({
            where: {
                employeeId: employee.id,
                date: {
                    gte: start,
                    lte: end,
                },
            },
        });
        if (existingRecord) {
            return res.status(400).json({ message: 'Already checked in for today' });
        }
        const record = await prisma.attendanceRecord.create({
            data: {
                employeeId: employee.id,
                date: today,
                checkIn: today,
                status: client_1.AttendanceStatus.PRESENT,
            },
        });
        res.status(201).json(record);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.checkIn = checkIn;
const checkOut = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee)
            return res.status(404).json({ message: 'Employee profile not found' });
        const today = new Date();
        const start = (0, date_fns_1.startOfDay)(today);
        const end = (0, date_fns_1.endOfDay)(today);
        const record = await prisma.attendanceRecord.findFirst({
            where: {
                employeeId: employee.id,
                date: {
                    gte: start,
                    lte: end,
                },
            },
        });
        if (!record) {
            return res.status(400).json({ message: 'No check-in record found for today' });
        }
        if (record.checkOut) {
            return res.status(400).json({ message: 'Already checked out' });
        }
        const checkOutTime = new Date();
        const totalHours = (0, date_fns_1.differenceInHours)(checkOutTime, record.checkIn); // Simple hour diff
        const updatedRecord = await prisma.attendanceRecord.update({
            where: { id: record.id },
            data: {
                checkOut: checkOutTime,
                totalHours: totalHours,
            },
        });
        res.json(updatedRecord);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.checkOut = checkOut;
const getMyAttendance = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const employee = await prisma.employeeProfile.findUnique({ where: { userId } });
        if (!employee)
            return res.status(404).json({ message: 'Employee profile not found' });
        const attendance = await prisma.attendanceRecord.findMany({
            where: { employeeId: employee.id },
            orderBy: { date: 'desc' },
        });
        res.json(attendance);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMyAttendance = getMyAttendance;
