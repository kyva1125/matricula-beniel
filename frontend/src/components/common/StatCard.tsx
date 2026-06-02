import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
  icon: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, isPositive = true, icon }) => {
  return (
    <div className="group p-6 bg-slate-900/30 hover:bg-slate-900/40 border border-white/5 hover:border-indigo-500/20 rounded-3xl transition-all duration-300 shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
          <p className="text-3xl font-extrabold text-white mt-2 font-sans tracking-tight">{value}</p>
        </div>
        <div className="text-2xl p-2.5 bg-slate-950/40 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      {trend && (
        <span className={`text-xs font-semibold mt-3 block ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend}
        </span>
      )}
    </div>
  );
};
