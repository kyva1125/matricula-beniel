# Beniel Matrícula Backend API

Estructura base moderna, robusta y escalable para una aplicación de Node.js con **TypeScript** y **Express**.

## 🚀 Tecnologías Principales

* **TypeScript** - Superconjunto de JavaScript que añade tipado estático estricto.
* **Express** - Framework web rápido y minimalista para Node.js.
* **Helmet & CORS** - Middlewares de seguridad esenciales de cabeceras HTTP y control de accesos cruzados.
* **Morgan** - Registrador de solicitudes HTTP para fácil depuración en consola.
* **Dotenv** - Carga y gestión limpia de configuraciones de entorno.
* **ts-node-dev** - Recarga ultrarrápida en caliente durante el desarrollo.

---

## 📂 Estructura de Directorios

El proyecto está diseñado de forma limpia y por capas (MVC/Repository Pattern) para separar responsabilidades y facilitar el mantenimiento:

```text
matricula-beniel/
├── backend/
│   ├── src/
│   │   ├── server.ts               # Punto de entrada y arranque del servidor HTTP
│   │   ├── app.ts                  # Inicialización de Express, CORS, Helmet y middlewares globales
│   │   ├── config/
│   │   │   ├── env.ts              # Carga segura y tipado de variables de entorno (.env)
│   │   │   ├── prisma.ts         # Conexión del pool de PostgreSQL usando Prisma Client
│   │   │   └── logger.ts           # Logger de consola unificado
│   │   ├── controllers/            # Controladores que reciben peticiones y delegan lógica a servicios
│   │   │   ├── auth.controller.ts
│   │   │   ├── health.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── routes/                 # Rutas de la API agrupadas por entidad (bajo /api)
│   │   │   ├── index.ts            # Enrutador maestro unificador
│   │   │   ├── auth.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── services/               # Lógica de negocio (procesamiento de datos, lógica de dominio)
│   │   │   ├── auth.service.ts
│   │   │   └── user.service.ts
│   │   ├── repositories/           # Capa de datos que interactúa con la base de datos a través de Prisma
│   │   │   ├── auth.repository.ts
│   │   │   └── user.repository.ts
│   │   ├── models/                 # Modelos o entidades de dominio
│   │   │   ├── payment.model.ts
│   │   │   ├── pension.model.ts
│   │   │   ├── student.model.ts
│   │   │   └── user.model.ts
│   │   ├── middlewares/            # Filtros e interceptores HTTP (autenticación, errores globales)
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── validators/             # Validador de esquemas de datos entrantes (Request Body)
│   │   │   └── user.validator.ts
│   │   └── utils/                  # Clases de error común y formateo de respuestas
│   │       ├── app.error.ts
│   │       └── response.ts
│   ├── prisma/                     # Esquema y archivos de migración de Prisma ORM
│   ├── .env                        # Variables locales de entorno (puertos, conexión DB)
│   ├── tsconfig.json               # Configuración estricta del compilador TypeScript
│   └── package.json                # Dependencias, scripts y metadatos del backend
└── frontend/                       # Proyecto Frontend (React, Vite, Tailwind CSS)
```

---

## ⚙️ Configuración y Despliegue

### 1. Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión recomendada LTS v18 o superior).

### 2. Instalación de Dependencias
Ejecuta en tu terminal el siguiente comando para instalar todos los paquetes y tipados:
```bash
npm install
```

### 3. Ejecución en Entorno de Desarrollo (Con recarga en caliente)
Levanta el servidor localmente con recarga automática al guardar cambios en el código:
```bash
npm run dev
```
El servidor arrancará por defecto en el puerto `3000`.

### 4. Compilación y Construcción para Producción
Compila el código TypeScript a JavaScript puro listo para producción:
```bash
npm run build
```
Esto limpiará compilaciones antiguas y creará el directorio `/dist` con todo tu código optimizado.

### 5. Iniciar Servidor en Producción
Una vez realizada la compilación, arranca el servidor optimizado de producción:
```bash
npm run start
```

---

## 📡 Endpoints de Prueba Incluidos

* **Endpoint de Salud (Healthcheck)**:
  * **URL**: `GET http://localhost:3000/api/health`
  * **Descripción**: Retorna la hora del servidor, uptime, métricas de consumo de memoria de Node.js y el entorno de ejecución.

* **Control de Errores e Inexistencias**:
  * Si accedes a una ruta no registrada (ej. `GET http://localhost:3000/api/no-existe`), el sistema responderá automáticamente con un código HTTP `404 Not Found` en formato JSON estructurado sin exponer datos sensibles del backend.
