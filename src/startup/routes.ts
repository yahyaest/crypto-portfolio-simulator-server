import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import portfolios from "../routes/portfolios";
import transactions from "../routes/transactions";
import users from "../routes/users";

export const routes = (app: Express) => {
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use("/api/portfolios", portfolios);
  app.use("/api/transactions", transactions);
  app.use("/api/users", users);
};
