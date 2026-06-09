import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/style.css";
import LandingPage from "./pages/LandingPage";
import Masuk from "./pages/Masuk";
import Daftar from "./pages/Daftar";
import Dashboard from "./pages/Dashboard";
import TambahTransaksi from "./pages/TambahTransaksi";
import DaftarTransaksi from "./pages/DaftarTransaksi";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/masuk" element={<Masuk />} />

      <Route path="/daftar" element={<Daftar />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/tambah-transaksi" element={<TambahTransaksi />} />

      <Route path="/transaksi" element={<DaftarTransaksi />} />
    </Routes>
  );
}

export default App;
