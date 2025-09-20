import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/parse-pdf", authMiddleware, parsePdfController);

export default router;
