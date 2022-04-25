"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const portfolios_1 = __importDefault(require("../routes/portfolios"));
const transactions_1 = __importDefault(require("../routes/transactions"));
const users_1 = __importDefault(require("../routes/users"));
const routes = (app) => {
    app.use(express_1.default.json());
    app.use(helmet_1.default());
    app.use(morgan_1.default("tiny"));
    app.use("/api/portfolios", portfolios_1.default);
    app.use("/api/transactions", transactions_1.default);
    app.use("/api/users", users_1.default);
};
exports.routes = routes;
