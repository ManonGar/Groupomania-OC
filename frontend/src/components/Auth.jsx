import useAuth from '../hooks/useAuth'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
