import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkBackendHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/health');
      if (!response.ok) throw new Error('Error al conectar con la API');
      
      const data = await response.json();
      setHealthData(data);
    } catch (err: any) {
      setHealthData(null);
      setError('El backend no responde en http://localhost:3000. ¿Iniciaste el servidor Express en la carpeta backend con `npm run dev`?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      {/* Background radial glow meshes */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-[-15%] w-[60%] h-[60%] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 z-10">
        
        {/* Header - Glassmorphic design */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl">
              🎓
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Panel Escolar
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Portal de Administración de Matrículas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-sm font-semibold text-white">{user?.nombre}</span>
              <span className="text-2xs font-extrabold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-2 py-0.5 rounded-md mt-0.5">
                {user?.rol}
              </span>
            </div>
            <button
              onClick={logout}
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-200 hover:text-white font-medium text-xs rounded-xl transition-all shadow-sm"
            >
              Cerrar Sesión 🚪
            </button>
          </div>
        </header>

        {/* Dashboard Content Grid */}
        <main className="flex flex-col gap-8">
          
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Metric 1: Frontend Status */}
            <div className="group p-6 bg-slate-900/30 hover:bg-slate-900/40 border border-white/5 hover:border-indigo-500/20 rounded-3xl transition-all duration-300 shadow-md">
              <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">🚀</div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                React Frontend
              </h3>
              <p className="text-4xl font-extrabold text-white mt-2 flex items-baseline gap-2">
                Activo
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </p>
              <span className="text-xs font-semibold text-emerald-400 mt-2 block">
                ¡Implementación con Tailwind CSS v4 exitosa!
              </span>
            </div>

            {/* Metric 2: Backend Health */}
            <div className="group p-6 bg-slate-900/30 hover:bg-slate-900/40 border border-white/5 hover:border-indigo-500/20 rounded-3xl transition-all duration-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">🛠️</div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Servidor Backend
                </h3>
                <div className="mt-2 flex items-center gap-2.5">
                  {loading ? (
                    <p className="text-2xl font-bold text-slate-400">Consultando...</p>
                  ) : error ? (
                    <>
                      <p className="text-4xl font-extrabold text-rose-500">Desconectado</p>
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    </>
                  ) : (
                    <>
                      <p className="text-4xl font-extrabold text-emerald-500">Saludable</p>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={checkBackendHealth}
                disabled={loading}
                className="mt-6 self-start py-2 px-4 bg-indigo-600/10 hover:bg-indigo-600/20 active:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 font-semibold text-xs rounded-xl border border-indigo-500/20 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin" />
                ) : (
                  <span>🔄 Re-conectar</span>
                )}
              </button>
            </div>
          </div>

          {/* Details Card */}
          <div className="p-6 sm:p-8 bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Conexión en Tiempo Real con Express
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Monitoreo continuo de la salud del servidor mediante peticiones HTTP nativas en segundo plano.
              </p>
            </div>

            {loading && (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-slate-400 text-sm font-medium animate-pulse">Obteniendo estado del sistema...</p>
              </div>
            )}

            {!loading && error && (
              <div className="py-8 px-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex flex-col items-center text-center gap-3">
                <span className="text-4xl">⚠️</span>
                <h4 className="text-rose-400 font-bold text-base">Error de Comunicación</h4>
                <p className="text-slate-400 text-sm max-w-md">{error}</p>
              </div>
            )}

            {!loading && healthData && (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-emerald-400 font-semibold text-sm flex items-center gap-3">
                  <span className="text-lg">🟢</span>
                  <span>Backend conectado de forma segura en el puerto 3000.</span>
                </div>

                <div className="overflow-x-auto border border-white/5 rounded-2xl bg-slate-950/40">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/5 bg-slate-900/30">
                        <th className="p-4 font-bold text-slate-400 uppercase tracking-wider text-2xs">Parámetro</th>
                        <th className="p-4 font-bold text-slate-400 uppercase tracking-wider text-2xs">Detalle Obtenido</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/1 transition-colors">
                        <td className="p-4 font-medium text-slate-400">Mensaje del Servidor</td>
                        <td className="p-4 text-white font-medium">{healthData.message}</td>
                      </tr>
                      <tr className="hover:bg-white/1 transition-colors">
                        <td className="p-4 font-medium text-slate-400">Entorno de Ejecución</td>
                        <td className="p-4">
                          <span className="py-1 px-2.5 bg-purple-500/10 text-purple-400 rounded-full font-bold text-2xs uppercase tracking-wider border border-purple-500/20">
                            {healthData.env}
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/1 transition-colors">
                        <td className="p-4 font-medium text-slate-400">Tiempo Activo (Uptime)</td>
                        <td className="p-4 text-slate-200 font-mono">{healthData.uptime}</td>
                      </tr>
                      <tr className="hover:bg-white/1 transition-colors">
                        <td className="p-4 font-medium text-slate-400">Uso de Memoria (RSS)</td>
                        <td className="p-4 text-slate-200 font-mono">{healthData.memoryUsage?.rss || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
