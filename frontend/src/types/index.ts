export interface User {
  id: string;
  nombre: string;
  correo: string;
  rol: 'estudiante' | 'profesor' | 'administrador' | 'apoderado';
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
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
