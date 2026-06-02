import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (correo: string, pass: string) => Promise<void>;
  register: (nombre: string, correo: string, pass: string, rol: 'apoderado' | 'estudiante') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular lectura de sesión desde LocalStorage al iniciar
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async (correo: string, _pass: string) => {
    setLoading(true);
    try {
      // Simular llamada al backend exitosa
      const mockUser: User = {
        id: 'usr_beniel_001',
        nombre: 'Usuario de Pruebas',
        correo: correo,
        rol: 'administrador',
        activo: true,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user_session', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Error in login', error);
      throw new Error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  const register = async (nombre: string, correo: string, _pass: string, rol: 'apoderado' | 'estudiante') => {
    setLoading(true);
    try {
      // Simular registro exitoso en base de datos e inicio automático
      const newUser: User = {
        id: `usr_${Math.floor(Math.random() * 9000) + 1000}`,
        nombre: nombre,
        correo: correo,
        rol: rol,
        activo: true,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem('user_session', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error in register', error);
      throw new Error('No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
};
