"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaskComment = exports.updateTaskStatus = exports.getTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTask = async (req, res) => {
    const userId = req.user?.userId;
    const { title, description, priority, assignedToId, dueDate } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority: priority,
                createdById: userId,
                assignedToId,
                dueDate: dueDate ? new Date(dueDate) : null,
            },
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    const userId = req.user?.userId;
    const role = req.user?.role;
    try {
        let whereClause = {};
        if (role === client_1.Role.EMPLOYEE) {
            // Employees see tasks assigned to them or created by them
            whereClause = {
                OR: [
                    { assignedToId: userId },
                    { createdById: userId },
                ],
            };
        }
        else if (role === client_1.Role.TEAM_LEAD) {
            // Team leads see tasks for their team (simplified: all tasks for now, or refine by dept)
            // For now, let's allow them to see everything or refine later
        }
        // Admins see all
        const tasks = await prisma.task.findMany({
            where: whereClause,
            include: {
                assignedTo: { select: { employeeProfile: { select: { fullName: true } } } },
                createdBy: { select: { employeeProfile: { select: { fullName: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getTasks = getTasks;
const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id },
            data: { status: status },
        });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateTaskStatus = updateTaskStatus;
const addTaskComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user?.userId;
    try {
        const newComment = await prisma.taskComment.create({
            data: {
                taskId: id,
                userId: userId,
                comment,
            },
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addTaskComment = addTaskComment;
