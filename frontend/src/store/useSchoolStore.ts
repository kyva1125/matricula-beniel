import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Grade, Apoderado } from '@/types';

export interface SchoolStudent {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  grado: string;
  seccion: string;
  apoderado?: Apoderado | null;
  estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO';
}

export interface SchoolPension {
  id: string;
  alumnoId: string;
  mes: string;
  monto: number;
  fechaVencimiento: string;
  estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO';
}

export interface SchoolPayment {
  id: string;
  pensionId: string;
  montoPagado: number;
  metodoPago: 'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO';
  codigoOperacion: string;
  fechaPago: string;
}

interface SchoolState {
  grades: Grade[];
  students: SchoolStudent[];
  pensions: SchoolPension[];
  payments: SchoolPayment[];

  // Actions
  addGrade: (nombre: string, secciones: string[]) => void;
  deleteGrade: (id: string) => void;
  addSection: (gradeId: string, sectionLetter: string) => void;
  deleteSection: (gradeId: string, section: string) => void;
  
  addStudent: (studentData: {
    nombres: string;
    apellidos: string;
    dni: string;
    grado: string;
    seccion: string;
    apoderado: Apoderado | null;
  }) => void;

  registerPayment: (data: {
    studentId: string;
    conceptId: string; // matches pension.mes or pension.id
    monto: string;
    metodoPago: 'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO';
    codigoOperacion: string;
  }) => string;
}

const DEFAULT_GRADES: Grade[] = [
  { id: 'grd-1', nombre: '3ro Primaria', secciones: ['A', 'B'] },
  { id: 'grd-2', nombre: '4to Primaria', secciones: ['A'] },
  { id: 'grd-3', nombre: '5to Primaria', secciones: ['A', 'B', 'C'] },
  { id: 'grd-4', nombre: '1er Secundaria', secciones: ['A', 'B'] },
  { id: 'grd-5', nombre: '2do Secundaria', secciones: ['A', 'B'] },
];

const DEFAULT_STUDENTS: SchoolStudent[] = [
  { 
    id: 'std-001', 
    nombres: 'Mateo', 
    apellidos: 'Ledesma', 
    dni: '71234567', 
    grado: '5to Primaria', 
    seccion: 'A', 
    apoderado: { nombres: 'Juan', apellidos: 'Ledesma', dni: '08765432', fechaNacimiento: '1985-05-12' }, 
    estado: 'PAGADO' 
  },
  { 
    id: 'std-002', 
    nombres: 'Sofia', 
    apellidos: 'Rodriguez', 
    dni: '72345678', 
    grado: '3ro Primaria', 
    seccion: 'B', 
    apoderado: { nombres: 'Maria', apellidos: 'Rodriguez', dni: '09876543', fechaNacimiento: '1988-08-20' }, 
    estado: 'PAGADO' 
  },
  { 
    id: 'std-003', 
    nombres: 'Thiago', 
    apellidos: 'Quispe', 
    dni: '73456789', 
    grado: '1er Secundaria', 
    seccion: 'A', 
    apoderado: null, 
    estado: 'PENDIENTE' 
  },
  { 
    id: 'std-004', 
    nombres: 'Camila', 
    apellidos: 'Flores', 
    dni: '74567890', 
    grado: '4to Primaria', 
    seccion: 'A', 
    apoderado: { nombres: 'Luis', apellidos: 'Flores', dni: '01234567', fechaNacimiento: '1982-11-30' }, 
    estado: 'VENCIDO' 
  },
  { 
    id: 'std-005', 
    nombres: 'Lucas', 
    apellidos: 'Gomez', 
    dni: '75678901', 
    grado: '2do Secundaria', 
    seccion: 'B', 
    apoderado: null, 
    estado: 'PAGADO' 
  },
];

