import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type LoginFormData = {
  correo: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  
  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      correo: 'admin@beniel.edu',
      password: 'admin123'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Correo Electrónico
        </Label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 z-10">
            📧
          </span>
          <Input
            type="email"
            {...register('correo', { required: true })}
            disabled={loading}
            placeholder="ejemplo@beniel.edu"
            className="w-full pl-11 pr-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Contraseña
          </Label>
          <a href="#forgot" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            ¿La olvidaste?
          </a>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 z-10">
            🔒
          </span>
          <Input
            type="password"
            {...register('password', { required: true })}
            disabled={loading}
            placeholder="••••••••"
            className="w-full pl-11 pr-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="relative w-full py-6 px-4 h-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-semibold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 group overflow-hidden disabled:opacity-75"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>Iniciar Sesión</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
              ➡️
            </span>
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
