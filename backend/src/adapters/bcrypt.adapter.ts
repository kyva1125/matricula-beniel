import { compare, genSalt, hash } from 'bcrypt-ts';

export const BcryptAdapter = {
    hash: async (password: string): Promise<string> => {
        const salt = await genSalt(10);
        return hash(password, salt);
    },

    compare: async (password: string, hashedPassword: string): Promise<boolean> => {
        return compare(password, hashedPassword);
    },
};
