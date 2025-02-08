import React from "react";
import { Gamepad2, Rocket, Cloud, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import teaserfile2 from "../video/teaserfile1.mp4";
import "@fontsource/poppins";

function LandingPage() {
  return (
    <>
      <div className="bg-black h-full w-full">
        <div className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <video
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              src={teaserfile2}
            ></video>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent "></div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full  items-center ">
            <div className="max-w-2xl mt-36">
              <h1 className="text-7xl  font-bold mb-6  bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                Cloud Gaming Redefined
              </h1>
              <p className="text-white text-xl font-poppins">
                {" "}
                Play your favorite games instantly. No downloads, no waiting.
                Just pure gaming experience powered by cutting-edge cloud
                technology.
              </p>
              <div className="flex gap-6">
                <Link to="/home">
                  <button className="rounded-4xl px-5 py-3 mt-10 hover:cursor-pointer hover:bg-purple-700 font-bold text-l text-white bg-purple-600 w-44 flex items-center pl-8    ">
                    <Rocket className="w-5 h-5 mr-2" />
                    <span>Get Started</span>
                  </button>
                </Link>
                <button className="rounded-4xl px-5 py-3 mt-10 hover:cursor-pointer hover:bg-purple-600 hover:text-white text-l font-bold text-purple-600  w-44 bg-transparent border-2 border-purple-600 ">
                  Browse Games
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------------------------------------------------------- */}
        <div className=" mt-16 h-[50vh] flex flex-wrap justify-evenly gap-4">
          <div className="border-2 p-8 bg-gray-900/50  rounded-3xl border-gray-800 h-52 w-[25vw]">
            <Cloud className="w-12 h-12 text-purple-500 mb-4" />
            <h1 className="text-white my-2 text-xl font-bold">Cloud Powered</h1>
            <p className="text-white">
              Play instantly from any device with our powerful cloud
              infrastructure.
            </p>
          </div>
          <div className="border-2 p-8 bg-gray-900/50  rounded-3xl border-gray-800 h-52 w-[25vw]">
            <Gamepad2 className="w-12 h-12 text-purple-500 mb-4" />
            <h1 className="text-white my-2 text-2xl font-bold">
              {" "}
              Vast Library
            </h1>
            <p className="text-white">
              {" "}
              Access hundreds of premium games from top publishers worldwide.
            </p>
          </div>
          <div className="border-2 p-8 bg-gray-900/50  rounded-3xl border-gray-800 h-52 w-[25vw]">
            <Zap className="w-12 h-12 text-purple-500 mb-4" />
            <h1 className="text-white my-2 text-2xl font-bold">
              Cloud Powered
            </h1>
            <p className="text-white">
              {" "}
              Experience gaming with ultra-low latency and stunning graphics.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
