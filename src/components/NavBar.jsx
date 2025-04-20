import React, { useState, useEffect, useRef } from "react";
import {
  TowerControl as GameController,
  User,
  Search,
  X,
  Menu,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "@fontsource/poppins";

function NavBar() {
  const { user, logout, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Mock game data for suggestions
  const allGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      genre: "RPG",
    },
    {
      id: 2,
      title: "Red Dead Redemption 2",
      genre: "Action",
    },
    {
      id: 3,
      title: "The Witcher 3",
      genre: "RPG",
    },
    {
      id: 4,
      title: "Grand Theft Auto V",
      genre: "Action",
    },
    {
      id: 5,
      title: "Elden Ring",
      genre: "RPG",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allGames.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    navigate(`/search?q=${encodeURIComponent(suggestion.title)}`);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Add useEffect to handle authentication state changes
  useEffect(() => {
    // This will ensure the component re-renders when auth state changes
    console.log("Auth state changed:", { user, loading });
  }, [user, loading]);

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
              <div ref={searchRef} className="relative">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() =>
                      searchTerm.trim() && setShowSuggestions(true)
                    }
                    className="bg-gray-900/50 border border-gray-700 rounded-full px-3 py-2 pl-12 pr-10 focus:outline-none focus:border-purple-500 w-full md:w-80"
                  />
                  {searchTerm && (
                    <X
                      onClick={() => {
                        setSearchTerm("");
                        setShowSuggestions(false);
                      }}
                      className="absolute right-4 top-3 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
                    />
                  )}
                </form>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 shadow-lg z-50">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-purple-500/20 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {suggestion.title}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {suggestion.genre}
                          </p>
                        </div>
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/games"
                className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110"
              >
                Games
              </Link>
              <Link
                to="/categories"
                className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110"
              >
                Categories
              </Link>
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-4">
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110"
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 rounded-4xl flex items-center gap-1 px-3 py-1 hover:cursor-pointer hover:bg-red-700"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link to="/login">
                      <button className="bg-purple-500 rounded-4xl flex items-center gap-1 px-3 py-1 hover:cursor-pointer hover:bg-purple-700">
                        <User className="w-5 h-5" />
                        <span>Login</span>
                      </button>
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden mr-6"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-8 h-8 text-white" />
              ) : (
                <Menu className="w-8 h-8 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden absolute top-[10vh] text-white left-0 w-full bg-black/70 backdrop-blur-md flex flex-col items-center py-4 gap-4 z-40">
              <div ref={searchRef} className="relative w-10/12">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() =>
                      searchTerm.trim() && setShowSuggestions(true)
                    }
                    className="bg-gray-900/50 border border-gray-700 rounded-full px-3 py-2 pl-12 pr-10 focus:outline-none focus:border-purple-500 w-full"
                  />
                  {searchTerm && (
                    <X
                      onClick={() => {
                        setSearchTerm("");
                        setShowSuggestions(false);
                      }}
                      className="absolute right-4 top-3 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
                    />
                  )}
                </form>

                {/* Mobile Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 shadow-lg z-50">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-purple-500/20 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {suggestion.title}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {suggestion.genre}
                          </p>
                        </div>
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavigation("/games")}
                className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110"
              >
                Games
              </button>
              <button
                onClick={() => handleNavigation("/categories")}
                className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110"
              >
                Categories
              </button>
              {!loading && (
                <>
                  {user ? (
                    <div className="flex flex-col items-center gap-4">
                      {user.role === "admin" && (
                        <button
                          onClick={() => handleNavigation("/admin")}
                          className="opacity-70 font-poppins hover:cursor-pointer hover:text-purple-500 transition-colors hover:scale-110"
                        >
                          Admin
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 rounded-4xl flex items-center gap-1 px-3 py-1 hover:cursor-pointer hover:bg-red-700"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="bg-purple-500 rounded-4xl flex items-center gap-1 px-3 py-1 hover:cursor-pointer hover:bg-purple-700"
                    >
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
