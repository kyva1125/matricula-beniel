export interface Grade {
  id: string;
  nombre: string;
  secciones: string[];
}

export interface Business {
  id: string;
  nombre: string;
  direccion: string;
  ruc?: string;
  telefono?: string;
  fechaCreacion: string;
}

export interface User {
  id: string;
  businessId: string;
  nombre: string;
  correo: string;
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  trialStartedAt?: string; // Para simulación de período de prueba de 7 días
  institucion?: string;    // Nombre de la institución/colegio (para compatibilidad visual de demo)
}

export interface Apoderado {
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
}

export interface Student {
  id: string;
  businessId: string; // Relación directa con el negocio
  nombres: string;
  apellidos: string;
  dni: string;
  grado: string;
  seccion: string;
  apoderado?: Apoderado | null; // Si es null o undefined, el alumno es autofinanciado
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface Pension {
  id: string;
  alumnoId: string;
  mes: string; // "Matricula" | "Marzo" | "Abril" ...
  monto: number;
  fechaVencimiento: string;
  estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO';
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface Payment {
  id: string;
  pensionId: string;
  montoPagado: number;
  metodoPago: 'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO';
  codigoOperacion: string;
  fechaPago: string;
  comprobanteUrl?: string;
  registradoPorId: string;
  fechaCreacion: string;
}

export interface ApiError {
  status: 'fail' | 'error';
  message: string;
}
