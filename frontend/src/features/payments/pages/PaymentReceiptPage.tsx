import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

// Mock listings to resolve names from IDs
const mockStudents = [
  { id: 'std-001', name: 'Mateo Ledesma', grade: '5to Primaria' },
  { id: 'std-002', name: 'Sofia Rodriguez', grade: '3ro Primaria' },
  { id: 'std-003', name: 'Thiago Quispe', grade: '1er Secundaria' },
  { id: 'std-004', name: 'Camila Flores', grade: '4to Primaria' },
  { id: 'std-005', name: 'Lucas Gomez', grade: '2do Secundaria' },
];

const mockConcepts = [
  { id: 'cnc-marzo', name: 'Pensión de Marzo' },
  { id: 'cnc-abril', name: 'Pensión de Abril' },
  { id: 'cnc-mayo', name: 'Pensión de Mayo' },
  { id: 'cnc-matricula', name: 'Matrícula Anual' },
];

const PaymentReceiptPage: React.FC = () => {
  const { pagoId } = useParams<{ pagoId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract payment details from state (passed from form submission) or fallback
  const paymentState = location.state || {};
  const student = mockStudents.find((s) => s.id === (paymentState.studentId || 'std-001')) || mockStudents[0];
  const concept = mockConcepts.find((c) => c.id === (paymentState.conceptId || 'cnc-marzo')) || mockConcepts[0];
  const amount = paymentState.monto || '350.00';
  const method = paymentState.metodoPago || 'YAPE';
  const refCode = paymentState.codigoOperacion || 'YAP-98213-X';
  const payDate = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in print:p-0 print:max-w-full">
      
      {/* Page Header (Hidden on print) */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Comprobante de Pago</h2>
          <p className="text-slate-400 text-xs mt-1">Recibo de cobro registrado con éxito.</p>
        </div>
        <button
          onClick={handlePrint}
          className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
        >
          🖨️ Imprimir
        </button>
      </div>

      {/* Printable Receipt Card */}
      <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0">
        
        {/* Receipt Header Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-600 print:hidden" />

        {/* Institution Brand */}
        <div className="text-center pb-6 border-b border-dashed border-slate-200">
          <span className="text-4xl block mb-2 print:text-2xl">🎓</span>
          <h1 className="text-xl font-black uppercase tracking-tight text-slate-800">Institución Educativa Beniel</h1>
          <p className="text-3xs text-slate-500 font-bold uppercase tracking-widest mt-1">Matrícula y Cobranza SaaS</p>
          <span className="inline-block mt-3 px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-3xs uppercase tracking-wider rounded-full border border-emerald-200">
            🟢 Pago Exitoso
          </span>
        </div>

        {/* Transaction Meta info */}
        <div className="grid grid-cols-2 gap-4 py-6 text-xs border-b border-slate-100">
          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-4xs">Nº de Recibo</p>
            <p className="font-mono font-bold text-slate-800 mt-1">{pagoId}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-4xs">Fecha de Emisión</p>
            <p className="font-semibold text-slate-800 mt-1">{payDate}</p>
          </div>
        </div>

        {/* Details List */}
        <div className="py-6 space-y-4 border-b border-slate-100">
          <h3 className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Detalles del Cobro</h3>
          
          <div className="flex justify-between items-baseline gap-4">
            <span className="text-xs text-slate-500 font-medium">Alumno</span>
            <span className="text-xs font-bold text-slate-800 text-right">{student.name}</span>
          </div>

          <div className="flex justify-between items-baseline gap-4">
            <span className="text-xs text-slate-500 font-medium">Grado Escolar</span>
            <span className="text-xs font-semibold text-slate-700 text-right">{student.grade}</span>
          </div>

          <div className="flex justify-between items-baseline gap-4">
            <span className="text-xs text-slate-500 font-medium">Concepto</span>
            <span className="text-xs font-semibold text-slate-700 text-right">{concept.name}</span>
          </div>

          <div className="flex justify-between items-baseline gap-4">
            <span className="text-xs text-slate-500 font-medium">Método de Pago</span>
            <span className="text-xs font-bold text-indigo-600 text-right">{method}</span>
          </div>

          {method !== 'EFECTIVO' && (
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-xs text-slate-500 font-medium">Ref. Operación</span>
              <span className="text-xs font-mono font-bold text-slate-800 text-right">{refCode}</span>
            </div>
          )}
        </div>

        {/* Total Amount in Soles */}
        <div className="pt-6 flex justify-between items-center">
          <span className="text-sm font-black uppercase tracking-wider text-slate-800">Total Pagado</span>
          <span className="text-2xl font-black text-slate-900">S/ {amount}</span>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-4xs text-slate-400 font-bold uppercase tracking-widest pt-4 border-t border-slate-100">
          Este recibo es un comprobante de pago electrónico.
        </div>
      </div>

      {/* Navigation Buttons (Hidden on print) */}
      <div className="flex gap-4 print:hidden">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex-1 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          📊 Volver al Dashboard
        </button>
        <button
          onClick={() => navigate('/alumnos')}
          className="flex-1 py-3.5 px-4 bg-slate-900/40 hover:bg-slate-900/80 active:bg-slate-900 border border-white/5 text-slate-200 hover:text-white text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          👥 Ver Lista de Alumnos
        </button>
      </div>
    </div>
  );
};

export default PaymentReceiptPage;
