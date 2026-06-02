import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('admin@beniel.edu');
  const [password, setPassword] = useState('admin123');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLocal(true);
    setErrorLocal(null);
    try {
      await login(correo, password);
    } catch (err: any) {
      setErrorLocal(err.message || 'Error al iniciar sesión');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      {/* Background glowing blurred decorative meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main card container with subtle intro animation */}
      <div className="relative w-full max-w-md p-8 sm:p-10 bg-slate-900/40 border border-white/5 rounded-3xl shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] backdrop-blur-xl animate-fade-in z-10 mx-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4 animate-bounce-slow">
            <span className="text-3xl">🎓</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            Matrícula Beniel
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Ingresa al portal de administración escolar
          </p>
        </div>

        {/* Error Banner */}
        {errorLocal && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-2xl text-sm font-medium flex items-center gap-3 animate-head-shake">
            <span className="text-lg">⚠️</span>
            <span>{errorLocal}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                📧
              </span>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                disabled={loadingLocal}
                placeholder="ejemplo@beniel.edu"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-medium disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contraseña
              </label>
              <a href="#forgot" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                ¿La olvidaste?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loadingLocal}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-medium disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingLocal}
            className="relative w-full py-4 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-semibold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 group overflow-hidden disabled:opacity-75"
          >
            {loadingLocal ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                  ➡️
                </span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Custom styles in head if not supported directly */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
