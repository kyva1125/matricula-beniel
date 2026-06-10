import { prisma } from '../config/prisma';
import { UserModel } from '../models/user.model';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findById(id: string): Promise<UserModel | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return new UserModel(
      user.id,
      user.businessId,
      user.nombre,
      user.correo,
      user.rol as 'administrador' | 'apoderado' | 'estudiante',
      user.activo,
      user.fechaCreacion,
      user.fechaActualizacion,
      user.trialStartedAt,
      user.institucion
    );
  }

  async findByEmail(correo: string): Promise<UserModel | null> {
    const user = await prisma.user.findUnique({
      where: { correo },
    });
    if (!user) return null;
    return new UserModel(
      user.id,
      user.businessId,
      user.nombre,
      user.correo,
      user.rol as 'administrador' | 'apoderado' | 'estudiante',
      user.activo,
      user.fechaCreacion,
      user.fechaActualizacion,
      user.trialStartedAt,
      user.institucion
    );
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<UserModel> {
    const user = await prisma.user.create({
      data,
    });
    return new UserModel(
      user.id,
      user.businessId,
      user.nombre,
      user.correo,
      user.rol as 'administrador' | 'apoderado' | 'estudiante',
      user.activo,
      user.fechaCreacion,
      user.fechaActualizacion,
      user.trialStartedAt,
      user.institucion
    );
  }

  async update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<UserModel> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return new UserModel(
      user.id,
      user.businessId,
      user.nombre,
      user.correo,
      user.rol as 'administrador' | 'apoderado' | 'estudiante',
      user.activo,
      user.fechaCreacion,
      user.fechaActualizacion,
      user.trialStartedAt,
      user.institucion
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async findAll(): Promise<UserModel[]> {
    const users = await prisma.user.findMany();
    return users.map(
      (user) =>
        new UserModel(
          user.id,
          user.businessId,
          user.nombre,
          user.correo,
          user.rol as 'administrador' | 'apoderado' | 'estudiante',
          user.activo,
          user.fechaCreacion,
          user.fechaActualizacion,
          user.trialStartedAt,
          user.institucion
        )
    );
  }
}

