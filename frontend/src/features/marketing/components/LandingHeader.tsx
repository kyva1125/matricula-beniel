import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const LandingHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="relative w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
          🎓
        </div>
        <span className="font-extrabold text-white text-lg tracking-tight">PensiónFlow</span>
      </div>

      <Button
        onClick={() => navigate('/dashboard')}
        className="py-2.5 px-5 h-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5 group"
      >
        <span>Ingresar al Sistema</span>
        <span className="transform group-hover:translate-x-1 transition-transform">➡️</span>
      </Button>
    </header>
  );
};

export default LandingHeader;
