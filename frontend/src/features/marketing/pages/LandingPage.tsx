import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '@/features/marketing/components/LandingHeader';
import LandingFooter from '@/features/marketing/components/LandingFooter';
import CustomCardComponent from '@/features/marketing/components/CustomCardComponent';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Background glowing blurred decorative meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <LandingHeader />

      {/* Hero Section */}
      <main className="relative flex-1 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center py-16 sm:py-24 z-10 gap-10">
        
        {/* Main Banner Text */}
        <div className="space-y-6 max-w-3xl">
          <Badge variant="outline" className="px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-3xs font-extrabold uppercase tracking-widest inline-block animate-pulse hover:bg-indigo-500/15">
            🚀 SaaS de Gestión de Cobros Escolares
          </Badge>
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
          <Button
            onClick={() => navigate('/register')}
            className="py-6 px-8 h-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-bold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            <span>Iniciar Prueba Gratis de 7 Días</span>
            <span>🚀</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const el = document.getElementById('features');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="py-6 px-8 h-auto bg-slate-900/60 hover:bg-slate-900 active:bg-slate-950 border border-white/5 hover:border-white/10 text-slate-300 hover:text-white font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
          >
            Conocer Características ⚡
          </Button>
        </div>

        {/* Features Preview Section */}
        <div id="features" className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <CustomCardComponent
            title="Yape & Plin Integrados"
            icon="🟣"
            subtitle="Registra pagos mediante código de operación y sube capturas de transacciones digitales peruanas al instante."
          />

          <CustomCardComponent
            title="Dashboard de Morosidad"
            icon="📊"
            subtitle="Observa al instante el total recaudado, las pensiones vencidas del mes y el porcentaje de cobranza activa."
          />

          <CustomCardComponent
            title="Soporte de Academias"
            icon="🎨"
            subtitle="Flexibilidad absoluta: soporta el modelo de padres pagadores o alumnos autofinanciados (para cursos independientes)."
          />
        </div>
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
