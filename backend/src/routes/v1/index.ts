/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import express from "express";

/**
 * API Routes
 */
import authRoute from "@/routes/v1/auth";

/**
 * API Controller
 */
import healthRoute from "@/routes/v1/health";

/**
 * Express Router Initialization
 */
const router = express.Router();

/**
 * Mounting routes
 */
router.use("/health", healthRoute);
router.use("/auth", authRoute);

export default router;
