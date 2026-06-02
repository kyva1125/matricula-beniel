export class UserEntity {
  constructor(
    public readonly id: string,
    public nombre: string,
    public correo: string,
    public rol: 'administrador' | 'apoderado' | 'estudiante',
    public activo: boolean,
    public fechaCreacion: Date,
    public fechaActualizacion: Date
  ) {}

  esAdministrador(): boolean {
    return this.rol === 'administrador';
  }

  esApoderado(): boolean {
    return this.rol === 'apoderado';
  }

  esEstudiante(): boolean {
    return this.rol === 'estudiante';
  }

  cambiarEstadoActivo(nuevoEstado: boolean): void {
    this.activo = nuevoEstado;
    this.fechaActualizacion = new Date();
  }
}
