import React, { useState } from "react";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authAPI.forgotPassword(email);
      setSuccess(response.data.message);
      setResetToken(response.data.resetToken);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await authAPI.resetPassword(resetToken, newPassword);
      setSuccess("Password reset successful! You can now login with your new password.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-[450px] bg-gray-900/50 p-8 rounded-2xl border mt-10 border-gray-800">
        <div className="flex justify-center">
          <KeyRound className="w-8 h-8 text-purple-500 mb-8" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Reset Password
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Enter your email to receive password reset instructions
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-center">
            {success}
          </div>
        )}

        {!resetToken ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm font-bold text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="hover:cursor-pointer hover:bg-purple-700 text-white flex gap-2 w-full items-center justify-center p-3 rounded-[10px] bg-purple-500 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Processing..." : "Reset Password"}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="text-sm font-bold text-gray-300">
                New Password
              </label>
              <div className="relative">
                <input
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
                <KeyRound className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-bold text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
                <KeyRound className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="hover:cursor-pointer hover:bg-purple-700 text-white flex gap-2 w-full items-center justify-center p-3 rounded-[10px] bg-purple-500 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Processing..." : "Set New Password"}</span>
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 text-gray-500">
          <ArrowLeft className="w-4 h-4" />
          <Link to="/login">
            <span className="text-purple-500 hover:text-purple-400">
              Back to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 