import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthenticatePage() {
  const { login, register, isLoading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    await login({ email, password });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    await register({ username, email, password });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          {/* Login Form */}
          <form onSubmit={handleLogin} className="gap-2">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="form-control mb-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="form-control mb-2"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary mt-2"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        <div className="col-lg-6">
          {/* Register Form - Uncommented and fixed */}
          <form onSubmit={handleRegister} className="">
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
              className="form-control mb-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="form-control mb-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="form-control mb-2"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-secondary"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
