import {AuthRepository} from '../repositories/auth.repository';
import {AppError} from '../utils/app.error';
import {prisma} from '../config/prisma';
import {LoginDTO, RegisterDTO} from "../dtos/auth.dto";
import {BcryptAdapter} from "../adapters/bcrypt.adapter";
import {JwtAdapter} from "../adapters/jwt.adapter";

export class AuthService {

    private authRepository = new AuthRepository();

    async register(data: RegisterDTO) {
        if (!data || typeof data !== 'object') {
            throw new AppError('Datos de registro no proporcionados', 400);
        }
        if (!data.correo || typeof data.correo !== 'string') {
            throw new AppError('El correo es obligatorio', 400);
        }
        if (!data.password || typeof data.password !== 'string') {
            throw new AppError('La contraseña es obligatoria', 400);
        }
        if (!data.nombre || typeof data.nombre !== 'string') {
            throw new AppError('El nombre es obligatorio', 400);
        }

        const existingUser = await this.authRepository.findByEmail(data.correo);
        if (existingUser) {
            throw new AppError('El correo ya está registrado', 400);
        }


        // Si no viene businessId, creamos un nuevo Business (con la institucion enviada)
        let businessId = data.businessId;

        if (!businessId) {
            const business = await prisma.business.create({
                data: {
                    nombre: data.institucion || 'Mi Institución',
                    direccion: data.direccion || 'Sin dirección',
                },
            });
            businessId = business.id;
        }

        // Encrypt password
        const hashedPassword = await BcryptAdapter.hash(data.password);


        // En producción usar bcrypt para encriptar contraseñas
        const user = await this.authRepository.createUser({
            nombre: data.nombre,
            correo: data.correo,
            password: hashedPassword,
            rol: data.rol || 'administrador', // Por defecto administrador al registrar un nuevo negocio
            businessId: businessId,
            trialStartedAt: new Date(),
            institucion: data.institucion || 'Mi Institución',
        });

        return {
            id: user.id,
            businessId: user.businessId,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol,
            trialStartedAt: user.trialStartedAt,
            institucion: user.institucion,
        };
    }

    async login({correo, password}: LoginDTO) {
        if (!correo || typeof correo !== 'string') {
            throw new AppError('El correo es obligatorio', 400);
        }
        if (!password || typeof password !== 'string') {
            throw new AppError('El password es obligatorio', 400);
        }


        const user = await this.authRepository.findByEmail(correo);


        if (!user || !await BcryptAdapter.compare(
            password,
            user.password
        )) {
            throw new AppError('Credenciales inválidas', 401);
        }

        if (!user.activo) {
            throw new AppError('Usuario inactivo', 403);
        }


        // JWT
        const token = JwtAdapter.generateToken({
            id: user.id,
            correo: user.correo,
            businessId: user.businessId,
            rol: user.rol
        });


        return {
            token: token,
            user: {
                id: user.id,
                businessId: user.businessId,
                nombre: user.nombre,
                correo: user.correo,
                rol: user.rol,
                trialStartedAt: user.trialStartedAt,
                institucion: user.institucion,
            },
        };
    }
}

