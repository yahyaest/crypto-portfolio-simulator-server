import express from "express";
import { config } from "dotenv";
import { db } from "./startup/db";
import { routes } from "./startup/routes";
import { appConfig } from "./startup/config";
import { corsStartUp as cors } from "./startup/cors";
import { validation } from "./startup/validation";

const app = express();
cors(app);
routes(app);
config();
db();
appConfig();
validation();

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on ${port} ...`));
