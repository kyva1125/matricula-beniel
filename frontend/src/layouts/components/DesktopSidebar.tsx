import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '@/types';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

interface DesktopSidebarProps {
  user: User | null;
  navItems: NavItem[];
  currentPath: string;
  onLogout: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  user,
  navItems,
  currentPath,
  onLogout,
}) => {
  return (
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
          const isActive = currentPath === item.path;
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
            {user?.nombre?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.nombre}</p>
            <p className="text-3xs text-indigo-400 font-extrabold uppercase tracking-wider truncate mt-0.5">{'Administrador'}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full py-3 px-4 bg-slate-800/60 hover:bg-slate-800 active:bg-slate-900 border border-white/5 hover:border-white/10 text-slate-300 hover:text-white font-semibold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
