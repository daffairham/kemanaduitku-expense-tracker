import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TransaksiCard from "../components/TransaksiCard";

function formatRupiah(amount) {
  return "Rp. " + Number(amount).toLocaleString("id-ID");
}

function SummaryCard({ label, amount, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 flex flex-col gap-2`}>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xl font-bold text-gray-900">{formatRupiah(amount)}</p>
    </div>
  );
}

function formatTanggal(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.slice(0, 10).split("-");
  return `${day}-${month}-${year}`;
}

function TransaksiRow({ transaksi }) {
  const isIncome = transaksi.type === "income";
  return (
    <tr className="border-b border-gray-200 last:border-0">
      <td className="py-4 pr-4 text-sm text-gray-700 whitespace-nowrap">
        {formatTanggal(transaksi.transaction_date)}
      </td>
      <td
        className={`py-4 pr-4 text-sm font-semibold whitespace-nowrap ${isIncome ? "text-[#5BB77B]" : "text-orange-400"}`}>
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
    </tr>
  );
}

export default function Dashboard() {
  const [transaksi, setTransaksi] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [trxRes, summaryRes] = await Promise.all([
          api.get("/api/transactions"),
          api.get("/api/transactions/summary"),
        ]);

        setTransaksi(trxRes.data.getUserTrx);
        setSummary({
          balance: summaryRes.data.balance,
          totalIncome: summaryRes.data.totalIncome.total_income,
          totalExpense: summaryRes.data.totalExpense.total_expense,
        });
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const recentTransaksi = transaksi.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#EDECEA]">
      <Navbar activePage="dashboard" />

      <main className="px-6 py-6 max-w-5xl mx-auto pb-24 md:pb-6">
        <h1 className="text-[#5BB77B] font-black text-2xl md:text-3xl mb-6">
          DASHBOARD
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            label="Balance"
            amount={summary.balance}
            bgColor="bg-[#4DD9E6]"
          />
          <SummaryCard
            label="Total Pemasukkan"
            amount={summary.totalIncome}
            bgColor="bg-[#7EE84A]"
          />
          <SummaryCard
            label="Total Pengeluaran"
            amount={summary.totalExpense}
            bgColor="bg-[#F5D04A]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800">
              Riwayat Transaksi Kamu
            </h2>
            <Link
              to="/tambah-transaksi"
              className="bg-[#5BB77B] hover:bg-[#399c5c] transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg">
              + Tambah Transaksi
            </Link>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400 text-center py-8">
              Memuat transaksi...
            </p>
          ) : recentTransaksi.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              Belum ada transaksi.
            </p>
          ) : (
            <>
              <div className="md:hidden flex flex-col gap-3">
                {recentTransaksi.map((t) => (
                  <TransaksiCard
                    key={t.t_id}
                    transaksi={t}
                    showActions={false}
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
                  </tr>
                </thead>
                <tbody>
                  {recentTransaksi.map((t) => (
                    <TransaksiRow key={t.t_id} transaksi={t} />
                  ))}
                </tbody>
              </table>
            </>
          )}

          <div className="mt-4 text-right">
            <Link
              to="/transaksi"
              className="text-sm text-[#5BB77B] hover:underline">
              Lihat daftar transaksi lengkap →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
