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
exports.validatePortfolio = exports.Portfolio = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Joi = __importStar(require("joi"));
const portfolioSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    intialValue: { type: Number, required: true, min: 0 },
    currentValue: { type: Number, required: true, min: 0 },
    transactions: { type: Array, required: true, default: [] },
});
exports.Portfolio = mongoose_1.default.model("Portfolio", portfolioSchema);
function validatePortfolio(portfolio) {
    const schema = Joi.object({
        userId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        intialValue: Joi.number().min(0).required(),
        transactions: Joi.array().required(),
    });
    return schema.validate(portfolio);
}
exports.validatePortfolio = validatePortfolio;
exports.Portfolio = exports.Portfolio;
exports.validate = validatePortfolio;
