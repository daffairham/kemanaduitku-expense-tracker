import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import api from "../services/api";

export default function ConfirmDeleteModal({ transaksi, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    try {
      await api.delete(`/api/transactions/${transaksi.t_id}`, {
        withCredentials: true,
      });
      onSuccess(transaksi.t_id);
      onClose();
    } catch (err) {
      console.error("Gagal hapus transaksi:", err);
      setError("Gagal menghapus transaksi. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-red-500">HAPUS TRANSAKSI</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <Trash2 className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm text-gray-600">
            Yakin mau hapus transaksi ini? Tindakan ini tidak bisa dibatalkan.
          </p>
          <div className="bg-gray-50 rounded-lg px-4 py-2 w-full text-left text-sm text-gray-700 border border-gray-100">
            <span className="font-medium">{transaksi.category}</span>
            {transaksi.description && (
              <span className="text-gray-400"> · {transaksi.description}</span>
            )}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-400 transition-colors cursor-pointer font-medium py-2 rounded-lg text-sm">
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-800 transition-colors cursor-pointer text-white font-medium py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
