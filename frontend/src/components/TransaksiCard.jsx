import { Pencil, Trash2 } from "lucide-react";

function formatRupiah(amount) {
  return "Rp. " + Number(amount).toLocaleString("id-ID");
}

export default function TransaksiCard({
  transaksi,
  showActions = false,
  onDelete,
  onEdit,
}) {
  const isIncome = transaksi.type === "income";

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200/60">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
              isIncome
                ? "bg-green-50 text-[#5BB77B]"
                : "bg-orange-50 text-orange-500"
            }`}
          >
            {transaksi.category}
          </span>
          <p className="text-sm font-semibold text-gray-800 mt-1.5">
            {transaksi.description}
          </p>
        </div>
        <p
          className={`text-sm font-bold ${isIncome ? "text-[#5BB77B]" : "text-red-500"}`}
        >
          {isIncome ? "+" : "-"} {formatRupiah(transaksi.amount)}
        </p>
      </div>

      <div className="flex justify-between items-center pt-2.5 mt-2.5 border-t border-gray-100 text-xs text-gray-400">
        <span>{transaksi.transaction_date?.split("T")[0]}</span>

        {showActions && (
          <div className="flex gap-4">
            <button
              onClick={() => onEdit(transaksi)}
              className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span className="text-[11px]">Edit</span>
            </button>
            <button
              onClick={() => onDelete(transaksi.t_id)}
              className="text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="text-[11px]">Hapus</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
