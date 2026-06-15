import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PrintableReceipt from '@/features/payments/components/PrintableReceipt';
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { useSchoolStore } from "@/store/useSchoolStore";

const PaymentReceiptPage: React.FC = () => {
  const { pagoId } = useParams<{ pagoId: string }>();
  const navigate = useNavigate();
  const { payments, students, pensions } = useSchoolStore();

  // Buscar el pago registrado en el store por su ID único
  const payment = payments.find((p) => p.id === pagoId);

  // Inicializar variables de vista con fallbacks defensivos
  let student = { name: 'Alumno Desconocido', grade: 'Grado Desconocido' };
  let concept = { name: 'Concepto de Pago' };
  let amount = '0.00';
  let method = 'EFECTIVO';
  let refCode = 'N/A';
  let payDate = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

  // Resolver los datos del alumno y pensión si el pago existe en el store
  if (payment) {
    amount = payment.montoPagado.toFixed(2);
    method = payment.metodoPago;
    refCode = payment.codigoOperacion || 'N/A';
    payDate = payment.fechaPago;

    const pension = pensions.find((pen) => pen.id === payment.pensionId);
    if (pension) {
      concept = {
        name: pension.mes.toLowerCase().includes('matrícula')
          ? 'Matrícula Anual'
          : `Pensión de ${pension.mes}`
      };

      const studentObj = students.find((s) => s.id === pension.alumnoId);
      if (studentObj) {
        student = {
          name: `${studentObj.nombres} ${studentObj.apellidos}`,
          grade: `${studentObj.grado} - Sección ${studentObj.seccion}`
        };
      }
    }
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in print:p-0 print:max-w-full">
      
      {/* Page Header (Hidden on print) */}
      <div className="print:hidden">
        <PageHeader
          title="Comprobante de Pago"
          description="Recibo de cobro registrado con éxito."
          action={
            <Button
              onClick={handlePrint}
              variant="outline"
              className="py-2.5 px-4 h-auto bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              🖨️ Imprimir
            </Button>
          }
        />
      </div>

      {/* Printable Receipt Card */}
      <PrintableReceipt
        pagoId={pagoId || 'PAY-UNKNOWN'}
        student={student}
        concept={concept}
        amount={amount}
        method={method}
        refCode={refCode}
        payDate={payDate}
      />

      {/* Navigation Buttons (Hidden on print) */}
      <div className="flex gap-4 print:hidden">
        <Button
          onClick={() => navigate('/dashboard')}
          className="flex-1 py-3.5 h-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          📊 Volver al Dashboard
        </Button>
        <Button
          onClick={() => navigate('/alumnos')}
          variant="outline"
          className="flex-1 py-3.5 h-auto bg-slate-900/40 hover:bg-slate-900/80 active:bg-slate-900 border border-white/5 text-slate-200 hover:text-white text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          👥 Ver Lista de Alumnos
        </Button>
      </div>
    </div>
  );
};

export default PaymentReceiptPage;
