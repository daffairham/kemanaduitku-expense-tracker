import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

export default function GuestRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .get("/api/auth/me")
      .then(() => setStatus("auth"))
      .catch(() => setStatus("unauth"));
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#EDECEA]">
        <p className="text-gray-400 text-sm">Memuat...</p>
      </div>
    );
  }

  if (status === "auth") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
