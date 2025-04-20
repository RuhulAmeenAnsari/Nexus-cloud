import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar";
import "@fontsource/poppins/400.css";
import Loginpage from "./pages/Loginpage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SearchResults from "./pages/SearchResults";
import GamesPage from "./pages/GamesPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryGames from "./pages/CategoryGames";
import GameDetails from "./pages/GameDetails";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import GameForm from "./pages/GameForm";
import StreamGame from "./pages/StreamGame";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:categoryName" element={<CategoryGames />} />
            <Route path="/game/:gameId" element={<GameDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/games/new" element={<GameForm />} />
            <Route
              path="/admin/games/:id/edit"
              element={<GameForm isEdit={true} />}
            />
            <Route path="/stream/:gameId" element={<StreamGame />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
