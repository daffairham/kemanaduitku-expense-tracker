import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const kategoriOptions = [
  "Gaji",
  "Freelance",
  "Makanan",
  "Transportasi",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Lainnya",
];

export default function TambahTransaksi() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tanggal: "",
    tipe: "",
    kategori: "",
    jumlah: "",
    deskripsi: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validasi field wajib
    if (
      !formData.tanggal ||
      !formData.tipe ||
      !formData.kategori ||
      !formData.jumlah
    ) {
      setError("Semua field wajib diisi kecuali deskripsi.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "/api/transactions",
        {
          date: formData.tanggal,
          type: formData.tipe,
          category: formData.kategori,
          amount: Number(formData.jumlah),
          description: formData.deskripsi,
        },
        { withCredentials: true },
      );

      navigate("/transaksi");
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal menambah transaksi. Coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#EDECEA]">
      <Navbar activePage="tambah" />
      <main className="px-6 py-6 max-w-5xl mx-auto pb-24 md:pb-6">
        <h1 className="text-[#5BB77B] font-black text-2xl md:text-3xl mt-2 mb-6">
          TAMBAH TRANSAKSI
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm"
        >
          {/* Tanggal */}
          <div className="mb-4">
            <label
              htmlFor="tanggal"
              className="block text-gray-700 font-medium mb-2"
            >
              Tanggal Transaksi
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 cursor-pointer focus:ring-[#5BB77B]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tipe"
              className="block text-gray-700 font-medium mb-2"
            >
              Tipe
            </label>
            <select
              id="tipe"
              name="tipe"
              value={formData.tipe}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 cursor-pointer focus:ring-[#5BB77B] bg-white"
            >
              <option value="">Pilih tipe transaksi</option>
              <option value="income">Pemasukkan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          {/* Kategori */}
          <div className="mb-4">
            <label
              htmlFor="kategori"
              className="block text-gray-700 font-medium mb-2"
            >
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none cursor-pointer focus:ring-2 focus:ring-[#5BB77B] bg-white"
            >
              <option value="">Pilih kategori</option>
              {kategoriOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah */}
          <div className="mb-4">
            <label
              htmlFor="jumlah"
              className="block text-gray-700 font-medium mb-2"
            >
              Jumlah
            </label>
            <input
              type="number"
              id="jumlah"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              placeholder="Contoh: 50000"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
            />
          </div>

          {/* Deskripsi */}
          <div className="mb-6">
            <label
              htmlFor="deskripsi"
              className="block text-gray-700 font-medium mb-2"
            >
              Deskripsi{" "}
              <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows="3"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Tambahkan deskripsi singkat untuk transaksi ini"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BB77B] resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5BB77B] hover:bg-[#399c5c] transition-colors text-white font-medium py-2 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Tambah Transaksi"}
          </button>
        </form>
      </main>
    </div>
  );
}
