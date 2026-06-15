import type {User} from "@matricula-beniel/shared";

export interface AuthResponse {
 success?: boolean;
 message?: string;
 data?: Data;
}

class Data {
    public token?: string;
    public user?: User;
}


