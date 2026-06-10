import { UserRepository } from '../repositories/user.repository';
import { UserModel } from '../models/user.model';
import { AppError } from '../utils/app.error';
import { prisma } from '../config/prisma';

export class UserService {
  private userRepository = new UserRepository();

  async getUsers(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  }

  async createUser(data: any): Promise<UserModel> {
    const existing = await this.userRepository.findByEmail(data.correo);
    if (existing) {
      throw new AppError('El correo ya está registrado', 400);
    }

    let businessId = data.businessId;
    if (!businessId) {
      let business = await prisma.business.findFirst();
      if (!business) {
        business = await prisma.business.create({
          data: {
            nombre: data.institucion || 'Negocio por Defecto',
            direccion: 'Dirección por defecto',
          }
        });
      }
      businessId = business.id;
    }

    return this.userRepository.create({
      nombre: data.nombre,
      correo: data.correo,
      password: data.password || '123456', // default password para pruebas
      rol: data.rol || 'estudiante',
      activo: true,
      businessId: businessId,
      trialStartedAt: data.trialStartedAt ? new Date(data.trialStartedAt) : null,
      institucion: data.institucion || null,
    });
  }

  async updateUser(id: string, data: any): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    await this.userRepository.delete(id);
  }
}

