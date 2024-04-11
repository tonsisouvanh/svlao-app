import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setRole } from "../feature/auth/AuthSlice";
const useAuthentication = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve token from cookie
    const token = Cookies.get("token");
    if (token) {
      // Decode token to extract user information
      const decodedToken = jwtDecode(token);
      const { role } = decodedToken;
      // Dispatch action to store user role in Redux store
      dispatch(setRole(role));
    }
  }, [dispatch]);

  return { role };
};

export default useAuthentication;
