import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSchoolStore } from "@/store/useSchoolStore";

type PaymentMethod = 'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO';

interface RegisterPaymentFormProps {
  initialStudentId?: string;
  onSubmit: (data: {
    studentId: string;
    conceptId: string;
    monto: string;
    metodoPago: PaymentMethod;
    codigoOperacion: string;
  }) => void;
  loading: boolean;
}

const RegisterPaymentForm: React.FC<RegisterPaymentFormProps> = ({
  initialStudentId = '',
  onSubmit,
  loading,
}) => {
  const { students, pensions } = useSchoolStore();
  const [studentId, setStudentId] = useState(initialStudentId);

  // Filtrar las pensiones del alumno seleccionado
  const studentPensions = studentId ? pensions.filter(p => p.alumnoId === studentId) : [];

  const [conceptId, setConceptId] = useState(() => {
    if (initialStudentId) {
      const subPensions = pensions.filter(p => p.alumnoId === initialStudentId);
      const firstUnpaid = subPensions.find(p => p.estado !== 'PAGADO') || subPensions[0];
      return firstUnpaid ? firstUnpaid.mes : '';
    }
    return '';
  });

  const [monto, setMonto] = useState(() => {
    if (initialStudentId) {
      const subPensions = pensions.filter(p => p.alumnoId === initialStudentId);
      const firstUnpaid = subPensions.find(p => p.estado !== 'PAGADO') || subPensions[0];
      return firstUnpaid ? firstUnpaid.monto.toFixed(2) : '350.00';
    }
    return '350.00';
  });

  const [metodoPago, setMetodoPago] = useState<PaymentMethod>('YAPE');
  const [codigoOperacion, setCodigoOperacion] = useState('');

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      studentId,
      conceptId,
      monto,
      metodoPago,
      codigoOperacion,
    });
  };

  return (
    <form onSubmit={handleSubmitForm} className="space-y-6">
      {/* Select Alumno */}
      <div className="space-y-2">
        <Label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Seleccionar Alumno
        </Label>
        <select
          value={studentId}
          onChange={(e) => {
            const val = e.target.value;
            setStudentId(val);

            const subPensions = pensions.filter(p => p.alumnoId === val);
            const firstUnpaid = subPensions.find(p => p.estado !== 'PAGADO') || subPensions[0];
            if (firstUnpaid) {
              setConceptId(firstUnpaid.mes);
              setMonto(firstUnpaid.monto.toFixed(2));
            } else {
              setConceptId('Matrícula');
              setMonto('200.00');
            }
          }}
          required
          className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-semibold"
        >
          <option value="" disabled>Seleccione un estudiante...</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombres} {s.apellidos} ({s.grado} - {s.seccion})
            </option>
          ))}
        </select>
      </div>

      {/* Select Concepto & Monto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Concepto de Pago
          </Label>
          <select
            value={conceptId}
            onChange={(e) => {
              const val = e.target.value;
              setConceptId(val);
              const targetPen = studentPensions.find(p => p.mes === val);
              if (targetPen) {
                setMonto(targetPen.monto.toFixed(2));
              }
            }}
            required
            disabled={!studentId}
            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!studentId && <option value="">Seleccione primero un alumno...</option>}
            {studentPensions.map((p) => (
              <option key={p.id} value={p.mes}>
                {p.mes} (S/ {p.monto.toFixed(2)}) — {p.estado}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Monto (Soles S/)
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 text-sm font-bold z-10">
              S/
            </span>
            <Input
              type="number"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
              placeholder="0.00"
              className="w-full pl-11 pr-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-bold"
            />
          </div>
        </div>
      </div>

      {/* Métodos de Pago con Branding */}
      <div className="space-y-2">
        <Label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Método de Pago
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Yape Button */}
          <button
            type="button"
            onClick={() => setMetodoPago('YAPE')}
            className={`py-3 px-2 rounded-2xl border transition-all text-xs font-bold flex flex-col items-center justify-center gap-1.5 ${
              metodoPago === 'YAPE'
                ? 'bg-purple-600/10 text-purple-400 border-purple-500 shadow-md shadow-purple-500/5'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">🟣</span>
            <span>YAPE</span>
          </button>

          {/* Plin Button */}
          <button
            type="button"
            onClick={() => setMetodoPago('PLIN')}
            className={`py-3 px-2 rounded-2xl border transition-all text-xs font-bold flex flex-col items-center justify-center gap-1.5 ${
              metodoPago === 'PLIN'
                ? 'bg-cyan-600/10 text-cyan-400 border-cyan-500 shadow-md shadow-cyan-500/5'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">🔵</span>
            <span>PLIN</span>
          </button>

          {/* Transferencia Button */}
          <button
            type="button"
            onClick={() => setMetodoPago('TRANSFERENCIA')}
            className={`py-3 px-2 rounded-2xl border transition-all text-xs font-bold flex flex-col items-center justify-center gap-1.5 ${
              metodoPago === 'TRANSFERENCIA'
                ? 'bg-sky-600/10 text-sky-400 border-sky-500 shadow-md shadow-sky-500/5'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">🏛️</span>
            <span>Banca</span>
          </button>

          {/* Efectivo Button */}
          <button
            type="button"
            onClick={() => setMetodoPago('EFECTIVO')}
            className={`py-3 px-2 rounded-2xl border transition-all text-xs font-bold flex flex-col items-center justify-center gap-1.5 ${
              metodoPago === 'EFECTIVO'
                ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500 shadow-md shadow-emerald-500/5'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">💵</span>
            <span>Efectivo</span>
          </button>
        </div>
      </div>

      {/* Código de Operación */}
      {metodoPago !== 'EFECTIVO' && (
        <div className="space-y-2 animate-fade-in">
          <Label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Código de Operación / Referencia
          </Label>
          <Input
            type="text"
            required
            value={codigoOperacion}
            onChange={(e) => setCodigoOperacion(e.target.value)}
            placeholder="Ej. 123456 (Obligatorio para corroborar depósito)"
            className="w-full px-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-semibold"
          />
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full py-6 px-4 h-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-semibold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>Registrar y Emitir Recibo</span>
            <span>📄</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default RegisterPaymentForm;
