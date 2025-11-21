"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployees = exports.createEmployee = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// Create a new employee (and user account)
const createEmployee = async (req, res) => {
    const { email, password, fullName, employeeCode, departmentId, designation, dateOfJoining, phone, address, role = client_1.Role.EMPLOYEE, // Default to EMPLOYEE role
     } = req.body;
    try {
        // Check if user or employee code already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: 'Email already exists' });
        const existingCode = await prisma.employeeProfile.findUnique({ where: { employeeCode } });
        if (existingCode)
            return res.status(400).json({ message: 'Employee code already exists' });
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        // Transaction to create User and EmployeeProfile
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role,
                    status: 'ACTIVE',
                },
            });
            const employee = await tx.employeeProfile.create({
                data: {
                    userId: user.id,
                    fullName,
                    employeeCode,
                    departmentId,
                    designation,
                    dateOfJoining: new Date(dateOfJoining),
                    phone,
                    address,
                },
            });
            return { user, employee };
        });
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createEmployee = createEmployee;
// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await prisma.employeeProfile.findMany({
            include: {
                user: {
                    select: { email: true, role: true, status: true },
                },
                department: true,
            },
        });
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllEmployees = getAllEmployees;
// Get single employee by ID
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employeeProfile.findUnique({
            where: { id },
            include: {
                user: { select: { email: true, role: true, status: true } },
                department: true,
            },
        });
        if (!employee)
            return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getEmployeeById = getEmployeeById;
// Update employee
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { fullName, departmentId, designation, phone, address } = req.body;
    try {
        const employee = await prisma.employeeProfile.update({
            where: { id },
            data: {
                fullName,
                departmentId,
                designation,
                phone,
                address,
            },
        });
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateEmployee = updateEmployee;
