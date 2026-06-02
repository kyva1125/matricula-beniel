import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Mock lists for student options
const mockStudents = [
  { id: 'std-001', name: 'Mateo Ledesma', grade: '5to Primaria', fee: 350 },
  { id: 'std-002', name: 'Sofia Rodriguez', grade: '3ro Primaria', fee: 350 },
  { id: 'std-003', name: 'Thiago Quispe', grade: '1er Secundaria', fee: 420 },
  { id: 'std-004', name: 'Camila Flores', grade: '4to Primaria', fee: 350 },
  { id: 'std-005', name: 'Lucas Gomez', grade: '2do Secundaria', fee: 420 },
];

const mockConcepts = [
  { id: 'cnc-marzo', name: 'Pensión de Marzo' },
  { id: 'cnc-abril', name: 'Pensión de Abril' },
  { id: 'cnc-mayo', name: 'Pensión de Mayo' },
  { id: 'cnc-matricula', name: 'Matrícula Anual' },
];

const RegisterPaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Selected student from navigation state if available
  const initialStudentId = location.state?.studentId || '';

  const [studentId, setStudentId] = useState(initialStudentId);
  const [conceptId, setConceptId] = useState('cnc-marzo');
  const [monto, setMonto] = useState('350.00');
  const [metodoPago, setMetodoPago] = useState<'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO'>('YAPE');
  const [codigoOperacion, setCodigoOperacion] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync fee if student changes
  useEffect(() => {
    const selectedStudent = mockStudents.find((s) => s.id === studentId);
    if (selectedStudent) {
      setMonto(selectedStudent.fee.toFixed(2));
    }
  }, [studentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate database insertion and redirect to receipt
    setTimeout(() => {
      setLoading(false);
      navigate(`/recibo/pay-${Math.floor(Math.random() * 9000) + 1000}`, {
        state: {
          studentId,
          conceptId,
          monto,
          metodoPago,
          codigoOperacion,
        },
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Registrar Pago</h2>
        <p className="text-slate-400 text-sm mt-1">Ingresa los detalles del abono bancario o digital de la pensión.</p>
      </div>

      <div className="p-6 sm:p-8 bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Select Alumno */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Seleccionar Alumno
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-semibold"
            >
              <option value="" disabled>Seleccione un estudiante...</option>
              {mockStudents.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
              ))}
            </select>
          </div>

          {/* Select Concepto & Monto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Concepto de Pago
              </label>
              <select
                value={conceptId}
                onChange={(e) => setConceptId(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-semibold"
              >
                {mockConcepts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Monto (Soles S/)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 text-sm font-bold">
                  S/
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-bold"
                />
              </div>
            </div>
          </div>

          {/* Métodos de Pago con Branding */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Método de Pago
            </label>
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
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Código de Operación / Referencia
              </label>
              <input
                type="text"
                required
                value={codigoOperacion}
                onChange={(e) => setCodigoOperacion(e.target.value)}
                placeholder="Ej. 123456 (Obligatorio para corroborar depósito)"
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-semibold"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white font-semibold rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Registrar y Emitir Recibo</span>
                <span>📄</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPaymentPage;
