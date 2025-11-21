"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getAllDepartments = exports.createDepartment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createDepartment = async (req, res) => {
    const { name, managerId } = req.body;
    try {
        const department = await prisma.department.create({
            data: {
                name,
                managerId,
            },
        });
        res.status(201).json(department);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createDepartment = createDepartment;
const getAllDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany({
            include: {
                employees: {
                    select: { id: true, fullName: true, designation: true },
                },
            },
        });
        res.json(departments);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllDepartments = getAllDepartments;
const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, managerId } = req.body;
    try {
        const department = await prisma.department.update({
            where: { id },
            data: {
                name,
                managerId,
            },
        });
        res.json(department);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.department.delete({ where: { id } });
        res.json({ message: 'Department deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteDepartment = deleteDepartment;
