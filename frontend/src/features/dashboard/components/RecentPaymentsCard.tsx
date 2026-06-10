import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface PaymentItem {
  id: string;
  student: string;
  amount: string;
  method: string;
  date: string;
  status: string;
}

interface RecentPaymentsCardProps {
  payments: PaymentItem[];
  onPaymentClick?: (id: string) => void;
  onViewAllPayments?: () => void;
}

const RecentPaymentsCard: React.FC<RecentPaymentsCardProps> = ({
  payments,
  onPaymentClick,
  onViewAllPayments,
}) => {
  const navigate = useNavigate();

  const handlePaymentClick = onPaymentClick || ((id) => navigate(`/recibo/${id}`));
  const handleViewAllPayments = onViewAllPayments || (() => navigate('/alumnos'));

  return (
    <Card className="rounded-3xl border border-white/5 bg-slate-900/20 shadow-xl backdrop-blur-xl flex flex-col justify-between">
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-lg font-bold text-white tracking-tight">
          Abonos Recientes
        </CardTitle>
        <CardDescription className="text-slate-400 text-xs mt-1">
          Últimos movimientos validados.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex flex-col justify-between flex-1">
        <div className="my-6 space-y-4 flex-1 overflow-y-auto max-h-[220px] pr-1">
          {payments.map((payment) => (
            <div
              key={payment.id}
              onClick={() => handlePaymentClick(payment.id)}
              className="group flex justify-between items-center p-3 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 rounded-2xl transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {payment.student}
                </p>
                <p className="text-3xs text-slate-500 mt-0.5">
                  {payment.date} • <span className="font-semibold text-slate-400">{payment.method}</span>
                </p>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5">
                <span className="text-xs font-extrabold text-white">{payment.amount}</span>
                {/*<StatusBadge status={payment.status} />*/}
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleViewAllPayments}
          variant="outline"
          className="w-full py-2.5 h-auto bg-transparent hover:bg-slate-900/30 active:bg-slate-900/60 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/30 text-xs font-bold rounded-xl transition-all"
        >
          Ver Historial Completo
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentPaymentsCard;
