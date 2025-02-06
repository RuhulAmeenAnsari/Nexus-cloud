import React from "react";
import { LogIn, User, KeyRound } from "lucide-react";

const Loginpage = () => {
  return (
    <div className="w-screen h-screen bg-[#0a0a0a] flex items-center justify-center ">
      <div className="w-[450px] h-[500px] bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
        <div className="flex justify-center">
          <User className="w-8 h-8 text-purple-500 mb-8" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to continue your gaming journey
        </p>
        <form action="" className="">
          <label className=" text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-4 text-white"
              type="email"
              placeholder="Enter your email"
              required
            />
            <User className="absolute left-3 top-8 w-5 h-5 text-gray-500" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
