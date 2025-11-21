"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const departmentRoutes_1 = __importDefault(require("./routes/departmentRoutes"));
const attendanceRoutes_1 = __importDefault(require("./routes/attendanceRoutes"));
const leaveRoutes_1 = __importDefault(require("./routes/leaveRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const recruitmentRoutes_1 = __importDefault(require("./routes/recruitmentRoutes"));
const performanceRoutes_1 = __importDefault(require("./routes/performanceRoutes"));
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/employees', employeeRoutes_1.default);
app.use('/api/departments', departmentRoutes_1.default);
app.use('/api/attendance', attendanceRoutes_1.default);
app.use('/api/leaves', leaveRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/recruitment', recruitmentRoutes_1.default);
app.use('/api/performance', performanceRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
