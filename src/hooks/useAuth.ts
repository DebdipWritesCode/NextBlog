import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store";
import { verifyTokenAsync } from "@/lib/features/authSlice";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      const tokenCookie = cookies().get("token");
      const token = tokenCookie ? tokenCookie.value : undefined;

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await dispatch(verifyTokenAsync(token)).unwrap();
        if (!isAuthenticated) {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    checkAuth();
  }, [dispatch, router, isAuthenticated]);

  return { isAuthenticated, loading, error };
};

export default useAuth;
