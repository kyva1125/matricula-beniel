import React from 'react';
import AddGradeForm from '@/features/settings/components/AddGradeForm';
import GradeItemCard from '@/features/settings/components/GradeItemCard';
import { PageHeader } from "@/components/common/PageHeader";
import { useSchoolStore } from '@/store/useSchoolStore';

const GradesConfigPage: React.FC = () => {
  const grades = useSchoolStore((state) => state.grades);
  const addGrade = useSchoolStore((state) => state.addGrade);
  const deleteGrade = useSchoolStore((state) => state.deleteGrade);
  const addSection = useSchoolStore((state) => state.addSection);
  const deleteSection = useSchoolStore((state) => state.deleteSection);

  const handleAddGrade = (nombre: string, secciones: string[]) => {
    addGrade(nombre, secciones);
  };

  const handleDeleteGrade = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este grado? Los alumnos asignados a este grado podrían verse afectados.')) {
      deleteGrade(id);
    }
  };

  const handleAddSection = (gradeId: string, sectionLetter: string) => {
    const grade = grades.find(g => g.id === gradeId);
    if (grade && grade.secciones.includes(sectionLetter)) {
      alert('Esta sección ya existe en este grado.');
      return;
    }
    addSection(gradeId, sectionLetter);
  };

  const handleDeleteSection = (gradeId: string, sectionToDelete: string) => {
    const grade = grades.find(g => g.id === gradeId);
    if (grade && grade.secciones.length <= 1) {
      alert('Un grado debe tener al menos una sección.');
      return;
    }
    deleteSection(gradeId, sectionToDelete);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Estructura del Colegio"
        description="Configura los niveles, grados académicos y secciones correspondientes para el año escolar."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left column: Add new Grade Form */}
        <AddGradeForm grades={grades} onAddGrade={handleAddGrade} />

        {/* Right column: List of Grades and Sections */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white px-1">Grados y Aulas Configurados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grades.map((grade) => (
              <GradeItemCard
                key={grade.id}
                grade={grade}
                onDeleteGrade={handleDeleteGrade}
                onDeleteSection={handleDeleteSection}
                onAddSection={handleAddSection}
              />
            ))}
          </div>

          {grades.length === 0 && (
            <div className="p-8 bg-slate-900/10 border border-white/5 rounded-2xl text-center py-12 text-slate-400 space-y-2">
              <span className="text-4xl">🏫</span>
              <p className="font-semibold text-sm">No hay grados configurados.</p>
              <p className="text-xs text-slate-500">Usa el formulario de la izquierda para registrar el primer grado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradesConfigPage;
