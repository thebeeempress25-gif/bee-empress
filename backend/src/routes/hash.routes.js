import { Router } from "express";
import { generateHash, initiateSale } from "../controllers/hash.controller.js";

const router = Router();

router.post("/generate-hash", generateHash);

router.post("/initiate-sale", initiateSale); // Assuming initiateSale is defined elsewhere

export default router;