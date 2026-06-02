import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row relative overflow-hidden">
      {/* Background radial glow meshes */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-[-15%] w-[60%] h-[60%] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900/40 border-r border-white/5 backdrop-blur-xl z-20">
        {/* Brand */}
        <div className="p-6 flex items-center gap-3.5 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
            🎓
          </div>
          <div>
            <h1 className="font-extrabold text-white tracking-tight text-lg">PensiónFlow</h1>
            <p className="text-3xs text-slate-400 font-bold uppercase tracking-wider">SaaS Administrativo</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300">
              {user?.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.nombre}</p>
              <p className="text-3xs text-indigo-400 font-extrabold uppercase tracking-wider truncate mt-0.5">{user?.rol}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-slate-800/60 hover:bg-slate-800 active:bg-slate-900 border border-white/5 hover:border-white/10 text-slate-300 hover:text-white font-semibold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-900/40 border-b border-white/5 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
            🎓
          </div>
          <span className="font-extrabold text-white text-md tracking-tight">PensiónFlow</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-slate-950/95 backdrop-blur-md z-30 flex flex-col p-6 animate-fade-in">
          <nav className="space-y-3 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/5 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300">
                {user?.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{user?.nombre}</p>
                <p className="text-3xs text-indigo-400 font-extrabold uppercase tracking-wider mt-0.5">{user?.rol}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-4 px-4 bg-slate-800/60 active:bg-slate-900 border border-white/5 text-slate-300 font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10">
        <Outlet />
      </main>
    </div>
  );
};
