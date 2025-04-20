import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Image as ImageIcon,
  Upload,
  X,
  Maximize2,
} from "lucide-react";

const GameForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [game, setGame] = useState({
    title: "",
    description: "",
    genre: "",
    rating: 0,
    image: "",
    screenshots: [],
    players: 0,
    playTime: 0,
    releaseDate: "",
    developer: "",
    publisher: "",
    systemRequirements: {
      minimum: {
        cpu: "",
        gpu: "",
        ram: "",
        storage: "",
      },
      recommended: {
        cpu: "",
        gpu: "",
        ram: "",
        storage: "",
      },
    },
    price: 0,
    isAvailable: true,
    streamUrl: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [screenshotErrors, setScreenshotErrors] = useState({});

  useEffect(() => {
    if (isEdit && id) {
      const fetchGame = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/api/admin/games/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setGame(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch game");
          setLoading(false);
        }
      };
      fetchGame();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      // Handle nested objects (system requirements)
      const [parent, child, field] = name.split(".");
      setGame((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: {
            ...prev[parent][child],
            [field]: value,
          },
        },
      }));
    } else {
      setGame((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/admin/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.url) {
          setGame((prev) => ({
            ...prev,
            image: response.data.url,
          }));
          setImageError(false);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Image upload error:", err);
        setError(err.response?.data?.message || "Failed to upload image");
        setImageError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleScreenshotUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("screenshots", file);
        });

        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/admin/upload-screenshots",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && Array.isArray(response.data.urls)) {
          setGame((prev) => ({
            ...prev,
            screenshots: [...prev.screenshots, ...response.data.urls],
          }));
          // Reset any existing screenshot errors
          setScreenshotErrors({});
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Screenshot upload error:", err);
        setError(err.response?.data?.message || "Failed to upload screenshots");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveScreenshot = (index) => {
    setGame((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      const requiredFields = [
        "title",
        "description",
        "genre",
        "image",
        "releaseDate",
        "developer",
        "publisher",
        "price",
        "streamUrl",
      ];

      const missingFields = requiredFields.filter((field) => !game[field]);
      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
      }

      const token = localStorage.getItem("token");
      const url = isEdit
        ? `http://localhost:5000/api/admin/games/${id}`
        : "http://localhost:5000/api/admin/games";

      // Format the data
      const gameData = {
        ...game,
        releaseDate: new Date(game.releaseDate).toISOString(),
        price: Number(game.price),
        players: Number(game.players),
        playTime: Number(game.playTime),
        rating: Number(game.rating),
      };

      const response = await axios[isEdit ? "put" : "post"](url, gameData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/admin");
    } catch (err) {
      console.error("Save game error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to save game"
      );
      setLoading(false);
    }
  };

  const handleImagePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewImage(null);
  };

  const handleImageError = (type, index = null) => {
    if (type === "main") {
      setImageError(true);
    } else if (type === "screenshot" && index !== null) {
      setScreenshotErrors((prev) => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  if (loading && !game.title) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-8">
          {isEdit ? "Edit Game" : "Add New Game"}
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={game.title}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Genre *
              </label>
              <input
                type="text"
                name="genre"
                value={game.genre}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={game.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Main Image *
            </label>
            <div className="flex items-center space-x-4">
              {game.image ? (
                <div className="relative group">
                  {imageError ? (
                    <div className="w-32 h-32 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  ) : (
                    <img
                      src={game.image}
                      alt="Game cover"
                      className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => handleImagePreview(game.image)}
                      onError={() => handleImageError("main")}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setGame((prev) => ({ ...prev, image: "" }));
                      setImageError(false);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {!imageError && (
                    <button
                      type="button"
                      onClick={() => handleImagePreview(game.image)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    >
                      <Maximize2 className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-purple-500">
                  <div className="flex flex-col items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload Image</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Screenshots
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {game.screenshots.map((screenshot, index) => (
                <div key={index} className="relative group">
                  {screenshotErrors[index] ? (
                    <div className="w-full h-32 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  ) : (
                    <img
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => handleImagePreview(screenshot)}
                      onError={() => handleImageError("screenshot", index)}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveScreenshot(index);
                      setScreenshotErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors[index];
                        return newErrors;
                      });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {!screenshotErrors[index] && (
                    <button
                      type="button"
                      onClick={() => handleImagePreview(screenshot)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    >
                      <Maximize2 className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
              ))}
              <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-purple-500">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-400">Add Screenshots</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleScreenshotUpload}
                />
              </label>
            </div>
          </div>

          {/* Game Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Developer *
              </label>
              <input
                type="text"
                name="developer"
                value={game.developer}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Publisher *
              </label>
              <input
                type="text"
                name="publisher"
                value={game.publisher}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Release Date *
              </label>
              <input
                type="date"
                name="releaseDate"
                value={game.releaseDate}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={game.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={game.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Players
              </label>
              <input
                type="number"
                name="players"
                value={game.players}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Play Time (hours)
              </label>
              <input
                type="number"
                name="playTime"
                value={game.playTime}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* System Requirements */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              System Requirements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Minimum Requirements */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Minimum</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    CPU
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.minimum.cpu"
                    value={game.systemRequirements.minimum.cpu}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    GPU
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.minimum.gpu"
                    value={game.systemRequirements.minimum.gpu}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    RAM
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.minimum.ram"
                    value={game.systemRequirements.minimum.ram}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Storage
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.minimum.storage"
                    value={game.systemRequirements.minimum.storage}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Recommended Requirements */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-400">
                  Recommended
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    CPU
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.recommended.cpu"
                    value={game.systemRequirements.recommended.cpu}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    GPU
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.recommended.gpu"
                    value={game.systemRequirements.recommended.gpu}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    RAM
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.recommended.ram"
                    value={game.systemRequirements.recommended.ram}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Storage
                  </label>
                  <input
                    type="text"
                    name="systemRequirements.recommended.storage"
                    value={game.systemRequirements.recommended.storage}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stream URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Stream URL *
            </label>
            <input
              type="url"
              name="streamUrl"
              value={game.streamUrl}
              onChange={handleChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : isEdit ? "Update Game" : "Add Game"}
            </button>
          </div>
        </form>
      </div>

      {/* Image Preview Modal */}
      {showPreview &&
        previewImage &&
        !imageError &&
        !screenshotErrors[previewImage] && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closePreview}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-[80vh] w-full object-contain rounded-lg"
                onError={() => {
                  closePreview();
                  setError("Failed to load preview image");
                }}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default GameForm;
