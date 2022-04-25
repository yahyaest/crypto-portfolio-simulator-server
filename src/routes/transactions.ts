import express, { Router } from "express";
import validateObjectId from "../middlewares/validateObjectId";
import * as transactions from "../controllers/transactions";

const router = Router();
router.use(express.json());

router.get("/", transactions.getTransactions);

router.get("/:id", validateObjectId, transactions.getTransaction);

router.post("/", transactions.createTransaction);

router.put("/:id", validateObjectId, transactions.updateTransaction);

router.patch("/:id", validateObjectId, transactions.patchTransaction);

router.delete("/:id", validateObjectId, transactions.deleteTransaction);

export default router;
