import mongoose, { Schema, Document } from "mongoose";
import * as Joi from "joi";

interface Iportfolio extends Document {
  userId: string;
  initialValue: number;
  currentValue: number;
  transactions: string[];
}

const portfolioSchema: Schema = new mongoose.Schema({
  userId: { type: String, required: true },
  intialValue: { type: Number, required: true, min: 0 },
  currentValue: { type: Number, required: true, min: 0 },
  transactions: { type: Array, required: true, default: [] },
});

export const Portfolio = mongoose.model<Iportfolio>(
  "Portfolio",
  portfolioSchema
);

export function validatePortfolio(portfolio: object) {
  const schema = Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    intialValue: Joi.number().min(0).required(),
    transactions: Joi.array().required(),
  });

  return schema.validate(portfolio);
}

exports.Portfolio = Portfolio;
exports.validate = validatePortfolio;
