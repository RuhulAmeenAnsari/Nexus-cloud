import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "@fontsource/poppins";
import { Star } from "lucide-react";
import { games } from "../data/game";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (query) {
      const results = games.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.genre.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [location.search]);

  const handlePlayNow = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-950">
      <div className="px-6 md:px-16 lg:px-28">
        <h1 className="text-3xl font-bold text-white font-poppins">
          Search Results
        </h1>
        <p className="font-poppins text-gray-400 mt-3">
          {searchResults.length} games found
        </p>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {searchResults.map((game) => (
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

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">{game.title}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 h-5 w-5" />
                    <span className="text-white">{game.rating}</span>
                  </div>
                </div>
                <p className="text-gray-400 mt-3 line-clamp-2">
                  {game.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {game.players} players
                  </span>
                  <button
                    onClick={() => handlePlayNow(game.id)}
                    className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-xl">
              No games found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
