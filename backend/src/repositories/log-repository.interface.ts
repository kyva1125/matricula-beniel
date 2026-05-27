import { LogEntity } from '../entities/log.entity';

export interface ILogRepository {
  /**
   * Guarda un nuevo registro de log en el almacenamiento de datos.
   * @param log La entidad pura de log a persistir.
   */
  save(log: LogEntity): Promise<LogEntity>;

  /**
   * Obtiene un registro de log por su identificador único.
   * @param id Identificador único del log.
   */
  getById(id: string): Promise<LogEntity | null>;

  /**
   * Obtiene todos los logs registrados (para auditoría).
   */
  getAll(): Promise<LogEntity[]>;
}
