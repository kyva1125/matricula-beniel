import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Grade {
  id: string;
  nombre: string;
  secciones: string[];
}

interface AddGradeFormProps {
  grades: Grade[];
  onAddGrade: (nombre: string, secciones: string[]) => void;
}

const AddGradeForm: React.FC<AddGradeFormProps> = ({ grades, onAddGrade }) => {
  const [newGradeName, setNewGradeName] = useState('');
  const [newSections, setNewSections] = useState<string[]>(['A']);

  const toggleSectionCheckbox = (letter: string) => {
    if (newSections.includes(letter)) {
      if (newSections.length > 1) {
        setNewSections(newSections.filter(s => s !== letter));
      }
    } else {
      setNewSections([...newSections, letter].sort());
    }
  };

  const handleAddGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGradeName.trim()) return;

    if (grades.some(g => g.nombre.toLowerCase() === newGradeName.trim().toLowerCase())) {
      alert('Este grado ya existe.');
      return;
    }

    onAddGrade(newGradeName.trim(), newSections.length > 0 ? [...newSections] : ['A']);
    setNewGradeName('');
    setNewSections(['A']);
  };

  return (
    <Card className="p-6 bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white">Nuevo Grado</h3>
        <p className="text-slate-400 text-xs mt-1">Crea un nuevo grado e inicialízalo con sus secciones.</p>
      </div>

      <form onSubmit={handleAddGradeSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
            Nombre del Grado
          </Label>
          <Input
            type="text"
            required
            value={newGradeName}
            onChange={(e) => setNewGradeName(e.target.value)}
            placeholder="Ej. 6to Primaria o 5to Secundaria"
            className="w-full px-4 py-6 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
          />
        </div>

        <div className="space-y-2">
          <Label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">
            Secciones Iniciales
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => {
              const isChecked = newSections.includes(letter);
              return (
                <button
                  type="button"
                  key={letter}
                  onClick={() => toggleSectionCheckbox(letter)}
                  className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all ${
                    isChecked
                      ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
          <p className="text-slate-500 text-4xs italic">Selecciona al menos una sección para iniciar el grado.</p>
        </div>

        <Button
          type="submit"
          className="w-full py-3 h-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/10 mt-2"
        >
          ➕ Agregar Grado Académico
        </Button>
      </form>
    </Card>
  );
};

export default AddGradeForm;
