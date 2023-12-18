import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { auth } = useSelector((state) => state.auth);
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
