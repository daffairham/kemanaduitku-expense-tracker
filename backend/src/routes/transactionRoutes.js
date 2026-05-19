const express = require("express");

const transactions = require("../controller/transactionController");

const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateUser, transactions.getTransactions);
router.post("/", authenticateUser, transactions.inputTransaction);
router.delete("/:id", authenticateUser, transactions.deleteTransaction);
router.put("/:id", authenticateUser, transactions.updateTransaction);
router.get("/summary", authenticateUser, transactions.summary);

module.exports = router;
