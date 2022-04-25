"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsStartUp = void 0;
const cors_1 = __importDefault(require("cors"));
const corsStartUp = (app) => {
    app.use(cors_1.default({ origin: "*" }));
};
exports.corsStartUp = corsStartUp;
