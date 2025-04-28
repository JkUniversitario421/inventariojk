import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const isAuthenticated = localStorage.getItem('logado') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
