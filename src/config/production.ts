import { config } from "dotenv";

// dotenv
config();

export const config_prod = {
  env: "production",
  jwtPrivateKey: process.env.crypto_portfolio_jwtPrivateKey,
};

