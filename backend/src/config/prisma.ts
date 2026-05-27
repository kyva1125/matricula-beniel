import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './environment';

const connectionString = env.databaseUrl || env.postgresUrl || 'postgresql://postgres:ledesma123@localhost:5432/matricula_beniel';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export const connectPostgres = async (): Promise<void> => {
    try {
        console.log('🔄 Conectando a PostgreSQL con Prisma...');
        // Probar conexión directa del pool
        await pool.query('SELECT 1');
        console.log('💙 PostgreSQL conectado exitosamente con Prisma.');
    } catch (error) {
        console.error('💥 Error al conectar a PostgreSQL:', error);
        process.exit(1);
    }
};
