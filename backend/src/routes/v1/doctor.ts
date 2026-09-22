/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import express from "express";
import { body, param } from "express-validator";

/**
 * Application Module
 */
import fileUpload from "@/lib/fileUpload";

/**
 * Application Middlewares
 */
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import validationError from "@/middlewares/validationError";

/**
 * API Controllers
 */
import currentDoctorController from "@/controllers/v1/doctor/currentDoctor.controller";
import deleteDoctorByIdController from "@/controllers/v1/doctor/deleteDoctorById.controller";
import getDoctorByIdController from "@/controllers/v1/doctor/getDoctorById.controller";
import updateDoctorController from "@/controllers/v1/doctor/updateDoctor.controller";

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

/**
 * Get Current Doctor Route
 * @access - private
 * @method - GET
 * @route - /api/v1/doctor/current
 */
router.get(
  "/current",

  authenticate,
  authorize(["doctor"]),

  currentDoctorController,
);

/**
 * Get Doctor By ID Route
 * @access - public
 * @method - GET
 * @route - /api/v1/doctor/:doctorId
 */
router.get(
  "/:doctorId",

  param("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),

  validationError,
  getDoctorByIdController,
);

/**
 * Delete Doctor By ID Route
 * @access - private
 * @method - DELETE
 * @route - /api/v1/doctor/:doctorId
 */
router.delete(
  "/:doctorId",

  authenticate,
  authorize(["admin", "doctor"]),

  param("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),

  validationError,
  deleteDoctorByIdController,
);

export default router;
