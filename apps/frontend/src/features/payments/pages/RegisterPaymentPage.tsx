import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterPaymentForm from '@/features/payments/components/RegisterPaymentForm';
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";
import { useSchoolStore } from "@/store/useSchoolStore";

const RegisterPaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const registerPayment = useSchoolStore((state) => state.registerPayment);

  // Selected student from navigation state if available
  const initialStudentId = location.state?.studentId || '';
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: {
    studentId: string;
    conceptId: string;
    monto: string;
    metodoPago: 'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO';
    codigoOperacion: string;
  }) => {
    setLoading(true);

    try {
      // Registra el pago en el store global de Zustand
      const newPaymentId = registerPayment(data);
      
      // Simula una breve transición de carga para feedback visual premium
      setTimeout(() => {
        setLoading(false);
        navigate(`/recibo/${newPaymentId}`);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error("Error al registrar el pago:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Registrar Pago"
        description="Ingresa los detalles del abono bancario o digital de la pensión."
      />

      <Card className="bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <RegisterPaymentForm
            initialStudentId={initialStudentId}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPaymentPage;
