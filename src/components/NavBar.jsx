import React, { useState } from "react";
import { TowerControl as GameController, User, Search, X } from "lucide-react";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");

  

  return (
    <>
      <div className="main">
        <div className="w-full h-[10vh] fixed inset-0 bg-black/70 backdrop-blur-md z-50 px-6">
          <div className="seprationdiv flex justify-between text-white">
            <div className="flex hover:cursor-pointer hover:scale-110 items-center ml-28 gap-3">
              <GameController className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-400 to-blue-600">
                NexusCloud
              </span>
            </div>
            <div className="text-white flex gap-7 p-3 items-center mr-20 text-xl">
              <div className="flex items-center relative">
                <Search className="absolute mt-1 left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Games"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-full px-4 py-2 pl-10 pr-10 focus:outline-none focus:border-purple-500 w-full"
                />
                {searchTerm && (
                  <X
                    onClick={()=>{
                        setSearchTerm('')

                    }}
                    className="absolute mt-1 right-3 top-2.5 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
                  />
                )}
              </div>
              <h1 className="text-[20px] opacity-70 hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110">
                games
              </h1>
              <h1 className="text-[20px] opacity-70 hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110">
                categories
              </h1>
              <button className="bg-purple-500 rounded-4xl flex items-center gap-2 px-5 hover:cursor-pointer hover:bg-purple-700 py-1">
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
