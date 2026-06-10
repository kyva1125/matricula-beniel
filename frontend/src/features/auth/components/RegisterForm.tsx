import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type RegisterFormData = {
  nombre: string;
  institucion: string;
  correo: string;
  password: string;
};

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  loading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      nombre: '',
      institucion: '',
      correo: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
          Tu Nombre Completo
        </Label>
        <Input
          type="text"
          placeholder="Ej. Juan Pérez"
          className="w-full px-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
          {...register('nombre', {
            required: 'El nombre es obligatorio',
            minLength: {
              value: 3,
              message: 'El nombre debe tener al menos 3 caracteres',
            },
          })}
        />
        {errors.nombre && (
          <p className="text-rose-400 text-xs font-medium">
            {errors.nombre.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
          Nombre de tu Colegio / Academia
        </Label>
        <Input
          type="text"
          placeholder="Ej. Academia Newton"
          className="w-full px-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
          {...register('institucion', {
            required: 'La institución es obligatoria',
            minLength: {
              value: 2,
              message: 'La institución debe tener al menos 2 caracteres',
            },
          })}
        />
        {errors.institucion && (
          <p className="text-rose-400 text-xs font-medium">
            {errors.institucion.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
          Correo Electrónico
        </Label>
        <Input
          type="email"
          placeholder="admin@tuinstitucion.edu"
          className="w-full px-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
          {...register('correo', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Ingresa un correo válido',
            },
          })}
        />
        {errors.correo && (
          <p className="text-rose-400 text-xs font-medium">
            {errors.correo.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
          Contraseña
        </Label>
        <Input
          type="password"
          placeholder="Mínimo 6 caracteres"
          className="w-full px-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-semibold"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener mínimo 6 caracteres',
            },
          })}
        />
        {errors.password && (
          <p className="text-rose-400 text-xs font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-6 px-4 h-auto mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-bold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <span>Comenzar Prueba Gratis 🚀</span>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
