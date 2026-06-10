import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  icon: string;
  subtitle: string;
}

const CustomCardComponent: React.FC<Props> = ({ title, icon, subtitle }) => {
  return (
    <Card className="p-6 bg-slate-900/30 border border-white/5 rounded-3xl backdrop-blur-xl shadow-md flex flex-col justify-start">
      <CardContent className="p-0 space-y-3">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomCardComponent;
