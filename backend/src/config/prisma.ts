import { PrismaClient } from '@prisma/client';


import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './env';

const connectionString = env.postgresUrl;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
    adapter,
    log: env.nodeEnv === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
});

export const connectPostgres = async (): Promise<void> => {
    try {
        console.log('🔄 Conectando a PostgreSQL con Prisma...');
        // Probar conexión directa del pool
        await prisma.$queryRaw`SELECT 1`;
        console.log('💙 PostgreSQL conectado exitosamente con Prisma.');
    } catch (error) {
        console.error('💥 Error al conectar a PostgreSQL:', error);
        process.exit(1);
    }
};

export const disconnectPostgres = async (): Promise<void> => {
    await prisma.$disconnect();
    await pool.end();
};
