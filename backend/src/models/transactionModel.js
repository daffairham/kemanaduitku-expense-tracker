const db = require("../config/database");

const getTransactions = async (userId) => {
  const query = `SELECT t_id, type, category, amount, description, transaction_date::date::text
    FROM transactions
    WHERE user_id = $1
    ORDER BY transaction_date DESC`;

  const res = await db.query(query, [userId]);
  return res.rows;
};

const getTransactionsAsc = async (userId) => {
  const query = `SELECT t_id, type, category, amount, description, transaction_date::date::text
    FROM transactions
    WHERE user_id = $1
    ORDER BY transaction_date ASC`;

  const res = await db.query(query, [userId]);
  return res.rows;
};

const inputTransaction = async (
  userId,
  amount,
  type,
  category,
  description,
  transactionDate,
) => {
  const query = `INSERT INTO transactions (user_id, amount, type, category, description, transaction_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
  const values = [userId, amount, type, category, description, transactionDate];
  const res = await db.query(query, values);

  return res.rows[0];
};

const deleteTransaction = async (trxId, userId) => {
  const query = `DELETE FROM transactions
    WHERE t_id = $1 AND user_id = $2
    RETURNING *`;

  const values = [trxId, userId];
  const res = await db.query(query, values);

  return res.rows[0];
};

const updateTransaction = async (
  trxId,
  userId,
  amount,
  type,
  category,
  description,
  transactionDate,
) => {
  const query = `UPDATE transactions
    SET amount = $3, type = $4, category = $5, description = $6, transaction_date = $7
    WHERE t_id = $1 AND user_id = $2
    RETURNING *`;

  const values = [
    trxId,
    userId,
    amount,
    type,
    category,
    description,
    transactionDate,
  ];
  const res = await db.query(query, values);

  return res.rows[0];
};

const getTotalIncome = async (userId) => {
  const query = `
        SELECT
        COALESCE(SUM(amount), 0)
        AS total_income

        FROM transactions
        WHERE user_id = $1
        AND type = 'income';`;

  const res = await db.query(query, [userId]);

  return res.rows[0];
};

const getTotalExpense = async (userId) => {
  const query = `
        SELECT
        COALESCE(SUM(amount), 0)
        AS total_expense

        FROM transactions
        WHERE user_id = $1
        AND type = 'expense';`;

  const res = await db.query(query, [userId]);

  return res.rows[0];
};

module.exports = {
  getTransactions,
  getTransactionsAsc,
  inputTransaction,
  deleteTransaction,
  updateTransaction,
  getTotalIncome,
  getTotalExpense,
};
