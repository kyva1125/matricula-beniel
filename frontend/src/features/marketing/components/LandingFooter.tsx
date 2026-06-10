import React from 'react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="relative w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/5 z-10 text-center sm:flex sm:justify-between sm:items-center">
      <span className="text-4xs text-slate-500 font-bold uppercase tracking-widest">
        © {new Date().getFullYear()} PensiónFlow. Todos los derechos reservados.
      </span>
      <div className="flex justify-center gap-6 mt-4 sm:mt-0 text-4xs text-slate-400 font-bold uppercase tracking-widest">
        <a href="#terms" className="hover:text-indigo-400 transition-colors">Términos</a>
        <a href="#privacy" className="hover:text-indigo-400 transition-colors">Privacidad</a>
      </div>
    </footer>
  );
};

export default LandingFooter;
