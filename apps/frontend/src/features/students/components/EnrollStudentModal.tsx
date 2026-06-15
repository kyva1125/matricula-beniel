import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Grade {
  id: string;
  nombre: string;
  secciones: string[];
}

interface Apoderado {
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
}

interface EnrollStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  grades: Grade[];
  onRegister: (studentData: {
    nombres: string;
    apellidos: string;
    dni: string;
    grado: string;
    seccion: string;
    apoderado: Apoderado | null;
  }) => void;
}

const EnrollStudentModal: React.FC<EnrollStudentModalProps> = ({
  isOpen,
  onClose,
  grades,
  onRegister,
}) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [grado, setGrado] = useState(grades.length > 0 ? grades[0].nombre : '');
  const [seccion, setSeccion] = useState(grades.length > 0 && grades[0].secciones.length > 0 ? grades[0].secciones[0] : '');

  // Apoderado States
  const [hasApoderado, setHasApoderado] = useState(false);
  const [apoderadoNombres, setApoderadoNombres] = useState('');
  const [apoderadoApellidos, setApoderadoApellidos] = useState('');
  const [apoderadoDni, setApoderadoDni] = useState('');
  const [apoderadoFechaNacimiento, setApoderadoFechaNacimiento] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // DNI validation (exactly 8 digits)
    if (!/^\d{8}$/.test(dni)) {
      alert('El DNI del estudiante debe tener exactamente 8 dígitos numéricos.');
      return;
    }

    if (hasApoderado) {
      if (!/^\d{8}$/.test(apoderadoDni)) {
        alert('El DNI del apoderado debe tener exactamente 8 dígitos numéricos.');
        return;
      }
      if (!apoderadoNombres.trim() || !apoderadoApellidos.trim() || !apoderadoFechaNacimiento) {
        alert('Por favor, completa todos los campos del apoderado.');
        return;
      }
    }

    onRegister({
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      dni,
      grado,
      seccion,
      apoderado: hasApoderado ? {
        nombres: apoderadoNombres.trim(),
        apellidos: apoderadoApellidos.trim(),
        dni: apoderadoDni,
        fechaNacimiento: apoderadoFechaNacimiento
      } : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-xl bg-slate-900 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ✕
        </button>
        <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">Registrar Nuevo Alumno</h3>
        <p className="text-slate-400 text-xs mb-6">Ingresa los datos académicos y de contacto del estudiante.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Sección 1: Datos del Alumno */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block border-b border-white/5 pb-1">
              Datos del Estudiante
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombres</Label>
                <Input
                  type="text"
                  required
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  placeholder="Ej. Mateo"
                  className="w-full px-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apellidos</Label>
                <Input
                  type="text"
                  required
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  placeholder="Ej. Ledesma"
                  className="w-full px-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1 space-y-1.5">
                <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">DNI</Label>
                <Input
                  type="text"
                  required
                  pattern="[0-9]{8}"
                  maxLength={8}
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                  placeholder="8 dígitos"
                  className="w-full px-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grado</Label>
                <select
                  value={grado}
                  onChange={(e) => {
                    const selectedGrade = e.target.value;
                    setGrado(selectedGrade);
                    const gObj = grades.find(g => g.nombre === selectedGrade);
                    if (gObj && gObj.secciones.length > 0) {
                      setSeccion(gObj.secciones[0]);
                    }
                  }}
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                >
                  {grades.map((g) => (
                    <option key={g.id} value={g.nombre}>{g.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sección</Label>
                <select
                  value={seccion}
                  onChange={(e) => setSeccion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                >
                  {(grades.find(g => g.nombre === grado)?.secciones || ['A']).map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sección 2: Configuración del Responsable / Apoderado */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                Responsable del Pago
              </span>
              
              {/* Premium Switch Selector */}
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-white/5">
                <button
                  type="button"
                  onClick={() => setHasApoderado(false)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                    !hasApoderado
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Autofinanciado
                </button>
                <button
                  type="button"
                  onClick={() => setHasApoderado(true)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                    hasApoderado
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Con Apoderado
                </button>
              </div>
            </div>

            {/* Campos del Apoderado condicionales con animación sutil */}
            {hasApoderado ? (
              <div className="space-y-4 p-4 bg-slate-950/30 border border-white/5 rounded-2xl animate-fade-in space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombres del Apoderado</Label>
                    <Input
                      type="text"
                      required={hasApoderado}
                      value={apoderadoNombres}
                      onChange={(e) => setApoderadoNombres(e.target.value)}
                      placeholder="Ej. Juan Carlos"
                      className="w-full px-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apellidos del Apoderado</Label>
                    <Input
                      type="text"
                      required={hasApoderado}
                      value={apoderadoApellidos}
                      onChange={(e) => setApoderadoApellidos(e.target.value)}
                      placeholder="Ej. Ledesma Perez"
                      className="w-full px-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">DNI del Apoderado</Label>
                    <Input
                      type="text"
                      required={hasApoderado}
                      pattern="[0-9]{8}"
                      maxLength={8}
                      value={apoderadoDni}
                      onChange={(e) => setApoderadoDni(e.target.value.replace(/\D/g, ''))}
                      placeholder="8 dígitos"
                      className="w-full px-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Nacimiento</Label>
                    <Input
                      type="date"
                      required={hasApoderado}
                      value={apoderadoFechaNacimiento}
                      onChange={(e) => setApoderadoFechaNacimiento(e.target.value)}
                      className="w-full px-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-indigo-500/5 border border-dashed border-indigo-500/10 rounded-2xl text-center py-6">
                <span className="text-lg">👤</span>
                <p className="text-xs text-indigo-300 font-semibold mt-1">El alumno se autofinancia</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Las pensiones y recibos se emitirán a nombre del propio estudiante.</p>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4 border-t border-white/5">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 py-3 h-auto bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-300 hover:text-white text-xs font-bold rounded-2xl transition-all cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 h-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/10 cursor-pointer"
            >
              Registrar Alumno
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollStudentModal;
