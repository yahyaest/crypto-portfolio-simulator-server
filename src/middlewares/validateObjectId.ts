import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");
  next();
};

export default validateObjectId;
