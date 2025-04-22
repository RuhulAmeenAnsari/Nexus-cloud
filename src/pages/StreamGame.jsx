import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GameStream from "../components/GameStream";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { games } from "../data/game";

const StreamGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      alert("Please login to play games");
      navigate("/login");
      return;
    }

    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        
        // First check if this is the 2048 game in our local games data
        const localGame = games.find(g => g.id.toString() === gameId);
        if (localGame && localGame.title === "2048 Game" && localGame.gameUrl) {
          setGame(localGame);
          setError(null);
          setIsLoading(false);
          window.location.href = localGame.gameUrl;
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
  }, [gameId, user, navigate]);

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

        {/* Game Stream */}
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <iframe
            src={game.streamUrl}
            className="w-full h-full"
            title={game.title}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default StreamGame;
