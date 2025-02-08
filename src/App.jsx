import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar";
import "@fontsource/poppins/400.css";
import Loginpage from "./pages/Loginpage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <Router>
        <NavBar/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
