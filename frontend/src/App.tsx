import { useAuth } from './context/AuthContext';
import LoginPage from './features/auth/pages/LoginPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-100 font-sans">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-semibold tracking-wide animate-pulse">
          Cargando entorno seguro...
        </p>
      </div>
    );
  }

  return !user ? <LoginPage /> : <DashboardPage />;
}

export default App;
