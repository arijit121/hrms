"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departmentController_1 = require("../controllers/departmentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticate);
router.post('/', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER]), departmentController_1.createDepartment);
router.get('/', departmentController_1.getAllDepartments); // All authenticated users can view departments
router.put('/:id', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN, client_1.Role.HR_MANAGER]), departmentController_1.updateDepartment);
router.delete('/:id', (0, authMiddleware_1.authorize)([client_1.Role.SUPER_ADMIN]), departmentController_1.deleteDepartment);
exports.default = router;
