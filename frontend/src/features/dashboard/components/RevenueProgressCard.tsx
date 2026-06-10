import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RevenueProgressCardProps {
  currentAmount?: number;
  goalAmount?: number;
  onRegisterPayment?: () => void;
  onViewStudents?: () => void;
}

const RevenueProgressCard: React.FC<RevenueProgressCardProps> = ({
  currentAmount = 14870,
  goalAmount = 16000,
  onRegisterPayment,
  onViewStudents,
}) => {
  const navigate = useNavigate();

  const percentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);

  const handleRegisterPayment = onRegisterPayment || (() => navigate('/registrar-pago'));
  const handleViewStudents = onViewStudents || (() => navigate('/alumnos'));

  const formatCurrency = (amount: number) => {
    return `S/ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Card className="lg:col-span-2 rounded-3xl border border-white/5 bg-slate-900/20 shadow-xl backdrop-blur-xl flex flex-col justify-between min-h-[350px]">
      <CardHeader className="p-6 sm:p-8 pb-0">
        <CardTitle className="text-xl font-bold text-white tracking-tight">
          Progreso de Recaudación Mensual
        </CardTitle>
        <CardDescription className="text-slate-400 text-xs mt-1">
          Meta del mes actual: {formatCurrency(goalAmount)}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 pt-0 flex flex-col justify-between flex-1">
        {/* Simple and elegant chart simulation */}
        <div className="my-6 space-y-4">
          <div className="flex justify-between text-sm font-semibold text-slate-300">
            <span>Recaudado ({percentage}%)</span>
            <span>{formatCurrency(currentAmount)} / {formatCurrency(goalAmount)}</span>
          </div>
          <div className="w-full h-4 bg-slate-950 border border-white/5 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full animate-pulse" 
              style={{ width: `${percentage}%` }} 
            />
          </div>
          <div className="grid grid-cols-3 text-center text-3xs text-slate-500 font-bold uppercase tracking-wider mt-2">
            <div className="text-left">Inicio de Mes</div>
            <div>Mitad de Mes</div>
            <div className="text-right">Meta</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-6">
          <Button
            onClick={handleRegisterPayment}
            className="flex-1 py-3 h-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
          >
            💵 Registrar Nuevo Pago
          </Button>
          <Button
            onClick={handleViewStudents}
            variant="outline"
            className="flex-1 py-3 h-auto bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-200 hover:text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            👥 Ver Listado de Alumnos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueProgressCard;
