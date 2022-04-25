import express, { Router } from "express";

import validateObjectId from "../middlewares/validateObjectId";
import * as users from "../controllers/users";

const router = Router();
router.use(express.json());

router.get("/", users.getUsers);

router.get("/me", users.getConnectedUser as any);

router.get("/:id", validateObjectId, users.getUser);

router.post("/", users.createUser);

router.put("/:id", validateObjectId, users.updateUser);

router.patch("/:id", validateObjectId, users.patchUser);

router.delete("/:id", validateObjectId, users.deleteUser);

export default router;
