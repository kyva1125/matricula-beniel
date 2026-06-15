import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TrialBannerProps {
  trialDaysLeft: number | null;
  onUpgrade?: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ trialDaysLeft, onUpgrade }) => {
  if (trialDaysLeft === null) return null;

  return (
    <Card className="border-indigo-500/20 bg-indigo-500/10 text-indigo-300 rounded-2xl animate-pulse">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs font-semibold">
          <span className="text-base">🌟</span>
          <span>
            <strong>Período de Prueba Activo:</strong> Te quedan <strong className="text-white">{trialDaysLeft} días</strong> de prueba gratuita. Actualiza tu plan para no perder acceso a la gestión de cobranza.
          </span>
        </div>
        <Button
          onClick={onUpgrade}
          className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-3xs font-extrabold uppercase tracking-wider shadow-md shadow-indigo-600/15 whitespace-nowrap self-stretch sm:self-auto"
        >
          Actualizar Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrialBanner;
