import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const isAuthenticated = localStorage.getItem('token') // 로그인 여부 확인

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
