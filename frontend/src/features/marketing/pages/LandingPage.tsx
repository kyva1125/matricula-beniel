import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Background glowing blurred decorative meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
            🎓
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">PensiónFlow</span>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5 group"
        >
          <span>Ingresar al Sistema</span>
          <span className="transform group-hover:translate-x-1 transition-transform">➡️</span>
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative flex-1 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center py-16 sm:py-24 z-10 gap-10">
        
        {/* Main Banner Text */}
        <div className="space-y-6 max-w-3xl">
          <span className="px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-3xs font-extrabold uppercase tracking-widest inline-block animate-pulse">
            🚀 SaaS de Gestión de Cobros Escolares
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            Control Total de Pensiones y Matrículas
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            La solución definitiva para colegios tradicionales y academias modernas en el Perú. 
            Gestiona abonos con Yape, Plin y bancos en segundos.
          </p>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate('/register')}
            className="py-4 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-bold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            <span>Iniciar Prueba Gratis de 7 Días</span>
            <span>🚀</span>
          </button>
          <a
            href="#features"
            className="py-4 px-8 bg-slate-900/60 hover:bg-slate-900 active:bg-slate-950 border border-white/5 hover:border-white/10 text-slate-300 hover:text-white font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
          >
            Conocer Características ⚡
          </a>
        </div>

        {/* Features Preview Section */}
        <div id="features" className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          
          {/* Card 1 */}
          <div className="p-6 bg-slate-900/30 border border-white/5 rounded-3xl backdrop-blur-xl shadow-md">
            <span className="text-3xl block mb-4">🟣</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Yape & Plin Integrados</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Registra pagos mediante código de operación y sube capturas de transacciones digitales peruanas al instante.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-slate-900/30 border border-white/5 rounded-3xl backdrop-blur-xl shadow-md">
            <span className="text-3xl block mb-4">📊</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dashboard de Morosidad</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Observa al instante el total recaudado, las pensiones vencidas del mes y el porcentaje de cobranza activa.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-slate-900/30 border border-white/5 rounded-3xl backdrop-blur-xl shadow-md">
            <span className="text-3xl block mb-4">👤</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Soporte de Academias</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Flexibilidad absoluta: soporta el modelo de padres pagadores o alumnos autofinanciados (para cursos independientes).
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/5 z-10 text-center sm:flex sm:justify-between sm:items-center">
        <span className="text-4xs text-slate-500 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} PensiónFlow. Todos los derechos reservados.
        </span>
        <div className="flex justify-center gap-6 mt-4 sm:mt-0 text-4xs text-slate-400 font-bold uppercase tracking-widest">
          <a href="#terms" className="hover:text-indigo-400 transition-colors">Términos</a>
          <a href="#privacy" className="hover:text-indigo-400 transition-colors">Privacidad</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
