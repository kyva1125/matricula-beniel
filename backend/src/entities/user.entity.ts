export class UserEntity {
  constructor(
    public readonly id: string,
    public nombre: string,
    public correo: string,
    public rol: 'estudiante' | 'profesor' | 'administrador',
    public activo: boolean,
    public fechaCreacion: Date,
    public fechaActualizacion: Date
  ) {}

  // Ejemplo de lógica de dominio pura
  esAdministrador(): boolean {
    return this.rol === 'administrador';
  }

  // Activa o desactiva al usuario
  cambiarEstadoActivo(nuevoEstado: boolean): void {
    this.activo = nuevoEstado;
    this.fechaActualizacion = new Date();
  }
}
