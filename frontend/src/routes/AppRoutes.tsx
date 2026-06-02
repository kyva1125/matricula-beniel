import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import StudentListPage from '../features/students/pages/StudentListPage';
import RegisterPaymentPage from '../features/payments/pages/RegisterPaymentPage';
import PaymentReceiptPage from '../features/payments/pages/PaymentReceiptPage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { DashboardLayout } from '../layouts/DashboardLayout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 🚪 Rutas Públicas (Solo para invitados) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* 🚀 Rutas Protegidas (Con sesión activa y usando Layout común) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/alumnos" element={<StudentListPage />} />
          <Route path="/registrar-pago" element={<RegisterPaymentPage />} />
          <Route path="/recibo/:pagoId" element={<PaymentReceiptPage />} />
        </Route>
      </Route>

      {/* 📍 Redirección por defecto */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
