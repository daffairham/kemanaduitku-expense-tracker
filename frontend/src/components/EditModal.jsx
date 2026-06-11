import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const kategoriOptions = [
  "Gaji",
  "Makanan",
  "Transportasi",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Lainnya",
];

export default function EditModal({ transaksi, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    tanggal: "",
    tipe: "",
    kategori: "",
    jumlah: "",
    deskripsi: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (transaksi) {
      setFormData({
        tanggal: transaksi.transaction_date?.split("T")[0] || "",
        tipe: transaksi.type || "",
        kategori: transaksi.category || "",
        jumlah: transaksi.amount || "",
        deskripsi: transaksi.description || "",
      });
    }
  }, [transaksi]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

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
      await axios.put(
        `/api/transactions/${transaksi.t_id}`,
        {
          date: formData.tanggal,
          type: formData.tipe,
          category: formData.kategori,
          amount: Number(formData.jumlah),
          description: formData.deskripsi,
        },
        { withCredentials: true },
      );

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui transaksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#5BB77B]">EDIT TRANSAKSI</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors hover:cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium hover:cursor-pointer text-gray-700 mb-1">
              Tanggal Transaksi
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium cursor-pointer text-gray-700 mb-1">
              Tipe
            </label>
            <select
              name="tipe"
              value={formData.tipe}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB77B] bg-white">
              <option value="">Pilih tipe</option>
              <option value="income">Pemasukkan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB77B] bg-white">
              <option value="">Pilih kategori</option>
              {kategoriOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah
            </label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              min="0"
              placeholder="Contoh: 50000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi{" "}
              <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="2"
              placeholder="Deskripsi singkat"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5BB77B] resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600  hover:bg-gray-400 cursor-pointer transition-colors font-medium py-2 rounded-lg text-sm">
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#5BB77B] hover:bg-[#399c5c] transition-colors cursor-pointer text-white font-medium py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
