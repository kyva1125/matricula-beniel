export class StudentEntity {
  constructor(
    public readonly id: string,
    public nombres: string,
    public apellidos: string,
    public dni: string,
    public grado: string,
    public seccion: string,
    public apoderadoId: string | null, // null significa autofinanciado (para academias)
    public fechaCreacion: Date,
    public fechaActualizacion: Date
  ) {}

  esAutofinanciado(): boolean {
    return this.apoderadoId === null;
  }

  validarDni(): boolean {
    // El DNI peruano tiene exactamente 8 dígitos numéricos
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(this.dni);
  }

  obtenerNombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }
}
