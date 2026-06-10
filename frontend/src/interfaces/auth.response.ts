import type {User} from "../types";

export interface AuthResponse {
 success?: boolean;
 message?: string;
 data?: Data;
}

class Data {
    public token?: string;
    public user?: User;
}


