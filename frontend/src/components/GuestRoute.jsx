import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function GuestRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
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
