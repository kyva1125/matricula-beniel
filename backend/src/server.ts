import app from "./app";
import { env } from "./config/env";
import { connectPostgres, disconnectPostgres } from "./config/prisma";

async function bootstrap() {
  await connectPostgres();

  const server = app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });

  process.on("SIGINT", async () => {
    console.log("🛑 Cerrando servidor...");

    await disconnectPostgres();

    server.close(() => {
      console.log("✅ Servidor cerrado correctamente.");
      process.exit(0);
    });
  });
}

bootstrap();
