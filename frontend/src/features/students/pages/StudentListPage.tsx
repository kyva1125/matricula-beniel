import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../../../components/common/StatusBadge';

// Initial Mock list of students
const initialStudents = [
  { id: 'std-001', nombres: 'Mateo', apellidos: 'Ledesma', dni: '71234567', grado: '5to Primaria', seccion: 'A', apoderado: 'Juan Ledesma', estado: 'PAGADO' },
  { id: 'std-002', nombres: 'Sofia', apellidos: 'Rodriguez', dni: '72345678', grado: '3ro Primaria', seccion: 'B', apoderado: 'Maria Rodriguez', estado: 'PAGADO' },
  { id: 'std-003', nombres: 'Thiago', apellidos: 'Quispe', dni: '73456789', grado: '1er Secundaria', seccion: 'A', apoderado: null, estado: 'PENDIENTE' }, // Autofinanciado (Academia)
  { id: 'std-004', nombres: 'Camila', apellidos: 'Flores', dni: '74567890', grado: '4to Primaria', seccion: 'A', apoderado: 'Luis Flores', estado: 'VENCIDO' },
  { id: 'std-005', nombres: 'Lucas', apellidos: 'Gomez', dni: '75678901', grado: '2do Secundaria', seccion: 'B', apoderado: null, estado: 'PAGADO' }, // Autofinanciado (Academia)
];

const StudentListPage: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [grado, setGrado] = useState('3ro Primaria');
  const [seccion, setSeccion] = useState('A');
  const [apoderado, setApoderado] = useState('');

  // Filter students based on search term, grade and payment status
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.nombres} ${student.apellidos}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || student.dni.includes(searchTerm);
    const matchesGrade = gradeFilter === '' || student.grado === gradeFilter;
    const matchesStatus = statusFilter === '' || student.estado === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleOpenModal = () => {
    // Reset form states
    setNombres('');
    setApellidos('');
    setDni('');
    setGrado('3ro Primaria');
    setSeccion('A');
    setApoderado('');
    setIsModalOpen(true);
  };

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();

    // DNI validation (exactly 8 digits)
    if (!/^\d{8}$/.test(dni)) {
      alert('El DNI debe tener exactamente 8 dígitos numéricos.');
      return;
    }

    const newStudent = {
      id: `std-${Math.floor(Math.random() * 9000) + 1000}`,
      nombres,
      apellidos,
      dni,
      grado,
      seccion,
      apoderado: apoderado.trim() === '' ? null : apoderado.trim(),
      estado: 'PENDIENTE', // Default status for newly enrolled student
    };

    setStudents([newStudent, ...students]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Gestión de Alumnos</h2>
          <p className="text-slate-400 text-sm mt-1">Busca, filtra y gestiona el estado de pensiones de los estudiantes.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="self-start sm:self-auto py-3 px-5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center gap-2"
        >
          ➕ Agregar Alumno
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-900/30 border border-white/5 rounded-2xl backdrop-blur-xl">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar por Nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
          />
        </div>

        <div>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
          >
            <option value="">Todos los Grados</option>
            <option value="3ro Primaria">3ro Primaria</option>
            <option value="4to Primaria">4to Primaria</option>
            <option value="5to Primaria">5to Primaria</option>
            <option value="1er Secundaria">1er Secundaria</option>
            <option value="2do Secundaria">2do Secundaria</option>
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
      </div>

      {/* Students Data Table */}
      <div className="p-6 bg-slate-900/20 border border-white/5 rounded-3xl backdrop-blur-xl shadow-xl overflow-x-auto">
        {filteredStudents.length > 0 ? (
          <table className="w-full text-left border-collapse text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 pb-4 text-slate-400">
                <th className="pb-4 font-bold uppercase tracking-wider text-2xs">Alumno</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-2xs">DNI</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-2xs">Grado y Sección</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-2xs">Apoderado (Responsable)</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-2xs">Estado de Pensión</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-2xs text-center">Acciones</th>
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
                      <span className="text-slate-300 text-xs font-medium">{student.apoderado}</span>
                    ) : (
                      <span className="py-0.5 px-2 bg-indigo-500/10 text-indigo-400 rounded-md font-bold text-3xs uppercase tracking-wider border border-indigo-500/20">
                        👤 Autofinanciado (Academia)
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <StatusBadge status={student.estado} />
                  </td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => navigate('/registrar-pago', { state: { studentId: student.id } })}
                      className="py-1.5 px-3 bg-indigo-600/10 hover:bg-indigo-600 active:bg-indigo-700 text-indigo-400 hover:text-white font-semibold text-2xs rounded-xl border border-indigo-500/20 hover:border-transparent transition-all"
                    >
                      💸 Pagar Pensión
                    </button>
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
      </div>

      {/* Reusable Modal Component inline for layout speed and coherence */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">Registrar Nuevo Alumno</h3>
            <p className="text-slate-400 text-xs mb-6">Ingresa los datos del estudiante. Si es autofinanciado, deja vacío el responsable.</p>

            <form onSubmit={handleRegisterStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">Nombres</label>
                  <input
                    type="text"
                    required
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    placeholder="Ej. Mateo"
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">Apellidos</label>
                  <input
                    type="text"
                    required
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    placeholder="Ej. Ledesma"
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">DNI (Documento de Identidad)</label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{8}"
                  maxLength={8}
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ej. 71234567"
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">Grado</label>
                  <select
                    value={grado}
                    onChange={(e) => setGrado(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                  >
                    <option value="3ro Primaria">3ro Primaria</option>
                    <option value="4to Primaria">4to Primaria</option>
                    <option value="5to Primaria">5to Primaria</option>
                    <option value="1er Secundaria">1er Secundaria</option>
                    <option value="2do Secundaria">2do Secundaria</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest">Sección</label>
                  <select
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-widest font-sans">
                  Apoderado / Responsable (Opcional)
                </label>
                <input
                  type="text"
                  value={apoderado}
                  onChange={(e) => setApoderado(e.target.value)}
                  placeholder="Dejar vacío si el alumno se autofinancia"
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-xs font-semibold"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/5 text-slate-300 hover:text-white text-xs font-bold rounded-2xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/10"
                >
                  Registrar Alumno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;
