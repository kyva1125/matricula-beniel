import { ILogRepository } from '../log-repository.interface';
import { LogEntity } from '../../entities/log.entity';
import { HydratedDocument } from 'mongoose';
import { LogModel, ILog } from '../../models/log.model';

export class MongoLogRepository implements ILogRepository {
  // Traduce el documento de base de datos (Mongoose) a nuestra Entidad del Dominio
  private toDomain(doc: HydratedDocument<ILog>): LogEntity {
    return new LogEntity(
      doc._id.toString(),
      doc.accion,
      doc.detalle,
      doc.ipAddress,
      doc.userAgent,
      doc.fecha,
      doc.usuarioId
    );
  }

  // Guarda la entidad pura en la colección MongoDB
  async save(log: LogEntity): Promise<LogEntity> {
    const logDoc = new LogModel({
      accion: log.accion,
      detalle: log.detalle,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      fecha: log.fecha,
      usuarioId: log.usuarioId,
    });

    const savedDoc = await logDoc.save();
    return this.toDomain(savedDoc);
  }

  // Obtiene el log por ID y lo traduce al dominio
  async getById(id: string): Promise<LogEntity | null> {
    const foundDoc = await LogModel.findById(id);
    if (!foundDoc) return null;
    return this.toDomain(foundDoc);
  }

  // Obtiene todos los logs ordenados por fecha descendente
  async getAll(): Promise<LogEntity[]> {
    const docs = await LogModel.find().sort({ fecha: -1 });
    return docs.map(doc => this.toDomain(doc));
  }
}
