import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      {/* Background glowing blurred decorative meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-75 h-75 bg-sky-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Renders child public pages (Login / Register) */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
