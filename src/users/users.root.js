import { Router } from "express";
import { handleCreateUser, handleListUsers } from "./users.controler.js";

const router = Router();

router.post("/", handleCreateUser);
router.get("/", handleListUsers);
router.get("/:id", handleListUsers);
router.delete("/:id", handleListUsers);
router.patch("/:id", handleUpdateUser);

export default router;