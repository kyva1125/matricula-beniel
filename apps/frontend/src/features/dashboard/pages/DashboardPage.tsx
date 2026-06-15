import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useSchoolStore } from "@/store/useSchoolStore";

import CardInfo from "@/features/dashboard/components/CardInfo.tsx";
import TrialBanner from "@/features/dashboard/components/TrialBanner.tsx";
import RevenueProgressCard from "@/features/dashboard/components/RevenueProgressCard.tsx";
import RecentPaymentsCard from "@/features/dashboard/components/RecentPaymentsCard.tsx";
import { AlertTriangle, Clock, Users, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/common/PageHeader";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { payments, students, pensions } = useSchoolStore();

  // Calcular días restantes de la prueba gratuita
  let trialDaysLeft: number | null = null;
  if (user?.trialStartedAt) {
    const start = new Date(user.trialStartedAt);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 días en ms
    const diffTime = end.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    trialDaysLeft = diffDays > 0 ? diffDays : 0;
  }

  // --- CÁLCULO DE MÉTRICAS EN TIEMPO REAL DESDE ZUSTAND ---

  // 1. Total Recaudado (suma de todos los pagos)
  const totalRecaudado = payments.reduce((acc, curr) => acc + curr.montoPagado, 0);
  const totalRecaudadoFormatted = `S/ ${totalRecaudado.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // 2. Pendiente del mes (suma de pensiones PENDIENTES)
  const totalPendiente = pensions
    .filter((p) => p.estado === 'PENDIENTE')
    .reduce((acc, curr) => acc + curr.monto, 0);
  const totalPendienteFormatted = `S/ ${totalPendiente.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  const studentsWithPending = students.filter((s) =>
    pensions.some((p) => p.alumnoId === s.id && p.estado === 'PENDIENTE')
  ).length;
  const pendienteStatus = `${studentsWithPending} Alumno${studentsWithPending === 1 ? '' : 's'}`;

  // 3. Pensiones vencidas (suma de pensiones VENCIDAS)
  const totalVencido = pensions
    .filter((p) => p.estado === 'VENCIDO')
    .reduce((acc, curr) => acc + curr.monto, 0);
  const totalVencidoFormatted = `S/ ${totalVencido.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  const studentsWithVencido = students.filter((s) =>
    pensions.some((p) => p.alumnoId === s.id && p.estado === 'VENCIDO')
  ).length;
  const vencidoStatus = studentsWithVencido > 0 ? `${studentsWithVencido} En Mora` : 'Estable';

  // 4. Alumnos con deuda (estado no PAGADO)
  const studentsWithDebt = students.filter((s) => s.estado !== 'PAGADO').length;

  // 5. Mapear abonos recientes (los últimos 5 pagos)
  const recentPaymentsMapped = [...payments]
    .slice(-5)
    .reverse()
    .map((pay) => {
      const pension = pensions.find((p) => p.id === pay.pensionId);
      const student = students.find((s) => s.id === pension?.alumnoId);
      const studentName = student ? `${student.nombres} ${student.apellidos}` : 'Alumno Desconocido';
      
      return {
        id: pay.id,
        student: studentName,
        amount: `S/ ${pay.montoPagado.toFixed(2)}`,
        method: pay.metodoPago,
        date: pay.fechaPago,
        status: 'PAGADO',
      };
    });

  // 6. Meta mensual (suma total facturada = recaudado + pendiente + vencido)
  const totalFacturado = pensions.reduce((acc, curr) => acc + curr.monto, 0);
  const goalAmount = totalFacturado > 0 ? totalFacturado : 16000;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Introduction */}
      <PageHeader
        title="Resumen Financiero"
        description="Monitoreo de recaudaciones, morosidad y transacciones escolares."
        action={user?.institucion && (
          <Badge variant="outline" className="text-[10px] font-extrabold text-indigo-400 bg-indigo-500/10 border-indigo-500/20 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-indigo-500/15">
            🏫 {user.institucion}
          </Badge>
        )}
      />

      {/* 🌟 7-Day Trial Active Banner */}
      <TrialBanner trialDaysLeft={trialDaysLeft} />

      {/* Metrics Row using extracted StatCard component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardInfo
          icon={Wallet}
          title="Total Recaudado"
          status="+100%"
          value={totalRecaudadoFormatted}
          color="emerald"
        />

        <CardInfo
          icon={Clock}
          title="Pendiente del mes"
          status={pendienteStatus}
          value={totalPendienteFormatted}
          color="blue"
        />

        <CardInfo
          icon={AlertTriangle}
          title="Pensiones vencidas"
          status={vencidoStatus}
          value={totalVencidoFormatted}
          color="rose"
        />

        <CardInfo
          icon={Users}
          title="Alumnos con deuda"
          status="Ver lista"
          value={studentsWithDebt.toString()}
          color="amber"
        />
      </div>

      {/* Main Grid: Graph Simulation and Recent Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Goal Indicator Card */}
        <RevenueProgressCard currentAmount={totalRecaudado} goalAmount={goalAmount} />

        {/* Recent Transactions List */}
        <RecentPaymentsCard payments={recentPaymentsMapped} />
      </div>
    </div>
  );
};

export default DashboardPage;

