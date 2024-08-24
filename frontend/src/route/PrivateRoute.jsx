import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';

const PrivateRoute = () => {
  const { user, isLoadingUser } = useAuth();
  const isAuthenticated = user?._id ? true : false;
  const location = useLocation();

  if (isLoadingUser) {
    // You can replace this with a loading spinner or any other loading indicator
    return <Spinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
