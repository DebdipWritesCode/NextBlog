import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store";
import { verifyTokenAsync, loginSuccess, logoutSuccess } from "../lib/features/authSlice";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(verifyTokenAsync())
        .unwrap()
        .then((userData) => {
          dispatch(loginSuccess(userData));
        })
        .catch(() => {
          dispatch(logoutSuccess());
        });
    }
  }, [dispatch, isAuthenticated]);

  return { isAuthenticated, user, loading, error };
};

export default useAuth;
