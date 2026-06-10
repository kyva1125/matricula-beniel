export class UserModel {
  constructor(
    public readonly id: string,
    public businessId: string,
    public nombre: string,
    public correo: string,
    public activo: boolean,
    public fechaCreacion: Date,
    public fechaActualizacion: Date,
    public trialStartedAt: Date | null = null,
    public institucion: string | null = null
  ) {}

  cambiarEstadoActivo(nuevoEstado: boolean): void {
    this.activo = nuevoEstado;
    this.fechaActualizacion = new Date();
  }
}

