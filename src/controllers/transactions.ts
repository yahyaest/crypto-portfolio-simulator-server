import { Transaction, validateTransaction } from "../models/transaction";
import { User } from "../models/user";
import { RequestHandler } from "express";

export const getTransactions: RequestHandler = async (req, res) => {
  const transactions = await Transaction.find().sort("date");
  res.send(transactions);
};

export const getTransaction: RequestHandler = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    // If not existing return 404 - Not found ////
    if (!transaction)
      return res
        .status(404)
        .send("The transaction with the given id was not found.");
    res.send(transaction);
  } catch (e) {
    return res
      .status(404)
      .send("The transaction with the given id was not found.");
  }
};

export const createTransaction: RequestHandler = async (req, res) => {
  // If invalid return 400 - Bad request
  const { error } = validateTransaction(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const transaction = new Transaction({
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

export const updateTransaction: RequestHandler = async (req, res) => {
  // If invalid return 400 - Bad request 
  const { error } = validateTransaction(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        portfolioId: req.body.portfolioId,
        transactionType: req.body.transactionType,
        transactionState: req.body.transactionState,
        cryptoName: req.body.cryptoName,
        cryptoPrice: req.body.cryptoPrice,
        cryptoShares: req.body.cryptoShares,
        transactionValue: req.body.transactionValue,
      },
      { new: true }
    );

    // If not existing return 404 - Not found 
    if (!transaction)
      return res
        .status(404)
        .send("The transaction with the given id was not found.");

    res.send(transaction);
};

export const patchTransaction: RequestHandler = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");

  let query: { $set: { [key: string]: any } } = { $set: {} };
  for (let key in req.body) {
    if (transaction[key] && transaction[key] !== req.body[key])
      query.$set[key] = req.body[key];

    await Transaction.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
};

export const deleteTransaction: RequestHandler = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndRemove(req.params.id);

    // If not existing return 404 - Not found
    if (!transaction)
      return res
        .status(404)
        .send("The transaction with the given id was not found.");

    res.send(transaction);
  } catch (e) {
    return res
      .status(404)
      .send("The transaction with the given id was not found.");
  }
};
