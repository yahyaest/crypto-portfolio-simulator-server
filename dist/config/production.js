"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config_prod = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.config_prod = {
    env: "production",
    jwtPrivateKey: process.env.crypto_portfolio_jwtPrivateKey,
};
