import { useEffect, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TransaksiCard from "../components/TransaksiCard";
import EditModal from "../components/EditModal";

const kategoriOptions = [
  "Semua",
  "Gaji",
  "Makanan",
  "Transportasi",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Lainnya",
];

//convert int ke rupiah
function formatRupiah(amount) {
  return "Rp. " + Number(amount).toLocaleString("id-ID");
}

function TransaksiRow({ transaksi, onDelete, onEdit }) {
  const isIncome = transaksi.type === "income";
  return (
    <tr className="border-b border-gray-200 last:border-0">
      <td className="py-4 pr-4 text-sm text-gray-700 whitespace-nowrap">
        {transaksi.transaction_date?.split("T")[0]}
      </td>
      <td
        className={`py-4 pr-4 text-sm font-semibold whitespace-nowrap ${isIncome ? "text-[#5BB77B]" : "text-orange-400"}`}
      >
        {isIncome ? "Pemasukkan" : "Pengeluaran"}
      </td>
      <td className="py-4 pr-4 text-sm font-medium text-gray-800">
        {transaksi.category}
      </td>
      <td className="py-4 pr-4 text-sm text-gray-700 whitespace-nowrap">
        {formatRupiah(transaksi.amount)}
      </td>
      <td className="py-4 pr-4 text-sm text-gray-500 max-w-xs truncate">
        {transaksi.description}
      </td>
      <td className="py-4 text-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onEdit(transaksi)}
            className="text-gray-600 hover:text-[#5BB77B] transition-colors cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(transaksi.t_id)}
            className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function DaftarTransaksi() {
  const [transaksi, setTransaksi] = useState([]); //state untuk data transaksi
  const [loading, setLoading] = useState(true); //state untuk loading
  const [search, setSearch] = useState(""); //state untuk search bar
  const [filterTipe, setFilterTipe] = useState("Semua"); //state filter tipe
  const [filterKategori, setFilterKategori] = useState("Semua"); //state filter kategori
  const [selectedTransaksi, setSelectedTransaksi] = useState(null); //state untuk modal edit

  //ambil data transaksi dari db
  useEffect(() => {
    fetchTransaksi();
  }, []);

  async function fetchTransaksi() {
    try {
      const res = await axios.get("/api/transactions", {
        withCredentials: true,
      });
      setTransaksi(res.data.getUserTrx);
    } catch (error) {
      console.error("Gagal fetch transaksi:", error);
    } finally {
      setLoading(false);
    }
  }

  //fungsi buat delete transaksi
  async function handleDelete(id) {
    try {
      await axios.delete(`/api/transactions/${id}`, { withCredentials: true });
      setTransaksi(transaksi.filter((t) => t.t_id !== id));
    } catch (error) {
      console.error("Gagal hapus transaksi:", error);
    }
  }

  function handleEdit(transaksi) {
    setSelectedTransaksi(transaksi);
  }

  function handleCloseModal() {
    setSelectedTransaksi(null);
  }

  function handleEditSuccess() {
    fetchTransaksi();
  }

  const filtered = transaksi.filter((t) => {
    const matchSearch =
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchTipe =
      filterTipe === "Semua" ||
      (filterTipe === "Pemasukkan" && t.type === "income") ||
      (filterTipe === "Pengeluaran" && t.type === "expense");

    const matchKategori =
      filterKategori === "Semua" || t.category === filterKategori;

    return matchSearch && matchTipe && matchKategori;
  });

  return (
    <div className="min-h-screen bg-[#EDECEA]">
      <Navbar activePage="transaksi" />

      <main className="px-4 md:px-6 py-6 max-w-5xl mx-auto pb-24 md:pb-6">
        <h1 className="text-[#5BB77B] font-black text-2xl md:text-3xl mb-6">
          DAFTAR TRANSAKSI
        </h1>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kategori atau deskripsi transaksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5BB77B]/40"
          />
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BB77B]/40 cursor-pointer"
          >
            <option>Semua</option>
            <option>Pemasukkan</option>
            <option>Pengeluaran</option>
          </select>

          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BB77B]/40 cursor-pointer"
          >
            {kategoriOptions.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400 text-center py-12">
            Memuat transaksi...
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-12">
            Ga ada transaksi yang cocok.
          </p>
        ) : (
          <>
            <div className="md:hidden flex flex-col gap-3">
              {filtered.map((t) => (
                <TransaksiCard
                  key={t.t_id}
                  transaksi={t}
                  showActions={true}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            <table className="hidden md:table w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="pb-3 pr-4 text-left text-sm font-medium text-gray-500">
                    Tanggal
                  </th>
                  <th className="pb-3 pr-4 text-left text-sm font-medium text-gray-500">
                    Tipe
                  </th>
                  <th className="pb-3 pr-4 text-left text-sm font-medium text-gray-500">
                    Kategori
                  </th>
                  <th className="pb-3 pr-4 text-left text-sm font-medium text-gray-500">
                    Jumlah
                  </th>
                  <th className="pb-3 pr-4 text-left text-sm font-medium text-gray-500">
                    Deskripsi
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <TransaksiRow
                    key={t.t_id}
                    transaksi={t}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>

      {selectedTransaksi && (
        <EditModal
          transaksi={selectedTransaksi}
          onClose={handleCloseModal}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
