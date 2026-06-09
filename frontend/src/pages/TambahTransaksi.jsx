import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function TambahTransaksi() {
  return (
    <div className="min-h-screen">
      <Navbar activePage="tambah" />
      <main className="px-6 py-6 max-w-5xl mx-auto">
        <h1 className="text-[#5BB77B] font-black text-2xl md:text-3xl mt-2 mb-4">
          TAMBAH TRANSAKSI
        </h1>

        <form className="max-w-lg mx-auto bg-[#EDECEA] p-6 rounded-lg shadow-md">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
            >
              <option value="">Pilih tipe transaksi</option>
              <option value="income">Pemasukkan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="kategori"
              className="block text-gray-700 font-medium mb-2"
            >
              Kategori
            </label>
            <input
              type="text"
              id="kategori"
              name="kategori"
              placeholder="Contoh: Makanan, Transportasi, Gaji, dll."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
            />
          </div>
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
              placeholder="Masukkan jumlah (cth: 50000)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="deskripsi"
              className="block text-gray-700 font-medium mb-2"
            >
              Deskripsi (opsional)
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows="3"
              placeholder="Tambahkan deskripsi singkat untuk transaksi ini"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BB77B]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#5BB77B] hover:bg-[#399c5c] transition-colors text-white font-medium py-2 rounded-lg shadow-md"
          >
            Tambah Transaksi
          </button>
        </form>
      </main>
    </div>
  );
}
