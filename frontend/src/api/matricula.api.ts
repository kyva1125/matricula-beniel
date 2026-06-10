import * as axios from "axios";


export const matriculaApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

})

// Interceptores
