import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TransaksiCard from "../components/TransaksiCard";

const dummySummary = {
  balance: 8070000,
  totalPemasukkan: 8100000,
  totalPengeluaran: 30000,
};

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

function formatRupiah(amount) {
  return "Rp. " + amount.toLocaleString("id-ID");
}

function SummaryCard({ label, amount, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 flex flex-col gap-2`}>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xl font-bold text-gray-900">{formatRupiah(amount)}</p>
    </div>
  );
}

function TransaksiRow({ transaksi }) {
  const isIncome = transaksi.type === "income";
  return (
    <tr className="border-b border-gray-200 last:border-0">
      <td className="py-3 pr-4 text-sm text-gray-700 whitespace-nowrap">
        {transaksi.transaction_date}
      </td>
      <td
        className={`py-3 pr-4 text-sm font-medium whitespace-nowrap ${isIncome ? "text-[#5BB77B]" : "text-orange-400"}`}
      >
        {isIncome ? "Pemasukkan" : "Pengeluaran"}
      </td>
      <td className="py-3 pr-4 text-sm text-gray-700">{transaksi.category}</td>
      <td className="py-3 pr-4 text-sm text-gray-700 whitespace-nowrap">
        {formatRupiah(transaksi.amount)}
      </td>
      <td className="py-3 text-sm text-gray-700">{transaksi.description}</td>
    </tr>
  );
}

export default function Dashboard() {
  // Ambil 5 transaksi terakhir
  const recentTransaksi = dummyTransaksi.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#EDECEA]">
      <Navbar activePage="dashboard" />

      <main className="px-6 py-6 max-w-5xl mx-auto pb-24 md:pb-6">
        <h1 className="text-[#5BB77B] font-black text-2xl md:text-3xl mb-6">
          DASHBOARD
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            label="Balance"
            amount={dummySummary.balance}
            bgColor="bg-[#4DD9E6]"
          />
          <SummaryCard
            label="Total Pemasukkan"
            amount={dummySummary.totalPemasukkan}
            bgColor="bg-[#7EE84A]"
          />
          <SummaryCard
            label="Total Pengeluaran"
            amount={dummySummary.totalPengeluaran}
            bgColor="bg-[#F5D04A]"
          />
        </div>

        {/* Riwayat Transaksi */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800">
              Riwayat Transaksi Kamu
            </h2>
            <Link
              to="/tambah-transaksi"
              className="bg-[#5BB77B] hover:bg-[#399c5c] transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              + Tambah Transaksi
            </Link>
          </div>

          {/* Mobile — cards */}
          <div className="md:hidden flex flex-col gap-3">
            {recentTransaksi.map((t) => (
              <TransaksiCard key={t.t_id} transaksi={t} showActions={false} />
            ))}
          </div>

          {/* Desktop — tabel */}
          <table className="hidden md:table w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="pb-2 pr-4 text-left text-sm font-medium text-gray-500">
                  Tanggal
                </th>
                <th className="pb-2 pr-4 text-left text-sm font-medium text-gray-500">
                  Tipe
                </th>
                <th className="pb-2 pr-4 text-left text-sm font-medium text-gray-500">
                  Kategori
                </th>
                <th className="pb-2 pr-4 text-left text-sm font-medium text-gray-500">
                  Jumlah
                </th>
                <th className="pb-2 text-left text-sm font-medium text-gray-500">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTransaksi.map((t) => (
                <TransaksiRow key={t.t_id} transaksi={t} />
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right">
            <Link
              to="/transaksi"
              className="text-sm text-[#5BB77B] hover:underline"
            >
              Lihat daftar transaksi lengkap →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
