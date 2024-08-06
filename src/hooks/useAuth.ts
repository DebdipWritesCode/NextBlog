import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store";
import { verifyTokenAsync, loginSuccess, logoutSuccess } from "../lib/features/authSlice";

type UserData = {
  id: string;
  username: string;
}

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const responseData = await dispatch(verifyTokenAsync());
        const decodedData = responseData.payload;
        
        if (typeof decodedData === 'object' && decodedData !== null) {
          const userData: UserData = {
            id: decodedData.id,
            username: decodedData.username,
          }
          dispatch(loginSuccess(userData));
        } else if (typeof decodedData === 'string') {
          throw new Error(decodedData);
        } else {
          throw new Error('An error occurred');
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
        dispatch(logoutSuccess());
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  return { isAuthenticated, loading };
};

export default useAuth;