const DEFAULT_PENSIONS: SchoolPension[] = [
  { id: 'pen-101', alumnoId: 'std-001', mes: 'Matrícula', monto: 200, fechaVencimiento: '2026-03-01', estado: 'PAGADO' },
  { id: 'pen-102', alumnoId: 'std-001', mes: 'Marzo', monto: 350, fechaVencimiento: '2026-03-31', estado: 'PAGADO' },
  { id: 'pen-103', alumnoId: 'std-001', mes: 'Abril', monto: 350, fechaVencimiento: '2026-04-30', estado: 'PAGADO' },
  { id: 'pen-104', alumnoId: 'std-001', mes: 'Mayo', monto: 350, fechaVencimiento: '2026-05-31', estado: 'PAGADO' },

  { id: 'pen-201', alumnoId: 'std-002', mes: 'Matrícula', monto: 200, fechaVencimiento: '2026-03-01', estado: 'PAGADO' },
  { id: 'pen-202', alumnoId: 'std-002', mes: 'Marzo', monto: 350, fechaVencimiento: '2026-03-31', estado: 'PAGADO' },
  { id: 'pen-203', alumnoId: 'std-002', mes: 'Abril', monto: 350, fechaVencimiento: '2026-04-30', estado: 'PAGADO' },
  { id: 'pen-204', alumnoId: 'std-002', mes: 'Mayo', monto: 350, fechaVencimiento: '2026-05-31', estado: 'PAGADO' },

  { id: 'pen-301', alumnoId: 'std-003', mes: 'Matrícula', monto: 250, fechaVencimiento: '2026-03-01', estado: 'PAGADO' },
  { id: 'pen-302', alumnoId: 'std-003', mes: 'Marzo', monto: 420, fechaVencimiento: '2026-03-31', estado: 'PAGADO' },
  { id: 'pen-303', alumnoId: 'std-003', mes: 'Abril', monto: 420, fechaVencimiento: '2026-04-30', estado: 'PENDIENTE' },
  { id: 'pen-304', alumnoId: 'std-003', mes: 'Mayo', monto: 420, fechaVencimiento: '2026-05-31', estado: 'PENDIENTE' },

  { id: 'pen-401', alumnoId: 'std-004', mes: 'Matrícula', monto: 200, fechaVencimiento: '2026-03-01', estado: 'PAGADO' },
  { id: 'pen-402', alumnoId: 'std-004', mes: 'Marzo', monto: 350, fechaVencimiento: '2026-03-31', estado: 'PAGADO' },
  { id: 'pen-403', alumnoId: 'std-004', mes: 'Abril', monto: 350, fechaVencimiento: '2026-04-30', estado: 'VENCIDO' },
  { id: 'pen-404', alumnoId: 'std-004', mes: 'Mayo', monto: 350, fechaVencimiento: '2026-05-31', estado: 'PENDIENTE' },

  { id: 'pen-501', alumnoId: 'std-005', mes: 'Matrícula', monto: 250, fechaVencimiento: '2026-03-01', estado: 'PAGADO' },
  { id: 'pen-502', alumnoId: 'std-005', mes: 'Marzo', monto: 420, fechaVencimiento: '2026-03-31', estado: 'PAGADO' },
  { id: 'pen-503', alumnoId: 'std-005', mes: 'Abril', monto: 420, fechaVencimiento: '2026-04-30', estado: 'PAGADO' },
  { id: 'pen-504', alumnoId: 'std-005', mes: 'Mayo', monto: 420, fechaVencimiento: '2026-05-31', estado: 'PAGADO' },
];

