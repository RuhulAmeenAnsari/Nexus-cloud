import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GameStream from "../components/GameStream";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const StreamGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const fetchGameData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`Fetching game data for ID: ${gameId}`);

      // Validate gameId format - allow both string and numeric IDs
      if (!gameId) {
        setError("Game ID is required");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/games/${gameId}`,
        {
          timeout: 5000, // 5 second timeout
        }
      );

      if (response.data) {
        console.log("Game data received:", response.data);
        setGame(response.data);
      } else {
        setError("Game not found");
      }
    } catch (error) {
      console.error("Error fetching game data:", error);

      if (error.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to game server. Please make sure the server is running."
        );
      } else if (error.response?.status === 404) {
        setError(
          `Game '${gameId}' not found. Please check the game identifier.`
        );
      } else {
        setError(error.response?.data?.message || "Failed to load game data");
      }

      // Retry logic
      if (retryCount < maxRetries) {
        console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
        }, 2000); // Retry after 2 seconds
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchGameData();
    }
  }, [gameId, retryCount]);

  const handleRetry = () => {
    setRetryCount(0); // Reset retry count
    fetchGameData();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="bg-red-600/20 border border-red-600 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error}</p>
            {retryCount < maxRetries && (
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Retry Connection
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !game) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold text-white">{game.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              {game.streamingConfig && (
                <span className="text-gray-400">
                  {game.streamingConfig.width}x{game.streamingConfig.height} @
                  {game.streamingConfig.fps}fps
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Stream */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <GameStream gameId={game.id} executablePath={game.executablePath} />
        </div>

        {/* Game Info */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">
              Game Settings
            </h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <dl className="space-y-2">
                <div>
                  <dt className="text-gray-400">Game ID</dt>
                  <dd className="text-white font-mono text-sm">{game.id}</dd>
                </div>
                {game.genre && (
                  <div>
                    <dt className="text-gray-400">Genre</dt>
                    <dd className="text-white">{game.genre}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
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
};

export default StreamGame;
