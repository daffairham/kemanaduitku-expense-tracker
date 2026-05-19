const trxModel = require("../models/transactionModel");

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const getUserTrx = await trxModel.getTransactions(userId);
    return res.json({ getUserTrx });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const inputTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const amount = req.body.amount;
    const type = req.body.type;
    const category = req.body.category;
    const description = req.body.description;
    const date = req.body.date;

    const inputToDb = await trxModel.inputTransaction(
      userId,
      amount,
      type,
      category,
      description,
      date,
    );
    return res.json({ message: "Data berhasil diinput." });
  } catch (error) {
    return res.json({ message: error.message });
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
    const amount = req.body.amount;
    const type = req.body.type;
    const category = req.body.category;
    const description = req.body.description;
    const transactionDate = req.body.date;

    const updateData = await trxModel.updateTransaction(
      trxId,
      userId,
      amount,
      type,
      category,
      description,
      transactionDate,
    );
    return res.json({ message: "Data transaksi berhasil diperbarui." });
  } catch (error) {
    return res.json({ message: error.message });
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
