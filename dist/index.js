"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = require("./startup/db");
const config_1 = require("./startup/config");
const cors_1 = require("./startup/cors");
const app = express_1.default();
cors_1.corsStartUp(app);
dotenv_1.config();
db_1.db();
config_1.appConfig();
const port = process.env.port || 4000;
app.listen(port, () => console.log(`Listening on ${port} ...`));
