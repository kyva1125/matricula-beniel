import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import StudentListPage from '@/features/students/pages/StudentListPage';
import RegisterPaymentPage from '@/features/payments/pages/RegisterPaymentPage';
import PaymentReceiptPage from '@/features/payments/pages/PaymentReceiptPage';
import LandingPage from '@/features/marketing/pages/LandingPage';
import GradesConfigPage from '@/features/settings/pages/GradesConfigPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { PublicRoute } from '@/routes/PublicRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

export const router = createBrowserRouter([
  // 🏡 Landing Page Pública
  {
    path: '/',
    element: <LandingPage />,
  },

  // 🚪 Rutas Públicas (Solo para invitados sin sesión)
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },

  // 🚀 Rutas Protegidas (Con sesión activa y usando Layout común)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'alumnos',
            element: <StudentListPage />,
          },
          {
            path: 'registrar-pago',
            element: <RegisterPaymentPage />,
          },
          {
            path: 'recibo/:pagoId',
            element: <PaymentReceiptPage />,
          },
          {
            path: 'grados',
            element: <GradesConfigPage />,
          },
        ],
      },
    ],
  },

  // 📍 Redirección por defecto
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

