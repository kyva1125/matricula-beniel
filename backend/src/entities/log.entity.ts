export class LogEntity {
  constructor(
    public readonly id: string,
    public accion: string,               // Ej: 'INICIO_SESION', 'REGISTRO', 'MATRICULA_CREADA'
    public detalle: string,              // Información descriptiva adicional
    public ipAddress: string,            // Dirección IP del solicitante
    public userAgent: string,            // Navegador/Dispositivo del solicitante
    public fecha: Date,                  // Cuándo ocurrió el evento
    public usuarioId?: string            // Identificador del usuario involucrado (opcional si es anónimo)
  ) {}

}
