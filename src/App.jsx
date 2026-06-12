import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import GoalsPage from './pages/GoalsPage';
import HomePage from './pages/HomePage';
import PlanPage from './pages/PlanPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/metas" element={<GoalsPage />} />
        <Route path="/planos/:slug" element={<PlanPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/configuracoes" element={<SettingsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
