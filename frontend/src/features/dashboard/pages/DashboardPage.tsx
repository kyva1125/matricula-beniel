import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useAuth } from '../../../context/AuthContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Calculate remaining days for the 7-day free trial
  let trialDaysLeft: number | null = null;
  if (user?.trialStartedAt) {
    const start = new Date(user.trialStartedAt);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in ms
    const diffTime = end.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    trialDaysLeft = diffDays > 0 ? diffDays : 0;
  }

  // Mock data for recent transactions
  const recentPayments = [
    { id: 'pay-001', student: 'Mateo Ledesma', amount: 'S/ 350.00', method: 'YAPE', date: 'Hoy, 10:15 AM', status: 'PAGADO' },
    { id: 'pay-002', student: 'Sofia Rodriguez', amount: 'S/ 350.00', method: 'PLIN', date: 'Hoy, 09:30 AM', status: 'PAGADO' },
    { id: 'pay-003', student: 'Thiago Quispe', amount: 'S/ 420.00', method: 'TRANSFERENCIA', date: 'Ayer, 06:12 PM', status: 'PAGADO' },
    { id: 'pay-004', student: 'Camila Flores', amount: 'S/ 350.00', method: 'EFECTIVO', date: 'Ayer, 03:45 PM', status: 'PAGADO' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Resumen Financiero</h2>
          <p className="text-slate-400 text-sm mt-1">Monitoreo de recaudaciones, morosidad y transacciones escolares.</p>
        </div>
        {user?.institucion && (
          <span className="text-3xs font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
            🏫 {user.institucion}
          </span>
        )}
      </div>

      {/* 🌟 7-Day Trial Active Banner */}
      {trialDaysLeft !== null && (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-2xl text-xs font-semibold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🌟</span>
            <span>
              <strong>Período de Prueba Activo:</strong> Te quedan <strong className="text-white">{trialDaysLeft} días</strong> de prueba gratuita. Actualiza tu plan para no perder acceso a la gestión de cobranza.
            </span>
          </div>
          <button className="py-2 px-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl transition-colors text-3xs font-extrabold uppercase tracking-wider shadow-md shadow-indigo-600/15 whitespace-nowrap self-stretch sm:self-auto text-center">
            Actualizar Plan
          </button>
        </div>
      )}

      {/* Metrics Row using extracted StatCard component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Recaudado"
          value="S/ 14,870.00"
          trend="+15% respecto al mes anterior"
          isPositive={true}
          icon="💰"
        />
        <StatCard
          title="Morosidad Activa"
          value="7.8%"
          trend="-2.4% este mes"
          isPositive={true}
          icon="📈"
        />
        <StatCard
          title="Alumnos al Día"
          value="94 / 102"
          trend="92.1% de la matrícula total"
          isPositive={true}
          icon="🎓"
        />
        <StatCard
          title="Pensiones Pendientes"
          value="8"
          trend="Vencen en los próximos 5 días"
          isPositive={false}
          icon="⏳"
        />
      </div>

      {/* Main Grid: Graph Simulation and Recent Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Goal Indicator Card */}
        <div className="lg:col-span-2 p-6 sm:p-8 bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Progreso de Recaudación Mensual</h3>
            <p className="text-slate-400 text-xs mt-1">Meta del mes actual: S/ 16,000.00</p>
          </div>

          {/* Simple and elegant chart simulation */}
          <div className="my-6 space-y-4">
            <div className="flex justify-between text-sm font-semibold text-slate-300">
              <span>Recaudado (93%)</span>
              <span>S/ 14,870.00 / S/ 16,000.00</span>
            </div>
            <div className="w-full h-4 bg-slate-950 border border-white/5 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full animate-pulse" style={{ width: '93%' }} />
            </div>
            <div className="grid grid-cols-3 text-center text-3xs text-slate-500 font-bold uppercase tracking-wider mt-2">
              <div className="text-left">Inicio de Mes</div>
              <div>Mitad de Mes</div>
              <div className="text-right">Meta</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-6">
            <button
              onClick={() => navigate('/registrar-pago')}
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
            >
              💵 Registrar Nuevo Pago
            </button>
            <button
              onClick={() => navigate('/alumnos')}
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-200 hover:text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              👥 Ver Listado de Alumnos
            </button>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="p-6 bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Abonos Recientes</h3>
            <p className="text-slate-400 text-xs mt-1">Últimos movimientos validados.</p>
          </div>

          <div className="my-6 space-y-4 flex-1 overflow-y-auto max-h-[220px] pr-1">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                onClick={() => navigate(`/recibo/${payment.id}`)}
                className="group flex justify-between items-center p-3 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 rounded-2xl transition-all cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {payment.student}
                  </p>
                  <p className="text-3xs text-slate-500 mt-0.5">{payment.date} • <span className="font-semibold text-slate-400">{payment.method}</span></p>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className="text-xs font-extrabold text-white">{payment.amount}</span>
                  <StatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/alumnos')}
            className="w-full py-2.5 px-4 bg-transparent hover:bg-slate-900/30 active:bg-slate-900/60 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/30 text-xs font-bold rounded-xl transition-all"
          >
            Ver Historial Completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
