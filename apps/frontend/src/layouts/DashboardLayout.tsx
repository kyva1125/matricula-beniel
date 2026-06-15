import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DesktopSidebar } from '@/layouts/components/DesktopSidebar';
import { MobileHeader } from '@/layouts/components/MobileHeader';
import { MobileMenu } from '@/layouts/components/MobileMenu';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Gestión de Alumnos', path: '/alumnos', icon: '👥' },
    { name: 'Registrar Pago', path: '/registrar-pago', icon: '💸' },
    { name: 'Grados y Secciones', path: '/grados', icon: '🏫' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row relative overflow-hidden">
      {/* Background radial glow meshes */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-[-15%] w-[60%] h-[60%] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <DesktopSidebar
        user={user}
        navItems={navItems}
        currentPath={location.pathname}
        onLogout={handleLogout}
      />

      {/* Mobile Top Header */}
      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        user={user}
        navItems={navItems}
        currentPath={location.pathname}
        onLogout={handleLogout}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10">
        <Outlet />
      </main>
    </div>
  );
};

