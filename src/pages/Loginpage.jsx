import React, { useState } from "react";
import { LogIn, User, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Loginpage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        // Get the user data from the login result
        const userData = result.user;

        // Check if the user is an admin
        if (userData && userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-[450px] bg-gray-900/50 p-8 rounded-2xl border mt-10 border-gray-800">
        <div className="flex justify-center">
          <User className="w-8 h-8 text-purple-500 mb-8" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to continue your gaming journey
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <input
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
                required
              />
              <User className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-300">Password</label>
            <div className="relative">
              <input
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white mb-5"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <KeyRound className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center">
              <input className="mr-2" type="checkbox" />
              <h1 className="text-white">Remember me</h1>
            </div>
            <Link to="/forgot-password">
              <h1 className="text-purple-500 hover:text-purple-400">Forgot password</h1>
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="hover:cursor-pointer hover:bg-purple-700 text-white flex gap-2 w-full items-center justify-center p-3 rounded-[10px] bg-purple-500 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn className="w-5 h-5" />
            <span>{loading ? "Signing in..." : "Sign in"}</span>
          </button>
          <p className="text-[1.2rem] text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-purple-500">Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
