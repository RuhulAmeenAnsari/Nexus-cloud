import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { Star, ArrowLeft, Clock, Users, Calendar } from "lucide-react";
import axios from "axios";

function GameDetails() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
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
              <h1 className="text-4xl font-bold text-white">{game.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                {game.genre && (
                  <span className="text-purple-400 px-3 py-1 rounded-2xl bg-purple-600/20">
                    {game.genre}
                  </span>
                )}
              </div>
            </div>

            {/* Game Details */}
            <div className="grid grid-cols-2 gap-4">
              {game.streamingConfig && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span>
                    {game.streamingConfig.width}x{game.streamingConfig.height} @
                    {game.streamingConfig.fps}fps
                  </span>
                </div>
              )}
            </div>

            {/* Play Button */}
            <button
              onClick={() => navigate(`/stream/${game.id}`)}
              className="w-full bg-purple-500 text-white py-4 rounded-lg hover:bg-purple-600 transition-colors text-lg font-semibold"
            >
              Play Now
            </button>
          </div>

          {/* Stream Settings */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Stream Settings
              </h3>
              <dl className="space-y-2">
                {game.streamingConfig &&
                  Object.entries(game.streamingConfig).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-gray-400">{key}</dt>
                      <dd className="text-white">{value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
