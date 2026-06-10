import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import RegisterForm from '@/features/auth/components/RegisterForm';
import type { RegisterFormData } from '@/features/auth/components/RegisterForm';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

    try {
      if (registerUser) {
        await registerUser(
          data.nombre,
          data.correo,
          data.password,
          data.institucion
        );

        navigate('/dashboard');
      } else {
        throw new Error('Función de registro no implementada en el contexto');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-900/40 border border-white/5 rounded-3xl shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] backdrop-blur-xl animate-fade-in">
      <CardContent className="p-8 sm:p-10">
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

        {error && (
          <div className="mb-5 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-2xl text-xs font-medium flex items-center gap-3">
            <span className="text-base">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <RegisterForm onSubmit={onSubmit} loading={loading} />

        <div className="mt-6 text-center text-xs text-slate-400 font-semibold">
          ¿Ya tienes cuenta?{' '}
          <Button
            variant="link"
            type="button"
            onClick={() => navigate('/login')}
            className="text-indigo-400 hover:text-indigo-300 p-0 h-auto font-semibold"
          >
            Iniciar Sesión
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
