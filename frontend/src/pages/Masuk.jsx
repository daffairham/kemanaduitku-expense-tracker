import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import HeroSlogan from "../components/HeroSlogan";
import Button from "../components/Button";

export default function Masuk() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    sandi: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.sandi,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login gagal. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen max-w-6xl mx-auto px-6 gap-4">
      <HeroSlogan />
      <div className="flex flex-col max-w-2xl mx-auto justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-[#5BB77B] font-semibold text-2xl md:text-3xl lg:text-4xl">
            MASUK
          </h1>
          <p className="font-light mb-2.5">
            Masuk ke dalam sistem Kemanaduitku untuk melacak keuanganmu.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white px-4 py-2 rounded-lg border border-[#9A9896] focus:border-[#5BB77B] mb-4"
              required
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="sandi">Kata sandi</label>
            <input
              id="sandi"
              name="sandi"
              type="password"
              value={formData.sandi}
              onChange={handleChange}
              className="w-full bg-white px-4 py-2 rounded-lg border border-[#9A9896] focus:border-[#5BB77B] mb-4"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              label={loading ? "Memproses..." : "Masuk"}
              disabled={loading}
            />
          </div>
        </form>

        <p className="font-light mt-2.5">
          Belum punya akun?{" "}
          <Link to="/daftar" className="text-[#00B9FD]">
            Daftar sekarang!
          </Link>
        </p>
      </div>
    </div>
  );
}
