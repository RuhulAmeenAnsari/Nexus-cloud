import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { Star, ArrowLeft, Clock, Users, Calendar, Play, Trophy, Gamepad2, Globe, CalendarDays } from "lucide-react";
import axios from "axios";
import { games } from "../data/game";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function GameDetails() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarGames, setSimilarGames] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        
        // First check if this is the 2048 game in our local games data
        const localGame = games.find(g => g.id.toString() === gameId);
        if (localGame && localGame.title === "2048 Game" && localGame.gameUrl) {
          setGame(localGame);
          // Get similar games from the same category
          const similar = games
            .filter(g => g.category === localGame.category && g.id !== localGame.id)
            .slice(0, 3);
          setSimilarGames(similar);
          setError(null);
          setIsLoading(false);
          return;
        }

        // If not 2048 game, fetch from API
        const response = await axios.get(
          `http://localhost:8080/api/games/${gameId}`
        );
        setGame(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setError(
          error.response?.data?.message || "Failed to load game details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (gameId) {
      fetchGameDetails();
    }
  }, [gameId]);

  const handlePlayNow = () => {
    if (!user) {
      alert("Please login to play games");
      navigate("/login");
      return;
    }

    if (game.title === "2048 Game" && game.gameUrl) {
      window.location.href = game.gameUrl;
    } else {
      navigate(`/stream/${game.id}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error || !game) {
    return (
      <div className="min-h-screen pt-24 bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl">{error || "Game not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-950">
      <div className="px-6 md:px-16 lg:px-28">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Game Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white">{game.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                {game.genre && (
                  <span className="text-purple-400 px-3 py-1 rounded-2xl bg-purple-600/20">
                    {game.genre}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 w-5 h-5" />
                  <span className="text-white">{game.rating}</span>
                </div>
              </div>
            </div>

            {/* Game Description */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">About the Game</h2>
              <p className="text-gray-400">{game.description}</p>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>Players</span>
                </div>
                <p className="text-white text-xl mt-1">{game.players}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Genre</span>
                </div>
                <p className="text-white text-xl mt-1">{game.genre}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Globe className="w-5 h-5" />
                  <span>Category</span>
                </div>
                <p className="text-white text-xl mt-1">{game.category}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarDays className="w-5 h-5" />
                  <span>Released</span>
                </div>
                <p className="text-white text-xl mt-1">{game.releaseDate}</p>
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={handlePlayNow}
              className="w-full bg-purple-500 text-white py-4 rounded-lg hover:bg-purple-600 transition-colors text-lg font-semibold flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              <span>{user ? "Play Now" : "Login to Play"}</span>
            </button>
          </div>

          {/* Game Image and Details */}
          <div className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Developer Info */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Developer Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Developer</p>
                  <p className="text-white">{game.developer}</p>
                </div>
                <div>
                  <p className="text-gray-400">Publisher</p>
                  <p className="text-white">{game.publisher}</p>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Screenshots</h3>
                <div className="grid grid-cols-2 gap-4">
                  {game.screenshots.map((screenshot, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={screenshot}
                        alt={`${game.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Games */}
        {similarGames.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarGames.map((similarGame) => (
                <div
                  key={similarGame.id}
                  className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/game/${similarGame.id}`)}
                >
                  <div className="relative h-48">
                    <img
                      src={similarGame.image}
                      alt={similarGame.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-purple-400 px-3 py-1 rounded-2xl bg-purple-600/20 text-sm">
                        {similarGame.genre}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white">{similarGame.title}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="text-yellow-400 w-4 h-4" />
                      <span className="text-white text-sm">{similarGame.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetails;
