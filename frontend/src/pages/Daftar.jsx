import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSlogan from "../components/HeroSlogan";
import Button from "../components/Button";

export default function Daftar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
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
      await axios.post("/api/auth/register", {
        name: formData.nama,
        email: formData.email,
        password: formData.sandi,
      });

      navigate("/masuk");
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal. Coba lagi.");
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
            REGISTRASI AKUN
          </h1>
          <p className="font-light mb-2.5">
            Buat akun untuk mulai melacak keuanganmu di Kemanaduitku.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="nama">Masukkan nama kamu</label>
            <input
              id="nama"
              name="nama"
              type="text"
              value={formData.nama}
              onChange={handleChange}
              className="w-full bg-white px-4 py-2 rounded-lg border border-[#9A9896] focus:border-[#5BB77B] mb-2"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="email">Masukkan e-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white px-4 py-2 rounded-lg border border-[#9A9896] focus:border-[#5BB77B] mb-2"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="sandi">Masukkan kata sandi</label>
            <input
              id="sandi"
              name="sandi"
              type="password"
              value={formData.sandi}
              onChange={handleChange}
              className="w-full bg-white px-4 py-2 rounded-lg border border-[#9A9896] focus:border-[#5BB77B] mb-4"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              label={loading ? "Memproses..." : "Daftar"}
              disabled={loading}
            />
          </div>
        </form>

        <p className="font-light mt-2.5">
          Sudah punya akun?{" "}
          <Link to="/masuk" className="text-[#00B9FD]">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
