import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '@matricula-beniel/shared';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  user: User | null;
  navItems: NavItem[];
  currentPath: string;
  onLogout: () => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  user,
  navItems,
  currentPath,
  onLogout,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 top-[65px] bg-slate-950/95 backdrop-blur-md z-30 flex flex-col p-6 animate-fade-in">
      <nav className="space-y-3 flex-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
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
            {user?.nombre?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{user?.nombre}</p>
            <p className="text-3xs text-indigo-400 font-extrabold uppercase tracking-wider mt-0.5">{'Administrador'}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full py-4 px-4 bg-slate-800/60 active:bg-slate-900 border border-white/5 text-slate-300 font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
