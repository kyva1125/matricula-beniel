
export type RegisterDTO = {
    nombre: string;
    correo: string;
    password: string;

    institucion?: string;
    direccion?: string;
    businessId?: string;
};

export type LoginDTO = {
    correo: string;
    password: string;
}
