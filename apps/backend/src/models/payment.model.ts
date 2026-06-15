export class PaymentModel {
  constructor(
    public readonly id: string,
    public pensionId: string,
    public montoPagado: number,
    public metodoPago: 'YAPE' | 'PLIN' | 'TRANSFERENCIA' | 'EFECTIVO',
    public codigoOperacion: string, // Código de transacción bancaria, Yape o Plin
    public registradoPorId: string, // ID del administrador/usuario que registró el pago
    public fechaPago: Date,
    public comprobanteUrl: string | null
  ) {}

  validarCodigoOperacion(): boolean {
    return this.codigoOperacion.trim().length >= 4;
  }

  esPagoDigital(): boolean {
    return this.metodoPago === 'YAPE' || this.metodoPago === 'PLIN' || this.metodoPago === 'TRANSFERENCIA';
  }
}
