export class BusinessModel {
  constructor(
    public readonly id: string,
    public nombre: string,
    public direccion: string,
    public ruc: string | null,
    public telefono: string | null,
    public fechaCreacion: Date
  ) {}

  validarRuc(): boolean {
    if (!this.ruc) return false;
    // El RUC peruano tiene 11 dígitos
    const rucRegex = /^\d{11}$/;
    return rucRegex.test(this.ruc);
  }
}
