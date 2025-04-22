import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "@fontsource/poppins";
import { Star, Search, Filter } from "lucide-react";
import { games } from "../data/game";
import Loader from "../components/Loader";

function GamesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const genres = ["All", ...new Set(games.map((game) => game.genre))];

  useEffect(() => {
    // Simulate API loading time
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = games.filter((game) => {
        const matchesSearch = game.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesGenre =
          selectedGenre === "All" || game.genre === selectedGenre;
        return matchesSearch && matchesGenre;
      });
      setFilteredGames(filtered);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedGenre]);

  const handlePlayNow = (gameId) => {
    if (!user) {
      alert("Please login to play games");
      navigate("/login");
      return;
    }
    navigate(`/game/${gameId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-950 px-6 md:px-16 lg:px-28">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">All Games</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 text-white"
            />
            <Search className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
          </div>
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full md:w-48 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 text-white appearance-none"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-purple-400 px-3 py-1 rounded-2xl bg-purple-600/20 text-sm">
                    {game.genre}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{game.title}</h3>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="text-yellow-400 w-4 h-4" />
                  <span className="text-white text-sm">{game.rating}</span>
                </div>
                <button
                  onClick={() => handlePlayNow(game.id)}
                  className="w-full mt-4 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {user ? "Play Now" : "Login to Play"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamesPage;
