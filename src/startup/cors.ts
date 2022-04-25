import cors from "cors";
import { Express } from "express";

export const corsStartUp = (app: Express) => {
  app.use(cors({ origin: "*" }));
 
};
