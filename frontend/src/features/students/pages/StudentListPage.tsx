import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentFilters from '@/features/students/components/StudentFilters';
import StudentTable from '@/features/students/components/StudentTable';
import EnrollStudentModal from '@/features/students/components/EnrollStudentModal';
import PaymentHistoryModal from '@/features/students/components/PaymentHistoryModal';
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { useSchoolStore } from '@/store/useSchoolStore';
import type { SchoolStudent, SchoolPension, SchoolPayment } from '@/store/useSchoolStore';
import type { Apoderado } from '@/types';

const StudentListPage: React.FC = () => {
  const navigate = useNavigate();

  // Zustand Store
  const students = useSchoolStore((state) => state.students);
  const pensions = useSchoolStore((state) => state.pensions);
  const payments = useSchoolStore((state) => state.payments);
  const grades = useSchoolStore((state) => state.grades);
  const addStudent = useSchoolStore((state) => state.addStudent);

  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState<SchoolStudent | null>(null);

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.nombres} ${student.apellidos}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || student.dni.includes(searchTerm);
    const matchesGrade = gradeFilter === '' || student.grado === gradeFilter;
    const matchesStatus = statusFilter === '' || student.estado === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleRegisterStudent = (studentData: {
    nombres: string;
    apellidos: string;
    dni: string;
    grado: string;
    seccion: string;
    apoderado: Apoderado | null;
  }) => {
    addStudent(studentData);
    setIsModalOpen(false);
  };

  const handleOpenHistory = (student: SchoolStudent) => {
    setSelectedStudentForHistory(student);
    setIsHistoryModalOpen(true);
  };

  const handlePay = (studentId: string) => {
    navigate('/registrar-pago', { state: { studentId } });
  };

  const handleViewReceipt = (pension: SchoolPension, payment: SchoolPayment | undefined) => {
    setIsHistoryModalOpen(false);
    navigate(`/recibo/${payment?.id || 'simulated'}`, {
      state: {
        studentId: selectedStudentForHistory?.id,
        conceptId: pension.mes,
        monto: pension.monto.toFixed(2),
        metodoPago: payment?.metodoPago || 'YAPE',
        codigoOperacion: payment?.codigoOperacion || '000000',
      }
    });
  };

  const handlePayPension = () => {
    setIsHistoryModalOpen(false);
    navigate('/registrar-pago', { state: { studentId: selectedStudentForHistory?.id } });
  };

  return (
    <div className="space-y-6 relative animate-fade-in">
      {/* Header section */}
      <PageHeader
        title="Gestión de Alumnos"
        description="Busca, filtra y gestiona el estado de pensiones de los estudiantes."
        action={
          <Button
            onClick={() => setIsModalOpen(true)}
            className="py-3 px-5 h-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center gap-2 cursor-pointer"
          >
            ➕ Agregar Alumno
          </Button>
        }
      />

      {/* Filters Bar */}
      <StudentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        grades={grades}
      />

      {/* Students Data Table */}
      <StudentTable
        filteredStudents={filteredStudents}
        onOpenHistory={handleOpenHistory}
        onPay={handlePay}
      />

      {/* Modal: Registrar Alumno */}
      <EnrollStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        grades={grades}
        onRegister={handleRegisterStudent}
      />

      {/* Modal: Historial de Pagos de Alumno */}
      <PaymentHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        student={selectedStudentForHistory}
        pensions={pensions}
        payments={payments}
        onViewReceipt={handleViewReceipt}
        onPayPension={handlePayPension}
      />
    </div>
  );
};

export default StudentListPage;
