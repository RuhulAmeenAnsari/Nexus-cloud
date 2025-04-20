import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { Star, Search } from "lucide-react";
import { games } from "../data/game";

function GamesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState(games);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = games.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query)
    );
    setFilteredGames(filtered);
  };

  const handlePlayNow = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-950">
      <div className="px-6 md:px-16 lg:px-28">
        <h1 className="text-3xl font-bold text-white font-poppins">
          All Games
        </h1>
        <p className="font-poppins text-gray-400 mt-3">
          Browse our complete collection of games
        </p>

        {/* Search Bar */}
        <div className="relative mt-8">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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

        {filteredGames.length === 0 && (
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

export default GamesPage;
