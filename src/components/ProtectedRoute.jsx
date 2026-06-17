import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../lib/authToken';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