const DEFAULT_PAYMENTS: SchoolPayment[] = [
  { id: 'pay-101', pensionId: 'pen-101', montoPagado: 200, metodoPago: 'EFECTIVO', codigoOperacion: 'OP-001', fechaPago: '2026-02-28' },
  { id: 'pay-102', pensionId: 'pen-102', montoPagado: 350, metodoPago: 'YAPE', codigoOperacion: 'YAP-98213', fechaPago: '2026-03-29' },
  { id: 'pay-103', pensionId: 'pen-103', montoPagado: 350, metodoPago: 'PLIN', codigoOperacion: 'PLN-2311', fechaPago: '2026-04-28' },
  { id: 'pay-104', pensionId: 'pen-104', montoPagado: 350, metodoPago: 'TRANSFERENCIA', codigoOperacion: 'TX-883219', fechaPago: '2026-05-30' },

  { id: 'pay-201', pensionId: 'pen-201', montoPagado: 200, metodoPago: 'EFECTIVO', codigoOperacion: 'OP-002', fechaPago: '2026-02-28' },
  { id: 'pay-202', pensionId: 'pen-202', montoPagado: 350, metodoPago: 'YAPE', codigoOperacion: 'YAP-98214', fechaPago: '2026-03-30' },
  { id: 'pay-203', pensionId: 'pen-203', montoPagado: 350, metodoPago: 'PLIN', codigoOperacion: 'PLN-2312', fechaPago: '2026-04-29' },
  { id: 'pay-204', pensionId: 'pen-204', montoPagado: 350, metodoPago: 'TRANSFERENCIA', codigoOperacion: 'TX-883220', fechaPago: '2026-05-29' },

  { id: 'pay-301', pensionId: 'pen-301', montoPagado: 250, metodoPago: 'YAPE', codigoOperacion: 'YAP-11223', fechaPago: '2026-02-27' },
  { id: 'pay-302', pensionId: 'pen-302', montoPagado: 420, metodoPago: 'TRANSFERENCIA', codigoOperacion: 'TX-998822', fechaPago: '2026-03-29' },

  { id: 'pay-401', pensionId: 'pen-401', montoPagado: 200, metodoPago: 'PLIN', codigoOperacion: 'PLN-8877', fechaPago: '2026-02-25' },
  { id: 'pay-402', pensionId: 'pen-402', montoPagado: 350, metodoPago: 'YAPE', codigoOperacion: 'YAP-44331', fechaPago: '2026-03-28' },

  { id: 'pay-501', pensionId: 'pen-501', montoPagado: 250, metodoPago: 'EFECTIVO', codigoOperacion: 'OP-005', fechaPago: '2026-02-28' },
  { id: 'pay-502', pensionId: 'pen-502', montoPagado: 420, metodoPago: 'YAPE', codigoOperacion: 'YAP-12345', fechaPago: '2026-03-29' },
  { id: 'pay-503', pensionId: 'pen-503', montoPagado: 420, metodoPago: 'PLIN', codigoOperacion: 'PLN-54321', fechaPago: '2026-04-28' },
  { id: 'pay-504', pensionId: 'pen-504', montoPagado: 420, metodoPago: 'TRANSFERENCIA', codigoOperacion: 'TX-13579', fechaPago: '2026-05-30' },
];

