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

El proyecto está diseñado de forma modular para escalar limpiamente conforme crezca la lógica de negocio:

```text
matricula-beniel/
├── src/
│   ├── server.ts               # Punto de entrada y arranque del servidor HTTP
│   ├── app.ts                  # Inicialización de Express, CORS, Helmet y middlewares globales
│   ├── config/
│   │   └── environment.ts      # Tipado estricto y carga segura de variables de entorno (.env)
│   ├── controllers/
│   │   └── health.controller.ts# Lógica de respuestas HTTP (e.g. estado del backend)
│   ├── routes/
│   │   ├── index.ts            # Enrutador maestro unificador (bajo /api)
│   │   └── health.routes.ts    # Enrutamiento de sub-módulo de estado
│   └── middlewares/
│       └── error.middleware.ts # Controlador de excepciones y respuestas de error JSON uniformes
├── dist/                       # Código de producción compilado (generado tras build)
├── .env                        # Variables locales de entorno (puertos, claves)
├── .env.example                # Plantilla de configuración de entorno para colaboradores
├── tsconfig.json               # Configuración estricta del compilador TypeScript
└── package.json                # Dependencias, tipados y scripts útiles
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
