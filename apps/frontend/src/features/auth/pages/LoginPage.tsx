import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/features/auth/components/LoginForm';
import type { LoginFormData } from '@/features/auth/components/LoginForm';
import { Card, CardContent } from "@/components/ui/card";

const LoginPage: React.FC = () => {

  const { login } = useAuth();

  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {

    setLoadingLocal(true);
    setErrorLocal(null);

    try {

      await login(data.correo, data.password);

    } catch (err: unknown) {

      setErrorLocal(err instanceof Error ? err.message : 'Error al iniciar sesión');

    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <Card className="bg-slate-900/40 border border-white/5 rounded-3xl shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] backdrop-blur-xl animate-fade-in">
      <CardContent className="p-8 sm:p-10">
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
        <LoginForm onSubmit={onSubmit} loading={loadingLocal} />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
