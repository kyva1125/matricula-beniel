import React from 'react';

interface StatusBadgeProps {
  status: 'PAGADO' | 'PENDIENTE' | 'VENCIDO' | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgClass = 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  let label = status;

  if (status === 'PAGADO') {
    bgClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    label = 'PAGADO';
  } else if (status === 'PENDIENTE') {
    bgClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    label = 'PENDIENTE';
  } else if (status === 'VENCIDO') {
    bgClass = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    label = 'VENCIDO';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-extrabold uppercase tracking-wider border ${bgClass}`}>
      {label}
    </span>
  );
};
