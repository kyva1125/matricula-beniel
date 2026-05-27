import mongoose from 'mongoose';
import { env } from './environment';

export const connectMongoDB = async (): Promise<void> => {
  try {
    const connectionUrl = env.mongoUrl || 'mongodb://127.0.0.1:27017';
    const dbName = env.mongoDbName || 'matricula_beniel';

    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(connectionUrl, {
      dbName: dbName,
    });
    console.log('💚 MongoDB conectado exitosamente.');
  } catch (error) {
    console.error('💥 Error crítico al conectar a MongoDB:', error);
    process.exit(1); // Finaliza el servidor si no podemos conectar a la base de datos principal
  }
};
