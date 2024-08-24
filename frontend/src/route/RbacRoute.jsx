// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Spinner from '../components/ui/Spinner';

// const PrivateRoute = () => {
//   const { user, isLoadingUser } = useAuth();
//   const isAuthenticated = user?._id ? true : false;
//   const location = useLocation();

//   if (isLoadingUser) {
//     // You can replace this with a loading spinner or any other loading indicator
//     return <Spinner />;
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" state={{ from: location }} replace />;
// };

// export default PrivateRoute;

import { Navigate, useLocation } from 'react-router-dom';
import Unauthorized from '../page/public/Unauthorized';
import { useAuth } from '../context/AuthContext';

const RbacRoute = ({ children, roles }) => {
  const location = useLocation();
  // const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const { user, isLoadingUser: loading } = useAuth();
  const isAuthenticated = user?._id ? true : false;
  if (loading) {
    return <p className="container">Checking auth..</p>;
  }

  const userHasRequiredRole = user && roles?.includes(user.role) ? true : false;
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <Unauthorized />; // build your won access denied page (sth like 404)
  }

  return children;
};

export default RbacRoute;
