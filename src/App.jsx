import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar";
import "@fontsource/poppins/400.css";
import Loginpage from "./pages/Loginpage";

function App() {
  return (
    <>
      {/* <NavBar/> */}
      {/* <LandingPage/> */}
      <Loginpage />
    </>
  );
}

export default App;
