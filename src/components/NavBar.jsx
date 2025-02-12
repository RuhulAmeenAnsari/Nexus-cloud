import React, { useState } from "react";
import { TowerControl as GameController, User, Search, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import "@fontsource/poppins";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="main font-[Helvetica_Now_Display]">
        <div className="w-full h-[10vh] fixed inset-0 bg-black/70 backdrop-blur-md z-50 px-6 flex items-center">
          <div className="w-full flex justify-between items-center text-white">
            {/* Logo */}
            <div className="flex hover:cursor-pointer hover:scale-110 items-center ml-6 md:ml-28 gap-3">
              <GameController className="w-8 h-8 text-purple-500" />
              <Link to="/">
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-400 to-blue-600">
                  NexusCloud
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-7 p-4 items-center text-lg">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-full px-3 py-2 pl-12 pr-10 focus:outline-none focus:border-purple-500 w-full md:w-80"
                />
                {searchTerm && (
                  <X
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-3 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
                  />
                )}
              </div>

              <h1 className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110">
                Games
              </h1>
              <h1 className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110">
                Categories
              </h1>
              <Link to="./login">
                <button className="bg-purple-500 rounded-4xl flex items-center gap-1 px-3 py-1 hover:cursor-pointer hover:bg-purple-700">
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden mr-6"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden absolute top-[10vh] text-white left-0 w-full bg-black/70 backdrop-blur-md flex flex-col items-center py-4 gap-4 z-40">
              <div className="relative w-10/12">
                <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-full px-3 py-2 pl-12 pr-10 focus:outline-none focus:border-purple-500 w-full"
                />
                {searchTerm && (
                  <X
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-3 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
                  />
                )}
              </div>

              <Link to="/" className="text-white text-lg hover:text-purple-500">Games</Link>
              <Link to="/" className="text-white text-lg hover:text-purple-500">Categories</Link>
              <Link to="./login">
                <button className="bg-purple-500 rounded-4xl flex items-center gap-1 px-3 py-1 hover:cursor-pointer hover:bg-purple-700">
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
