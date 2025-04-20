import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Gamepad2,
  Users,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
} from "lucide-react";
import axios from "axios";
import { games as staticGames } from "../data/game";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("games");
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGames: 0,
    totalAdmins: 0,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch dashboard stats
        const statsResponse = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(statsResponse.data);

        // Fetch games from database
        const gamesResponse = await axios.get(
          "http://localhost:5000/api/admin/games",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Combine database games with static games
        const dbGames = gamesResponse.data;
        const combinedGames = [
          ...dbGames,
          ...staticGames.map((game) => ({
            ...game,
            isStatic: true, // Flag to identify static games
            _id: `static-${game.id}`, // Create a unique ID for static games
          })),
        ];

        setGames(combinedGames);

        // Fetch users
        const usersResponse = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(usersResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDeleteGame = async (gameId) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        const token = localStorage.getItem("token");

        if (gameId.toString().startsWith("static-")) {
          // Handle static game deletion
          const gameIdNumber = parseInt(gameId.split("-")[1]);

          // Remove from local state
          setGames((prevGames) =>
            prevGames.filter((game) =>
              game.isStatic ? game.id !== gameIdNumber : true
            )
          );

          // Show success message
          alert("Game removed from the platform successfully");
        } else {
          // Handle database game deletion
          await axios.delete(
            `http://localhost:5000/api/admin/games/${gameId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Remove from local state
          setGames((prevGames) =>
            prevGames.filter((game) => game._id !== gameId)
          );

          // Show success message
          alert("Game deleted successfully");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete game");
        alert("Failed to delete game. Please try again.");
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user role");
    }
  };

  const renderGamesTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Games</h2>
        <button
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg flex items-center"
          onClick={() => navigate("/admin/games/new")}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Game
        </button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading games...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games
            .filter(
              (game) =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.genre.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((game) => (
              <div
                key={game._id}
                className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-48 object-cover"
                  />
                  {game.isStatic && (
                    <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                      Static Game
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{game.title}</h3>
                      <p className="text-gray-400 text-sm">{game.genre}</p>
                    </div>
                    <div className="flex gap-2">
                      {!game.isStatic ? (
                        <>
                          <button
                            className="text-blue-500 hover:text-blue-400"
                            onClick={() =>
                              navigate(`/admin/games/${game._id}/edit`)
                            }
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-400"
                            onClick={() => handleDeleteGame(game._id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <button
                          className="text-red-500 hover:text-red-400"
                          onClick={() => handleDeleteGame(game._id)}
                          title="Remove from platform"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        className="text-green-500 hover:text-green-400"
                        onClick={() =>
                          window.open(game.streamUrl || "#", "_blank")
                        }
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <p className="text-white">{game.rating}/5</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Players</p>
                      <p className="text-white">{game.players || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Developer</p>
                      <p className="text-white">{game.developer}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Release Date</p>
                      <p className="text-white">{game.releaseDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );

  const renderUsersTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Users</h2>
        <div className="text-sm text-gray-400">
          Total Users: {stats.totalUsers} | Admins: {stats.totalAdmins}
        </div>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users
                .filter(
                  (user) =>
                    user.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              user.avatar || "https://via.placeholder.com/40"
                            }
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateUserRole(user._id, e.target.value)
                        }
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          className="text-red-500 hover:text-red-400"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Enable Email Notifications</span>
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-500 rounded focus:ring-purple-500 border-gray-700 bg-gray-800"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                Enable Two-Factor Authentication
              </span>
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-500 rounded focus:ring-purple-500 border-gray-700 bg-gray-800"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Dark Mode</span>
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-500 rounded focus:ring-purple-500 border-gray-700 bg-gray-800"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Language</span>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      {/* Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900/50 backdrop-blur-md border-r border-gray-800">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Welcome, {user.name}</p>
        </div>

        <nav className="mt-8">
          <button
            onClick={() => setActiveTab("games")}
            className={`flex items-center w-full px-6 py-3 ${
              activeTab === "games"
                ? "bg-purple-500/20 text-purple-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-5 h-5 mr-3" />
            Manage Games
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center w-full px-6 py-3 ${
              activeTab === "users"
                ? "bg-purple-500/20 text-purple-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-6 py-3 ${
              activeTab === "settings"
                ? "bg-purple-500/20 text-purple-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-gray-400 hover:text-white mt-8"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === "games" && renderGamesTab()}
        {activeTab === "users" && renderUsersTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;
