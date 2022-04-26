"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.patchTransaction = exports.updateTransaction = exports.createTransaction = exports.getPortfolioTransactions = exports.getTransaction = exports.getTransactions = void 0;
const transaction_1 = require("../models/transaction");
const getTransactions = async (req, res) => {
    const transactions = await transaction_1.Transaction.find().sort("date");
    res.send(transactions);
};
exports.getTransactions = getTransactions;
const getTransaction = async (req, res) => {
    try {
        const transaction = await transaction_1.Transaction.findById(req.params.id);
        if (!transaction)
            return res
                .status(404)
                .send("The transaction with the given id was not found.");
        res.send(transaction);
    }
    catch (e) {
        return res
            .status(404)
            .send("The transaction with the given id was not found.");
    }
};
exports.getTransaction = getTransaction;
const getPortfolioTransactions = async (req, res) => {
    try {
        const transactions = await transaction_1.Transaction.find({
            portfolioId: req.body.portfolioId,
        });
        if (!transactions)
            return res.status(404).send("No Transactions for given portfolioId .");
        res.send(transactions);
    }
    catch (e) {
        return res.status(404).send("No Transactions for given portfolioId .");
    }
};
exports.getPortfolioTransactions = getPortfolioTransactions;
const createTransaction = async (req, res) => {
    const { error } = transaction_1.validateTransaction(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const transaction = new transaction_1.Transaction({
        portfolioId: req.body.portfolioId,
        transactionType: req.body.transactionType,
        transactionState: req.body.transactionState,
        cryptoName: req.body.cryptoName,
        cryptoPrice: req.body.cryptoPrice,
        cryptoShares: req.body.cryptoShares,
        transactionValue: req.body.transactionValue,
    });
    await transaction.save();
    res.send(transaction);
};
exports.createTransaction = createTransaction;
const updateTransaction = async (req, res) => {
    const { error } = transaction_1.validateTransaction(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const transaction = await transaction_1.Transaction.findByIdAndUpdate(req.params.id, {
        portfolioId: req.body.portfolioId,
        transactionType: req.body.transactionType,
        transactionState: req.body.transactionState,
        cryptoName: req.body.cryptoName,
        cryptoPrice: req.body.cryptoPrice,
        cryptoShares: req.body.cryptoShares,
        transactionValue: req.body.transactionValue,
    }, { new: true });
    if (!transaction)
        return res
            .status(404)
            .send("The transaction with the given id was not found.");
    res.send(transaction);
};
exports.updateTransaction = updateTransaction;
const patchTransaction = async (req, res) => {
    const transaction = await transaction_1.Transaction.findById(req.params.id);
    if (!transaction)
        return res
            .status(404)
            .send("The transaction with the given ID was not found.");
    let query = { $set: {} };
    for (let key in req.body) {
        if (transaction[key] && transaction[key] !== req.body[key])
            query.$set[key] = req.body[key];
        await transaction_1.Transaction.updateOne({ _id: req.params.id }, query, {
            runValidators: true,
        });
    }
    res.send(query);
};
exports.patchTransaction = patchTransaction;
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await transaction_1.Transaction.findByIdAndRemove(req.params.id);
        if (!transaction)
            return res
                .status(404)
                .send("The transaction with the given id was not found.");
        res.send(transaction);
    }
    catch (e) {
        return res
            .status(404)
            .send("The transaction with the given id was not found.");
    }
};
exports.deleteTransaction = deleteTransaction;
