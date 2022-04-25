import mongoose, { Schema, Document } from "mongoose";
import * as Joi from "joi";

interface Itransaction extends Document {
  portfolioId: string;
  date: Date;
  transactionType: string;
  transactionState: string;
  cryptoName: string;
  cryptoPrice: number;
  cryptoShares: number;
  transactionValue: number;
}

const transactionSchema: Schema = new mongoose.Schema({
  portfolioId: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  transactionType: { type: String, required: true },
  transactionState: { type: String, required: true },
  cryptoName: { type: String, required: true },
  cryptoPrice: { type: Number, required: true, min: 0 },
  cryptoShares: { type: Number, required: true, min: 0 },
  transactionValue: { type: Number, required: true, min: 0 },
});

export const Transaction = mongoose.model<Itransaction>(
  "Transaction",
  transactionSchema
);

export function validateTransaction(transaction: object) {
  const schema = Joi.object({
    portfolioId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    transactionType: Joi.string().required(),
    transactionState: Joi.string().required(),
    cryptoName: Joi.string().required(),
    cryptoPrice: Joi.number().min(0).required(),
    cryptoShares: Joi.number().min(0).required(),
    transactionValue: Joi.number().min(0).required(),
  });

  return schema.validate(transaction);
}

exports.Transaction = Transaction;
exports.validate = validateTransaction;
