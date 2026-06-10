import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface StudentData {
  name: string;
  grade: string;
}

interface ConceptData {
  name: string;
}

interface PrintableReceiptProps {
  pagoId: string;
  student: StudentData;
  concept: ConceptData;
  amount: string;
  method: string;
  refCode: string;
  payDate: string;
}

const PrintableReceipt: React.FC<PrintableReceiptProps> = ({
  pagoId,
  student,
  concept,
  amount,
  method,
  refCode,
  payDate,
}) => {
  return (
    <Card className="bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl relative overflow-hidden print:border-none print:shadow-none">
      <CardContent className="p-8 sm:p-10 print:p-0">
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
      </CardContent>
    </Card>
  );
};

export default PrintableReceipt;
