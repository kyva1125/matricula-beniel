
import type {AuthResponse} from "@/interfaces/auth.response.ts";
import {matriculaApi} from "@/api/matricula.api.ts";


export const LoginAction = async (email: string, password: string):Promise<AuthResponse> => {
    try {

        const response = await matriculaApi.post('/auth/login', {
                email,
            password,
        });

        console.log(response);

        return response;


    } catch (error) {
        console.error(error);
        throw error;
    }
}
