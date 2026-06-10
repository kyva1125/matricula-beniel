import React from 'react';

interface MobileHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
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
  );
};

export default MobileHeader;
