import React, { useState } from "react";
import { LogIn, User, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";;



const Loginpage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [formData, setformData] = useState({
    email: "",
    password: "",
  })
const handleChange = (e) => {
  setformData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

}
const handleclick = async (e) => {
  e.preventDefault()
  setError("");
  // console.log(formData);
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      // ✅ Save token to local storage (optional)
      localStorage.setItem("token", data.token);

      // ✅ Redirect to profile page after successful login
      navigate("/home");
    } else {
      alert('Login failed. Please try again.')
      setError(data.message || "Login failed. Please try again.");
    }
  } catch (err) {
    setError("Server error. Please try again later.");
  }

}

  


  return (
    <div className="w-screen h-screen  bg-[#0a0a0a] flex items-center  justify-center ">
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
        <form action="" className="">
          <div className="mb-4">
            <label className=" text-sm font-bold text-gray-300">
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
            <label className=" text-sm font-bold text-gray-300">Password</label>
            <div className="relative">
              <input
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 mt-2 text-white mb-5"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <KeyRound className="absolute left-3 top-6 w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center">
              <input className="mr-2" type="checkbox" />
              <h1 className="text-white">Remember me</h1>
            </div>
            <h1 className="text-purple-500">Forgot password</h1>
          </div>
          <button onClick={handleclick} className=" hover:cursor-pointer hover:bg-purple-700 text-white flex gap-2 w-full items-center justify-center p-3 rounded-[10px] bg-purple-500 mb-5 ">
          <LogIn className="w-5 h-5" />
          <span>Sign in</span>
          </button>
          <p className="text-[1.2rem] text-gray-500 text-center">
            Don't have an account?{" "}
           <Link to='/signup'> <span className="text-purple-500">Sign up</span></Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
