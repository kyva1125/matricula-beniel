// src/repositories/implementations/prisma-log.repository.ts
import { ILogRepository } from '../log-repository.interface';
import { LogEntity } from '../../entities/log.entity';
import { prisma } from '../../config/prisma';

export class PrismaLogRepository implements ILogRepository {

    // Mapeador: Convierte el registro plano de Postgres (Prisma) a nuestra Entidad de Negocio
    private toDomain(record: any): LogEntity {
        return new LogEntity(
            record.id,
            record.accion,
            record.detalle,
            record.ipAddress,
            record.userAgent,
            record.fecha,
            record.usuarioId || undefined
        );
    }

    // Guarda en PostgreSQL usando Prisma
    async save(log: LogEntity): Promise<LogEntity> {
        const created = await prisma.log.create({
            data: {
                accion: log.accion,
                detalle: log.detalle,
                ipAddress: log.ipAddress,
                userAgent: log.userAgent,
                fecha: log.fecha,
                usuarioId: log.usuarioId,
            },
        });

        return this.toDomain(created);
    }

    // Obtiene un log por ID de Postgres
    async getById(id: string): Promise<LogEntity | null> {
        const record = await prisma.log.findUnique({
            where: { id },
        });

        if (!record) return null;
        return this.toDomain(record);
    }

    // Obtiene todos los logs
    async getAll(): Promise<LogEntity[]> {
        const records = await prisma.log.findMany({
            orderBy: { fecha: 'desc' },
        });

        return records.map(record => this.toDomain(record));
    }
}
