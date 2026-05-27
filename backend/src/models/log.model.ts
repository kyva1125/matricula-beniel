import { Schema, model } from 'mongoose';

export interface ILog {
  accion: string;
  detalle: string;
  ipAddress: string;
  userAgent: string;
  fecha: Date;
  usuarioId?: string;
}

const LogSchema = new Schema<ILog>({
  accion: { type: String, required: true },
  detalle: { type: String, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  usuarioId: { type: String }
});

export const LogModel = model<ILog>('Log', LogSchema);
