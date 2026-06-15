import React from 'react';
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'PAGADO' | 'PENDIENTE' | 'VENCIDO' | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colors = 'bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/10';
  if (status === 'PAGADO') colors = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10';
  if (status === 'PENDIENTE') colors = 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10';
  if (status === 'VENCIDO') colors = 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/10';

  return (
    <Badge variant="outline" className={`py-1 px-2.5 rounded-lg border font-bold text-[10px] uppercase tracking-wider ${colors}`}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