export const useSchoolStore = create<SchoolState>()(
  persist(
    (set, get) => ({
      
      grades: DEFAULT_GRADES,
      students: DEFAULT_STUDENTS,
      pensions: DEFAULT_PENSIONS,
      payments: DEFAULT_PAYMENTS,

      addGrade: (nombre, secciones) => set((state) => ({
        grades: [...state.grades, {
          id: `grd-${Math.floor(Math.random() * 9000) + 1000}`,
          nombre,
          secciones,
        }]
      })),

      deleteGrade: (id) => set((state) => ({
        grades: state.grades.filter(g => g.id !== id)
      })),

      addSection: (gradeId, sectionLetter) => set((state) => ({
        grades: state.grades.map(g => {
          if (g.id === gradeId) {
            if (g.secciones.includes(sectionLetter)) {
              return g;
            }
            return {
              ...g,
              secciones: [...g.secciones, sectionLetter].sort(),
            };
          }
          return g;
        })
      })),

      deleteSection: (gradeId, section) => set((state) => ({
        grades: state.grades.map(g => {
          if (g.id === gradeId) {
            if (g.secciones.length <= 1) {
              return g;
            }
            return {
              ...g,
              secciones: g.secciones.filter(s => s !== section),
            };
          }
          return g;
        })
      })),

      addStudent: (studentData) => set((state) => {
        const newStudentId = `std-${Math.floor(Math.random() * 9000) + 1000}`;
        const newStudent: SchoolStudent = {
          id: newStudentId,
          nombres: studentData.nombres,
          apellidos: studentData.apellidos,
          dni: studentData.dni,
          grado: studentData.grado,
          seccion: studentData.seccion,
          apoderado: studentData.apoderado,
          estado: 'PENDIENTE',
        };

        const newPensions: SchoolPension[] = [
          { id: `pen-${Math.floor(Math.random() * 9000) + 1000}`, alumnoId: newStudentId, mes: 'Matrícula', monto: 200, fechaVencimiento: '2026-03-01', estado: 'PENDIENTE' },
          { id: `pen-${Math.floor(Math.random() * 9000) + 1000}`, alumnoId: newStudentId, mes: 'Marzo', monto: 350, fechaVencimiento: '2026-03-31', estado: 'PENDIENTE' },
          { id: `pen-${Math.floor(Math.random() * 9000) + 1000}`, alumnoId: newStudentId, mes: 'Abril', monto: 350, fechaVencimiento: '2026-04-30', estado: 'PENDIENTE' },
        ];

        return {
          students: [newStudent, ...state.students],
          pensions: [...state.pensions, ...newPensions],
        };
      }),

      registerPayment: (data) => {
        const newPaymentId = `pay-${Math.floor(Math.random() * 9000) + 1000}`;
        const parsedMonto = parseFloat(data.monto) || 0;

        const currentPions = get().pensions;
        // Find if there is a pension for this student and this month/concept name or pension id
        let targetPension = currentPions.find(p => p.alumnoId === data.studentId && p.mes === data.conceptId);

        if (!targetPension) {
          // If not found, create a new pension to register the payment under
          const newPensionId = `pen-${Math.floor(Math.random() * 9000) + 1000}`;
          targetPension = {
            id: newPensionId,
            alumnoId: data.studentId,
            mes: data.conceptId,
            monto: parsedMonto,
            fechaVencimiento: new Date().toISOString().split('T')[0],
            estado: 'PENDIENTE'
          };
          set((state) => ({ pensions: [...state.pensions, targetPension!] }));
        }

        // Add payment
        const newPayment: SchoolPayment = {
          id: newPaymentId,
          pensionId: targetPension.id,
          montoPagado: parsedMonto,
          metodoPago: data.metodoPago,
          codigoOperacion: data.codigoOperacion,
          fechaPago: new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima' }),
        };

        // Update pension status
        set((state) => {
          const updatedPensions = state.pensions.map(p => {
            if (p.id === targetPension!.id) {
              return { ...p, estado: 'PAGADO' as const };
            }
            return p;
          });

          // Check if student still has pending/overdue pensions
          const studentPensions = updatedPensions.filter(p => p.alumnoId === data.studentId);
          const hasUnpaid = studentPensions.some(p => p.estado !== 'PAGADO');
          const hasOverdue = studentPensions.some(p => p.estado === 'VENCIDO');

          let newStudentStatus: 'PAGADO' | 'PENDIENTE' | 'VENCIDO' = 'PAGADO';
          if (hasOverdue) {
            newStudentStatus = 'VENCIDO';
          } else if (hasUnpaid) {
            newStudentStatus = 'PENDIENTE';
          }

          const updatedStudents = state.students.map(s => {
            if (s.id === data.studentId) {
              return { ...s, estado: newStudentStatus };
            }
            return s;
          });

          return {
            payments: [...state.payments, newPayment],
            pensions: updatedPensions,
            students: updatedStudents,
          };
        });

        return newPaymentId;
      },
    }),
    {
      name: 'school_data_store', // Key for localStorage
    }
  )
);
