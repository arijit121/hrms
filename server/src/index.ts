import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import departmentRoutes from './routes/departmentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import leaveRoutes from './routes/leaveRoutes';
import taskRoutes from './routes/taskRoutes';
import recruitmentRoutes from './routes/recruitmentRoutes';
import performanceRoutes from './routes/performanceRoutes';
import trainingRoutes from './routes/trainingRoutes';
import assetRoutes from './routes/assetRoutes';
import expenseRoutes from './routes/expenseRoutes';
import shiftRoutes from './routes/shiftRoutes';
import documentRoutes from './routes/documentRoutes';
import announcementRoutes from './routes/announcementRoutes';
import visitorRoutes from './routes/visitorRoutes';
import notificationRoutes from './routes/notificationRoutes';
import payrollRoutes from './routes/payrollRoutes';
import messagingRoutes from './routes/messagingRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/recruitment', recruitmentRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/messaging', messagingRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
