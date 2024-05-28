import { Router } from "express";
import { getBars } from "../controllers/barsController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, getBars);

export default router;
