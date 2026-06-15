import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Grade {
  id: string;
  nombre: string;
  secciones: string[];
}

interface GradeItemCardProps {
  grade: Grade;
  onDeleteGrade: (id: string) => void;
  onDeleteSection: (gradeId: string, section: string) => void;
  onAddSection: (gradeId: string, sectionLetter: string) => void;
}

const GradeItemCard: React.FC<GradeItemCardProps> = ({
  grade,
  onDeleteGrade,
  onDeleteSection,
  onAddSection,
}) => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionLetter, setNewSectionLetter] = useState('');

  const handleAddSectionSubmit = () => {
    if (!newSectionLetter.trim()) return;
    const letter = newSectionLetter.trim().toUpperCase();
    onAddSection(grade.id, letter);
    setNewSectionLetter('');
    setIsAddingSection(false);
  };

  return (
    <Card 
      className="p-5 bg-slate-900/20 border border-white/5 hover:border-white/10 rounded-3xl backdrop-blur-xl shadow-xl transition-all flex flex-col justify-between group"
    >
      <CardContent className="p-0 flex flex-col justify-between h-full">
        <div>
          {/* Top: title & delete */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-md font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                {grade.nombre}
              </h4>
              <p className="text-slate-500 text-3xs font-bold uppercase tracking-wider mt-0.5">
                {grade.secciones.length} {grade.secciones.length === 1 ? 'Sección' : 'Secciones'}
              </p>
            </div>
            <button
              onClick={() => onDeleteGrade(grade.id)}
              className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-all text-xs"
              title="Eliminar Grado"
            >
              🗑️
            </button>
          </div>

          {/* Body: list of sections badge */}
          <div className="flex flex-wrap gap-2 mb-4">
            {grade.secciones.map((sec) => (
              <div 
                key={sec} 
                className="bg-slate-950/80 border border-white/5 pl-2.5 pr-1.5 py-1 rounded-xl text-2xs font-bold text-slate-300 flex items-center gap-1.5 group/sec"
              >
                <span>Sección {sec}</span>
                <button
                  onClick={() => onDeleteSection(grade.id, sec)}
                  className="w-4 h-4 rounded-md flex items-center justify-center text-4xs hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                  title="Eliminar Sección"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Quick add section form */}
        <div className="border-t border-white/5 pt-3 mt-auto">
          {isAddingSection ? (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                maxLength={2}
                value={newSectionLetter}
                onChange={(e) => setNewSectionLetter(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                placeholder="Ej. C"
                className="flex-1 px-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-white outline-none focus:border-indigo-500 text-xs font-semibold h-8"
                autoFocus
              />
              <Button
                onClick={handleAddSectionSubmit}
                className="px-3 h-8 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-500 active:bg-indigo-700 transition-colors"
              >
                Aceptar
              </Button>
              <Button
                onClick={() => {
                  setIsAddingSection(false);
                  setNewSectionLetter('');
                }}
                variant="outline"
                className="px-2.5 h-8 bg-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-lg transition-colors border-none"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsAddingSection(true);
                setNewSectionLetter('');
              }}
              className="w-full py-2 bg-slate-950/40 hover:bg-indigo-600/10 text-slate-400 hover:text-indigo-400 font-semibold text-2xs rounded-xl border border-dashed border-slate-850 hover:border-indigo-500/20 transition-all flex items-center justify-center gap-1"
            >
              ➕ Agregar Sección
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeItemCard;
