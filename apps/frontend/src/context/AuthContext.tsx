import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const { user, loading, login, register, logout } = useAuthStore();
  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout
  };
};
