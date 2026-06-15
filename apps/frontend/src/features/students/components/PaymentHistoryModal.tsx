import React from 'react';
import StatusBadge from './StatusBadge';
import { Button } from "@/components/ui/button";

interface Apoderado {
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
}

interface Student {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  grado: string;
  seccion: string;
  apoderado?: Apoderado | null;
  estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO';
}

interface Pension {
  id: string;
  alumnoId: string;
  mes: string;
  monto: number;
  fechaVencimiento: string;
  estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO';
}

interface Payment {
  id: string;
  pensionId: string;
  montoPagado: number;
  metodoPago: 'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO';
  codigoOperacion: string;
  fechaPago: string;
}

interface PaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  pensions: Pension[];
  payments: Payment[];
  onViewReceipt: (pension: Pension, payment: Payment | undefined) => void;
  onPayPension: (pension: Pension) => void;
}

const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({
  isOpen,
  onClose,
  student,
  pensions,
  payments,
  onViewReceipt,
  onPayPension,
}) => {
  if (!isOpen || !student) return null;

  const studentPensions = pensions.filter((p) => p.alumnoId === student.id);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ✕
        </button>
        
        {/* Modal Title & Alumno Card */}
        <div className="mb-6">
          <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest">Historial Financiero</span>
          <h3 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            {student.nombres} {student.apellidos}
          </h3>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5 text-xs text-slate-400 font-medium">
            <span>🪪 DNI: <strong className="text-slate-200">{student.dni}</strong></span>
            <span>🏫 Grado: <strong className="text-slate-200">{student.grado} - {student.seccion}</strong></span>
            <span>👤 Tipo: <strong className="text-slate-200">{student.apoderado ? 'Con Apoderado' : 'Autofinanciado'}</strong></span>
          </div>

          {/* Ficha del Apoderado Responsable en Historial */}
          {student.apoderado && (
            <div className="mt-4 p-4 bg-slate-950/40 border border-white/5 rounded-2xl text-xs space-y-2">
              <p className="font-bold text-indigo-400 uppercase tracking-widest text-[10px]">Datos del Apoderado Responsable:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-400">
                <div>Nombre: <span className="text-slate-200 font-bold">{student.apoderado.nombres} {student.apoderado.apellidos}</span></div>
                <div>DNI: <span className="text-slate-200 font-bold font-mono">{student.apoderado.dni}</span></div>
                <div className="col-span-2">F. Nacimiento: <span className="text-slate-200 font-bold">{student.apoderado.fechaNacimiento}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* List of Pensions */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detalle de Pensiones</h4>
          
          <div className="space-y-3">
            {studentPensions.map((pension) => {
              const payment = payments.find((pay) => pay.pensionId === pension.id);
              return (
                <div 
                  key={pension.id}
                  className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-slate-800 transition-all"
                >
                  {/* Left Info: Concept and Amount */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-sm">{pension.mes}</span>
                      <StatusBadge status={pension.estado} />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Vencimiento: {pension.fechaVencimiento} • Monto: <strong className="text-slate-300">S/ {pension.monto.toFixed(2)}</strong>
                    </p>
                    
                    {/* Payment information if paid */}
                    {payment && (
                      <div className="mt-2 bg-slate-900/30 p-2.5 rounded-lg border border-white/5 text-[10px] text-slate-400 space-y-0.5">
                        <div>🗓️ Fecha de Pago: <span className="text-slate-200 font-medium">{payment.fechaPago}</span></div>
                        <div>💳 Método: <span className="text-slate-200 font-medium">{payment.metodoPago}</span></div>
                        <div>🔑 Operación: <span className="text-slate-200 font-medium font-mono">{payment.codigoOperacion}</span></div>
                      </div>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="sm:self-center flex gap-2">
                    {pension.estado === 'PAGADO' ? (
                      <Button
                        onClick={() => onViewReceipt(pension, payment)}
                        className="py-1.5 h-auto px-3 bg-emerald-600/10 hover:bg-emerald-600 active:bg-emerald-700 text-emerald-400 hover:text-white font-bold text-2xs rounded-xl border border-emerald-500/20 hover:border-transparent transition-all cursor-pointer"
                      >
                        📄 Ver Recibo
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onPayPension(pension)}
                        className="py-1.5 h-auto px-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-2xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        💸 Pagar Pension
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            {studentPensions.length === 0 && (
              <div className="p-8 border border-dashed border-white/5 rounded-2xl text-center py-12 text-slate-400">
                <span className="text-3xl">🎒</span>
                <p className="font-semibold text-xs mt-2">No se encontraron pensiones generadas para este alumno.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 mt-6 border-t border-white/5">
          <Button
            onClick={onClose}
            variant="outline"
            className="py-3 px-6 h-auto bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-300 hover:text-white text-xs font-bold rounded-2xl transition-all cursor-pointer"
          >
            Cerrar Historial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryModal;
