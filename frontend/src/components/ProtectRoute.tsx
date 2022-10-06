import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: any) => {
  const { token }: any = useAuth();

  if (!token) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
};
