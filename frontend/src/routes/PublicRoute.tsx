import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const PublicRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-100 font-sans">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-semibold tracking-wide animate-pulse">
          Validando credenciales...
        </p>
      </div>
    );
  }

  // Si NO hay usuario, le dejamos ver la pantalla de invitados (Outlet).
  // Si ya inició sesión, lo redirigimos automáticamente al Dashboard.
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
