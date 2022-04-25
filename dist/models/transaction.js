"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransaction = exports.Transaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Joi = __importStar(require("joi"));
const transactionSchema = new mongoose_1.default.Schema({
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
exports.Transaction = mongoose_1.default.model("Transaction", transactionSchema);
function validateTransaction(transaction) {
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
exports.validateTransaction = validateTransaction;
exports.Transaction = exports.Transaction;
exports.validate = validateTransaction;
