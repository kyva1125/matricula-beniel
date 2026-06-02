import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rol, setRol] = useState<'apoderado' | 'estudiante'>('apoderado');
  
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLocal(true);
    setErrorLocal(null);

    if (password !== confirmPassword) {
      setErrorLocal('Las contraseñas no coinciden');
      setLoadingLocal(false);
      return;
    }

    try {
      await register(nombre, correo, password, rol);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorLocal(err.message || 'Error al registrar usuario');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      {/* Background glowing blurred decorative meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card container with subtle intro animation */}
      <div className="relative w-full max-w-md p-8 bg-slate-900/40 border border-white/5 rounded-3xl shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] backdrop-blur-xl z-10 mx-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-3">
            <span className="text-2xl">📝</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            Crear Cuenta
          </h2>
          <p className="text-slate-400 text-xs mt-1.5">
            Únete a la plataforma de Matrícula PensiónFlow
          </p>
        </div>

        {/* Error Banner */}
        {errorLocal && (
          <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-2xl text-xs font-semibold flex items-center gap-2.5">
            <span>⚠️</span>
            <span>{errorLocal}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nombre completo */}
          <div className="space-y-1.5">
            <label className="block text-3xs font-bold text-slate-400 uppercase tracking-widest">
              Nombre Completo
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={loadingLocal}
              placeholder="Ej. Juan Pérez Ledesma"
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white placeholder-slate-700 outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-1.5">
            <label className="block text-3xs font-bold text-slate-400 uppercase tracking-widest">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              disabled={loadingLocal}
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white placeholder-slate-700 outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
            />
          </div>

          {/* Selección de Rol */}
          <div className="space-y-1.5">
            <label className="block text-3xs font-bold text-slate-400 uppercase tracking-widest">
              Tipo de Registro
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRol('apoderado')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  rol === 'apoderado'
                    ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                👨‍👩‍👦 Apoderado
              </button>
              <button
                type="button"
                onClick={() => setRol('estudiante')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  rol === 'estudiante'
                    ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                🎓 Estudiante
              </button>
            </div>
          </div>

          {/* Contraseña */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-3xs font-bold text-slate-400 uppercase tracking-widest">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loadingLocal}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white placeholder-slate-700 outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-3xs font-bold text-slate-400 uppercase tracking-widest">
                Confirmar
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loadingLocal}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white placeholder-slate-700 outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingLocal}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-bold rounded-2xl transition-all duration-300 text-xs shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 mt-4"
          >
            {loadingLocal ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Registrarse e Ingresar</span>
            )}
          </button>
        </form>

        {/* Redirect to login Link */}
        <div className="text-center mt-6 text-xs font-semibold text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
