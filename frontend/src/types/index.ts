export interface User {
  id: string;
  nombre: string;
  correo: string;
  rol: 'estudiante' | 'profesor' | 'administrador';
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  trialStartedAt?: string; // Fecha de inicio de prueba gratuita de 7 días
  institucion?: string;    // Nombre de la institución/colegio
}

export interface Log {
  id: string;
  accion: string;
  detalle: string;
  ipAddress: string;
  userAgent: string;
  fecha: string;
  usuarioId?: string;
}

export interface ApiError {
  status: 'fail' | 'error';
  message: string;
}
