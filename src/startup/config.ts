import { config_prod as configProd } from "../config/production";
import { config } from "dotenv";

config();

export const appConfig = () => {
  if (!configProd.jwtPrivateKey) {
    // throw new Error("FATAL ERROR : jwtPrivateKey is not defined.");
  }
};
