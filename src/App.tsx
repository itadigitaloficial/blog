import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import AdminLogin from './pages/auth/AdminLogin'
import UserLogin from './pages/auth/UserLogin'
import AdminDashboard from './pages/admin/Dashboard'
import UserDashboard from './pages/user/Dashboard'
import AdminSetup from './pages/setup/AdminSetup'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        Carregando...
      </Box>
    )
  }

  return (
    <Routes>
      {/* Rota de setup */}
      <Route path="/setup" element={<AdminSetup />} />

      {/* Rotas públicas */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/login" element={<UserLogin />} />

      {/* Rotas protegidas do admin */}
      <Route path="/admin/*" element={
        user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/admin/login" />
      } />

      {/* Rotas protegidas do usuário */}
      <Route path="/dashboard/*" element={
        user ? <UserDashboard /> : <Navigate to="/login" />
      } />

      {/* Redireciona para login apropriado */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
