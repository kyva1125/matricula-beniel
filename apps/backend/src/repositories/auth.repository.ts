import { prisma } from '../config/prisma';

export class AuthRepository {
  async findByEmail(correo: string) {
    return prisma.user.findUnique({
      where: { correo },
    });
  }

  async createUser(data: any) {
    return prisma.user.create({
      data,
    });
  }
}
