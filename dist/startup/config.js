"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const production_1 = require("../config/production");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const appConfig = () => {
    if (!production_1.config_prod.jwtPrivateKey) {
        // throw new Error("FATAL ERROR : jwtPrivateKey is not defined.");
    }
};
exports.appConfig = appConfig;
