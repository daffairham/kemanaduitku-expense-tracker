const trxModel = require("../models/transactionModel");

const VALID_TYPES = ["income", "expense"];
const VALID_KATEGORI = [
  "Gaji",
  "Makanan",
  "Transportasi",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Lainnya",
];

//validasi value input transaksi
function validateTransaksiBody({ amount, type, category, date }) {
  if (!date) return "Tanggal transaksi wajib diisi.";
  if (!VALID_TYPES.includes(type)) return "Tipe transaksi tidak valid.";
  if (!VALID_KATEGORI.includes(category)) return "Kategori tidak valid.";

  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount <= 0)
    return "Jumlah harus berupa angka positif.";

  return null; // null = valid
}

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const getUserTrx = await trxModel.getTransactions(userId);
    return res.json({ getUserTrx });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const getTransactionsAsc = async (req, res) => {
  try {
    const userId = req.user.id;

    const getUserTrx = await trxModel.getTransactionsAsc(userId);
    return res.json({ getUserTrx });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const inputTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, type, category, description, date } = req.body;

    const validationError = validateTransaksiBody({
      amount,
      type,
      category,
      date,
    });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    await trxModel.inputTransaction(
      userId,
      Number(amount),
      type,
      category,
      description,
      date,
    );

    return res.json({ message: "Data berhasil diinput." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const trxId = req.params.id;
    const userId = req.user.id;

    const deleteTData = await trxModel.deleteTransaction(trxId, userId);

    if (!deleteTData) {
      return res.status(404).json({
        message: "Transaksi tidak ditemukan.",
      });
    }
    return res.json({ message: "Data transaksi berhasil dihapus." });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const trxId = req.params.id;
    const userId = req.user.id;
    const { amount, type, category, description, date } = req.body;

    const validationError = validateTransaksiBody({
      amount,
      type,
      category,
      date,
    });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updateData = await trxModel.updateTransaction(
      trxId,
      userId,
      Number(amount),
      type,
      category,
      description,
      date,
    );

    if (!updateData) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan." });
    }

    return res.json({ message: "Data transaksi berhasil diperbarui." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const summary = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalIncome = await trxModel.getTotalIncome(userId);
    const totalExpense = await trxModel.getTotalExpense(userId);

    //konversi ke number biar ga null pas dikurang utk tampilin balance

    const income = Number(totalIncome.total_income);
    const expense = Number(totalExpense.total_expense);

    const balance = income - expense;

    return res.json({ totalIncome, totalExpense, balance });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = {
  inputTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  summary,
};
