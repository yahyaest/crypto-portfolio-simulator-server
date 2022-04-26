import express, { Router } from "express";
import validateObjectId from "../middlewares/validateObjectId";
import * as portfolios from "../controllers/portfolios";

const router = Router();
router.use(express.json());

router.get("/", portfolios.getPortfolios);

router.get("/me", portfolios.getMyPortfolio as any);

router.post("/current-portfolio", portfolios.getCurrentPortfolio);

router.get("/:id", validateObjectId, portfolios.getPortfolio);

router.post("/", portfolios.createPortfolio);

router.put("/:id", validateObjectId, portfolios.updatePortfolio);

router.patch("/:id", validateObjectId, portfolios.patchPortfolio);

router.delete("/:id", validateObjectId, portfolios.deletePortfolio);

export default router;
