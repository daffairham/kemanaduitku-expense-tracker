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
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <LandingPage />
          </GuestRoute>
        }
      />
      <Route
        path="/masuk"
        element={
          <GuestRoute>
            <Masuk />
          </GuestRoute>
        }
      />
      <Route
        path="/daftar"
        element={
          <GuestRoute>
            <Daftar />
          </GuestRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaksi"
        element={
          <ProtectedRoute>
            <DaftarTransaksi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tambah-transaksi"
        element={
          <ProtectedRoute>
            <TambahTransaksi />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
