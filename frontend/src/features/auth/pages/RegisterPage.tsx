import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (register) {
        // Call register method in AuthContext
        await register(nombre, correo, password, institucion);
        navigate('/dashboard');
      } else {
        throw new Error('Función de registro no implementada en el contexto');
      }
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      {/* Background glowing blurred decorative meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card container */}
      <div className="relative w-full max-w-md p-8 sm:p-10 bg-slate-900/40 border border-white/5 rounded-3xl shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] backdrop-blur-xl animate-fade-in z-10 mx-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-3">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Prueba PensiónFlow Gratis
          </h2>
          <p className="text-slate-400 text-xs mt-2">
            Obtén acceso completo e ilimitado por 7 días.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-5 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-2xl text-xs font-medium flex items-center gap-3">
            <span className="text-base">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
              Tu Nombre Completo
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Juan Pérez"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
              Nombre de tu Colegio / Academia
            </label>
            <input
              type="text"
              required
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              placeholder="Ej. Academia Newton"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="admin@tuinstitucion.edu"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-bold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Comenzar Prueba Gratis 🚀</span>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-xs text-slate-400 font-semibold">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>

      {/* Embedded Animations Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
