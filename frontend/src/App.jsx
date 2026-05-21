import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/style.css";
import LandingPage from "./pages/LandingPage";
import Masuk from "./pages/Masuk";
import Daftar from "./pages/Daftar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/masuk" element={<Masuk />} />

      <Route path="/daftar" element={<Daftar />} />

      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default App;
