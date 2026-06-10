import jwt, { SignOptions } from 'jsonwebtoken';

export type JwtPayload = {
    id: string;
    businessId: string;
    correo: string;
    rol: string;
};

export class JwtAdapter {
    private static readonly secret = process.env.JWT_SECRET || 'secret';
    private static readonly expiresIn = process.env.JWT_EXPIRES_IN || '2h';

    static generateToken(payload: JwtPayload): string {
        const options: SignOptions = {
            expiresIn: (this.expiresIn as SignOptions['expiresIn']),
        };
        return jwt.sign(payload, this.secret, options);
    }

    static verifyToken(token: string): JwtPayload {
        return jwt.verify(token, this.secret) as JwtPayload;
    }
}
