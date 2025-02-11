import React, { useState } from "react";
import { UserPlus, Mail, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
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
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body:JSON.stringify(formData),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json()
    console.log(data);
  };

  return (
    <div className="w-screen h-screen bg-[#0a0a0a] flex items-center justify-center">
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
            className="hover:cursor-pointer hover:bg-purple-700 text-white flex gap-2 w-full items-center justify-center p-3 rounded-[10px] bg-purple-500 mb-5"
          >
            <UserPlus className="w-5 h-5" />
            <span>Sign Up</span>
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
