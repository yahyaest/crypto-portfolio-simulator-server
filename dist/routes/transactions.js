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
const express_1 = __importStar(require("express"));
const validateObjectId_1 = __importDefault(require("../middlewares/validateObjectId"));
const transactions = __importStar(require("../controllers/transactions"));
const router = express_1.Router();
router.use(express_1.default.json());
router.get("/", transactions.getTransactions);
router.get("/:id", validateObjectId_1.default, transactions.getTransaction);
router.post("/portfolio-transactions", transactions.getPortfolioTransactions);
router.post("/", transactions.createTransaction);
router.put("/:id", validateObjectId_1.default, transactions.updateTransaction);
router.patch("/:id", validateObjectId_1.default, transactions.patchTransaction);
router.delete("/:id", validateObjectId_1.default, transactions.deleteTransaction);
exports.default = router;
