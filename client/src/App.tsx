import React from 'react';
import './theme.css';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Tasks from './pages/Tasks';
import AdminSettings from './pages/AdminSettings';
import Departments from './pages/Departments';
import Employees from './pages/Employees';
import Recruitment from './pages/Recruitment';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Assets from './pages/Assets';
import Expenses from './pages/Expenses';
import Shifts from './pages/Shifts';
import Documents from './pages/Documents';
import Announcements from './pages/Announcements';
import Visitors from './pages/Visitors';
import Notifications from './pages/Notifications';
import Payroll from './pages/Payroll';
import Messaging from './pages/Messaging';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                  <Sidebar />
                  <div className="flex-1 p-6 overflow-auto">
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="departments" element={<Departments />} />
                      <Route path="employees" element={<Employees />} />
                      <Route path="attendance" element={<Attendance />} />
                      <Route path="leave" element={<Leave />} />
                      <Route path="tasks" element={<Tasks />} />
                      <Route path="admin" element={<AdminSettings />} />
                      <Route path="recruitment" element={<Recruitment />} />
                      <Route path="performance" element={<Performance />} />
                      <Route path="training" element={<Training />} />
                      <Route path="assets" element={<Assets />} />
                      <Route path="expenses" element={<Expenses />} />
                      <Route path="shifts" element={<Shifts />} />
                      <Route path="documents" element={<Documents />} />
                      <Route path="announcements" element={<Announcements />} />
                      <Route path="visitors" element={<Visitors />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="payroll" element={<Payroll />} />
                      <Route path="messaging" element={<Messaging />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
