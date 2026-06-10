import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); // "loading" | "auth" | "unauth"

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
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

  if (status === "unauth") {
    return <Navigate to="/masuk" replace />;
  }

  return children;
}
