"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/lib/features/authSlice";

type LoginData = {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: LoginData = {
      username,
      password,
    }
    try {
      const response = await axios.post("/api/auth/login", data);
      if(response.status === 200) {
        setError("");
        console.log(response.data);
        dispatch(loginSuccess(response.data.user))
        router.push("/blog");
      }
    }
    catch(err) {
      if(axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      }
      else {
        setError("An expected error occurred");
      }
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={(e) => handleLoginSubmit(e)}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
