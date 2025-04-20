import React, { useState } from "react";
import { UserPlus, Mail, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/api";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.register(formData);

      if (response.data.token) {
        // Save token and user data to local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to home page
        navigate("/home");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen font-[Helvatica_Now_Display] bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-[450px] bg-gray-900/50 p-8 rounded-2xl border mt-14 border-gray-800">
        <div className="flex justify-center">
          <UserPlus className="w-8 h-8 text-purple-500 mb-8" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Join us and start your gaming adventure!
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-300">Full Name</label>
            <div className="relative">
              <input
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <UserPlus className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <input
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white"
                type="email"
                placeholder="Enter your email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <Mail className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-300">Password</label>
            <div className="relative">
              <input
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white"
                type="password"
                placeholder="Create a password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <KeyRound className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="hover:cursor-pointer hover:bg-purple-700 text-white flex gap-2 w-full items-center justify-center p-3 rounded-[10px] bg-purple-500 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="w-5 h-5" />
            <span>{loading ? "Creating account..." : "Sign Up"}</span>
          </button>
          <p className="text-[1.2rem] text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-purple-500">Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
