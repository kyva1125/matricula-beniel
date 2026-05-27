import app from './app';
import { env } from './config/environment';
import { connectMongoDB } from './config/mongo';
import { connectPostgres } from './config/prisma';

// Manejo global de excepciones no capturadas
process.on('uncaughtException', (err: Error) => {
  console.error('💥 EXCEPCIÓN NO CAPTURADA! Apagando...');
  process.exit(1);
});

// Función asíncrona para inicializar recursos y luego levantar la web
const startServer = async () => {
  try {

    await connectMongoDB();
    await connectPostgres();


    const server = app.listen(env.port, () => {
      console.log(`🚀 Servidor activo en modo [${env.nodeEnv}]`);
      console.log(`📡 Escuchando en el puerto: ${env.port}`);
      console.log(`🔗 Endpoint de salud: http://localhost:${env.port}/api/health`);
    });

    // Manejo de promesas rechazadas
    process.on('unhandledRejection', (err: any) => {
      console.error('💥 RECHAZO DE PROMESA NO MANEJADO! Cerrando servidor...');
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('💥 Error crítico al arrancar los servicios:', error);
    process.exit(1);
  }
};

// Arrancar la secuencia de inicio
startServer();
