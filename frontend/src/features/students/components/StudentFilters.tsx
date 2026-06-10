import React from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Grade {
  id: string;
  nombre: string;
  secciones: string[];
}

interface StudentFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  gradeFilter: string;
  setGradeFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  grades: Grade[];
}

const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  gradeFilter,
  setGradeFilter,
  statusFilter,
  setStatusFilter,
  grades,
}) => {
  return (
    <Card className="bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl">
      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-sm z-10">
            🔍
          </span>
          <Input
            type="text"
            placeholder="Buscar por Nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
          />
        </div>

        <div>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
          >
            <option value="">Todos los Grados</option>
            {grades.map((g) => (
              <option key={g.id} value={g.nombre}>{g.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
          >
            <option value="">Todos los Estados</option>
            <option value="PAGADO">Pagado</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="VENCIDO">Vencido</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentFilters;
