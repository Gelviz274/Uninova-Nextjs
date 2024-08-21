-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id_UP" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "semestreId" INTEGER,
    "universidadId" INTEGER,
    "carreraId" INTEGER,
    "fotoPerfil" TEXT,
    "acercaDeMi" TEXT,
    "telefono" TEXT,
    "fechaNacimiento" TIMESTAMP(3),
    "mostrarFechaNacimiento" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id_UP")
);

-- CreateTable
CREATE TABLE "Universidad" (
    "id_universidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Universidad_pkey" PRIMARY KEY ("id_universidad")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id_carrera" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "universidadId" INTEGER NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id_carrera")
);

-- CreateTable
CREATE TABLE "Semestre" (
    "id_semestre" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Semestre_pkey" PRIMARY KEY ("id_semestre")
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id_proyecto" SERIAL NOT NULL,
    "nombreProyecto" TEXT NOT NULL,
    "creadorId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT NOT NULL,
    "documentacion" TEXT,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id_proyecto")
);

-- CreateTable
CREATE TABLE "ProyectoImagen" (
    "id_Pimg" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "ProyectoImagen_pkey" PRIMARY KEY ("id_Pimg")
);

-- CreateTable
CREATE TABLE "ProyectoVideo" (
    "id_Pvid" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "video" TEXT NOT NULL,

    CONSTRAINT "ProyectoVideo_pkey" PRIMARY KEY ("id_Pvid")
);

-- CreateTable
CREATE TABLE "ActualizacionProyecto" (
    "id_AP" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActualizacionProyecto_pkey" PRIMARY KEY ("id_AP")
);

-- CreateTable
CREATE TABLE "ActualizacionProyectoImagen" (
    "id_APimg" SERIAL NOT NULL,
    "actualizacionId" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "ActualizacionProyectoImagen_pkey" PRIMARY KEY ("id_APimg")
);

-- CreateTable
CREATE TABLE "ActualizacionProyectoVideo" (
    "id_APvid" SERIAL NOT NULL,
    "actualizacionId" INTEGER NOT NULL,
    "video" TEXT NOT NULL,

    CONSTRAINT "ActualizacionProyectoVideo_pkey" PRIMARY KEY ("id_APvid")
);

-- CreateTable
CREATE TABLE "ProyectoColaborador" (
    "id_PC" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "proyectoId" INTEGER NOT NULL,

    CONSTRAINT "ProyectoColaborador_pkey" PRIMARY KEY ("id_PC")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Universidad_nombre_key" ON "Universidad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Semestre_nombre_key" ON "Semestre"("nombre");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "Semestre"("id_semestre") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_universidadId_fkey" FOREIGN KEY ("universidadId") REFERENCES "Universidad"("id_universidad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id_carrera") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrera" ADD CONSTRAINT "Carrera_universidadId_fkey" FOREIGN KEY ("universidadId") REFERENCES "Universidad"("id_universidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoImagen" ADD CONSTRAINT "ProyectoImagen_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id_proyecto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoVideo" ADD CONSTRAINT "ProyectoVideo_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id_proyecto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActualizacionProyecto" ADD CONSTRAINT "ActualizacionProyecto_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id_proyecto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActualizacionProyectoImagen" ADD CONSTRAINT "ActualizacionProyectoImagen_actualizacionId_fkey" FOREIGN KEY ("actualizacionId") REFERENCES "ActualizacionProyecto"("id_AP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActualizacionProyectoVideo" ADD CONSTRAINT "ActualizacionProyectoVideo_actualizacionId_fkey" FOREIGN KEY ("actualizacionId") REFERENCES "ActualizacionProyecto"("id_AP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoColaborador" ADD CONSTRAINT "ProyectoColaborador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoColaborador" ADD CONSTRAINT "ProyectoColaborador_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id_proyecto") ON DELETE RESTRICT ON UPDATE CASCADE;
