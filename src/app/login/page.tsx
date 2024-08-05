"use client";

import { RootState } from "../../lib/store"
import { useSelector } from "react-redux";

const LoginPage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <h1>Login Page</h1>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      {
        user && (
          <p>
            User: {user.id} - {user.username}
          </p>
        )
      }
    </div>
  )
}

export default LoginPage