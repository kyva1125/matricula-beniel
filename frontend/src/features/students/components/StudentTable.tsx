import React from 'react';
import StatusBadge from './StatusBadge';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Apoderado {
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
}

interface Student {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  grado: string;
  seccion: string;
  apoderado?: Apoderado | null;
  estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO';
}

interface StudentTableProps {
  filteredStudents: Student[];
  onOpenHistory: (student: Student) => void;
  onPay: (studentId: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  filteredStudents,
  onOpenHistory,
  onPay,
}) => {
  return (
    <Card className="bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl">
      <CardContent className="p-6 overflow-x-auto">
        {filteredStudents.length > 0 ? (
          <table className="w-full text-left border-collapse text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 pb-4 text-slate-400">
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Alumno</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">DNI</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Grado y Sección</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Apoderado (Responsable)</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px] text-center">Estado de Pensión</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px] text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/1 transition-colors group">
                  <td className="py-4 font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {student.nombres} {student.apellidos}
                  </td>
                  <td className="py-4 text-slate-300 font-mono text-xs">{student.dni}</td>
                  <td className="py-4 text-slate-300">
                    <span className="bg-slate-950 px-2.5 py-1 rounded-lg text-2xs font-semibold border border-white/5">
                      {student.grado} - {student.seccion}
                    </span>
                  </td>
                  <td className="py-4">
                    {student.apoderado ? (
                      <div className="flex flex-col">
                        <span className="text-slate-300 text-xs font-bold">{student.apoderado.nombres} {student.apoderado.apellidos}</span>
                        <span className="text-slate-500 text-4xs font-semibold">🪪 DNI: {student.apoderado.dni}</span>
                      </div>
                    ) : (
                      <span className="py-0.5 px-2 bg-indigo-500/10 text-indigo-400 rounded-md font-bold text-3xs uppercase tracking-wider border border-indigo-500/20">
                        👤 Autofinanciado (Academia)
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    <StatusBadge status={student.estado} />
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={() => onOpenHistory(student)}
                        variant="outline"
                        className="py-1.5 h-auto px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] rounded-xl border border-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        📋 Historial
                      </Button>
                      {student.estado !== 'PAGADO' && (
                        <Button
                          onClick={() => onPay(student.id)}
                          className="py-1.5 h-auto px-3 bg-indigo-600/10 hover:bg-indigo-600 active:bg-indigo-700 text-indigo-400 hover:text-white font-semibold text-[11px] rounded-xl border border-indigo-500/20 hover:border-transparent transition-all flex items-center gap-1.5"
                        >
                          💸 Pagar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <span className="text-4xl">🔎</span>
            <p className="text-slate-400 text-sm font-semibold">No se encontraron alumnos que coincidan con la búsqueda.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentTable;
