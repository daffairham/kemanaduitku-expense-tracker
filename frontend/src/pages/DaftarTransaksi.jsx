import { useState } from "react";
import { Search } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import TransaksiCard from "../components/TransaksiCard";

const dummyTransaksi = [
  {
    t_id: 1,
    transaction_date: "20-05-2026",
    type: "income",
    category: "Gaji",
    amount: 7500000,
    description: "Gaji pertamaku",
  },
  {
    t_id: 2,
    transaction_date: "20-05-2026",
    type: "expense",
    category: "Hiburan",
    amount: 100000,
    description: "Top-up beli skin",
  },
  {
    t_id: 3,
    transaction_date: "20-05-2026",
    type: "expense",
    category: "Transportasi",
    amount: 30000,
    description: "Otw kantor",
  },
  {
    t_id: 4,
    transaction_date: "20-05-2026",
    type: "income",
    category: "Freelance",
    amount: 300000,
    description: "Joki akun valo",
  },
  {
    t_id: 5,
    transaction_date: "20-05-2026",
    type: "income",
    category: "Freelance",
    amount: 300000,
    description: "Joki akun valo",
  },
];

const kategoriOptions = [
  "Kategori",
  "Gaji",
  "Hiburan",
  "Transportasi",
  "Freelance",
  "Makanan",
];

function formatRupiah(amount) {
  return "Rp. " + amount.toLocaleString("id-ID");
}

function TransaksiRow({ transaksi }) {
  const isIncome = transaksi.type === "income";
  return (
    <tr className="border-b border-gray-200 last:border-0">
      <td className="py-4 pr-4 text-sm text-gray-700 whitespace-nowrap">
        {transaksi.transaction_date}
      </td>
      <td
        className={`py-4 pr-4 text-sm font-medium whitespace-nowrap ${isIncome ? "text-[#5BB77B]" : "text-orange-400"}`}
      >
        {isIncome ? "Pemasukkan" : "Pengeluaran"}
      </td>
      <td className="py-4 pr-4 text-sm text-gray-700">{transaksi.category}</td>
      <td className="py-4 pr-4 text-sm text-gray-700 whitespace-nowrap">
        {formatRupiah(transaksi.amount)}
      </td>
      <td className="py-4 pr-4 text-sm text-gray-700 max-w-xs truncate">
        {transaksi.description}
      </td>
      <td className="py-4 text-sm">
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            <Pencil className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function DaftarTransaksi() {
  const [search, setSearch] = useState("");
  const [filterTipe, setFilterTipe] = useState("Tipe");
  const [filterKategori, setFilterKategori] = useState("Kategori");

  const filtered = dummyTransaksi.filter((t) => {
    const matchSearch =
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchTipe =
      filterTipe === "Tipe" ||
      (filterTipe === "Pemasukkan" && t.type === "income") ||
      (filterTipe === "Pengeluaran" && t.type === "expense");

    const matchKategori =
      filterKategori === "Kategori" || t.category === filterKategori;

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
            <option>Tipe</option>
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

        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-12">
            Ga ada transaksi yang cocok.
          </p>
        )}

        <div className="md:hidden flex flex-col gap-3">
          {filtered.map((t) => (
            <TransaksiCard key={t.t_id} transaksi={t} showActions={true} />
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
              <TransaksiRow key={t.t_id} transaksi={t} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
