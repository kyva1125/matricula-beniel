import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@matricula-beniel/shared';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (correo: string, pass: string) => Promise<void>;
  register: (nombre: string, correo: string, pass: string, institucion: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      login: async (correo, pass) => {
        set({ loading: true });
        try {
          if (!pass) {
            throw new Error('Contraseña requerida');
          }
          // Simular llamada al backend exitosa
          const mockUser: User = {
            id: 'usr_beniel_001',
            businessId: 'bus_beniel_001',
            nombre: 'Usuario de Pruebas',
            correo: correo,
            activo: true,
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString(),
            institucion: 'Academia Beniel',
          };
          set({ user: mockUser, loading: false });
        } catch (error) {
          set({ loading: false });
          console.error('Error in login', error);
          throw new Error('Credenciales incorrectas', { cause: error });
        }
      },

      register: async (nombre, correo, pass, institucion) => {
        set({ loading: true });
        try {
          if (!pass) {
            throw new Error('Contraseña requerida');
          }
          // Simular registro con fecha de prueba activa
          const mockUser: User = {
            id: `usr_${Math.floor(Math.random() * 9000) + 1000}`,
            businessId: `bus_${Math.floor(Math.random() * 9000) + 1000}`,
            nombre,
            correo,
            activo: true,
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString(),
            trialStartedAt: new Date().toISOString(),
            institucion,
          };
          set({ user: mockUser, loading: false });
        } catch (error) {
          set({ loading: false });
          console.error('Error in register', error);
          throw new Error('Error al registrar la cuenta de administrador', { cause: error });
        }
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'user_session_store', // Key for localStorage
      partialize: (state) => ({ user: state.user }), // Only persist user state
    }
  )
);
