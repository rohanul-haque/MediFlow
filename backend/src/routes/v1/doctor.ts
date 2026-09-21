/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import express from "express";
import { body } from "express-validator";

/**
 * Application Middlewares
 */
import validationError from "@/middlewares/validationError";

/**
 * API Controllers
 */
import updateDoctorController from "@/controllers/v1/doctor/updateDoctor.controller";
import { fileUpload } from "@/lib/fileUpload";
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";

/**
 * Express Router Initialization
 */
const router = express.Router();

/**
 * Update Current Doctor Route
 * @access - private
 * @method - PATCH
 * @route - /api/v1/doctor/current
 */
router.patch(
  "/current",

  authenticate,
  authorize(["doctor"]),

  fileUpload.single("avatar"),

  body("fullName")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Full Name must be less than 20 characters"),
  body("specialization")
    .optional()
    .isString()
    .withMessage("Specialization must be a string"),
  body("qualification")
    .optional()
    .isString()
    .withMessage("Qualification must be a string"),
  body("experience")
    .optional()
    .isNumeric()
    .withMessage("Experience must be a number"),
  body("consultationFee")
    .optional()
    .isNumeric()
    .withMessage("Consultation Fee must be a number"),
  body("availableSlots").optional(),
  body("bio").optional().isString().withMessage("Bio must be a string"),

  validationError,
  updateDoctorController,
);

export default router;
