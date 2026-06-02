export class PensionEntity {
  constructor(
    public readonly id: string,
    public alumnoId: string,
    public mes: string, // "Matricula" | "Marzo" | "Abril" ...
    public monto: number,
    public fechaVencimiento: Date,
    public estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO',
    public fechaCreacion: Date,
    public fechaActualizacion: Date
  ) {}

  estaVencida(fechaReferencia: Date = new Date()): boolean {
    if (this.estado === 'PAGADO') return false;
    return fechaReferencia > this.fechaVencimiento;
  }

  marcarComoPagada(): void {
    this.estado = 'PAGADO';
    this.fechaActualizacion = new Date();
  }

  marcarComoVencida(): void {
    this.estado = 'VENCIDO';
    this.fechaActualizacion = new Date();
  }
}
