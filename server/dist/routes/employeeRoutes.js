"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticate);
// Only HR and Admin can create employees
router.post('/', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER]), employeeController_1.createEmployee);
// HR, Admin, and Team Lead can view all employees (Team Lead might be restricted in future)
router.get('/', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER, client_1.Role.TEAM_LEAD, client_1.Role.ACCOUNTANT]), employeeController_1.getAllEmployees);
router.get('/:id', employeeController_1.getEmployeeById); // Users can view profiles (add self-check logic if needed)
router.put('/:id', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER]), employeeController_1.updateEmployee);
exports.default = router;
