-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "grado" TEXT NOT NULL,
    "seccion" TEXT NOT NULL,
    "apoderadoId" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pension" (
    "id" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "mes" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "pensionId" TEXT NOT NULL,
    "montoPagado" DOUBLE PRECISION NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "codigoOperacion" TEXT NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comprobanteUrl" TEXT,
    "registradoPorId" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_correo_key" ON "User"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_dni_key" ON "Student"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_codigoOperacion_key" ON "Payment"("codigoOperacion");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_apoderadoId_fkey" FOREIGN KEY ("apoderadoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pension" ADD CONSTRAINT "Pension_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_pensionId_fkey" FOREIGN KEY ("pensionId") REFERENCES "Pension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
