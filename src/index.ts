import express from "express";
import { config } from "dotenv";
import { db } from "./startup/db";
import { appConfig } from "./startup/config";
import { corsStartUp as cors } from "./startup/cors";
const app = express();
cors(app);
config();
db();
appConfig();

const port = process.env.port || 4000;

app.listen(port, () => console.log(`Listening on ${port} ...`));
