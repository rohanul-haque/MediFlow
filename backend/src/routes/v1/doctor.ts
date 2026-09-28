/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import express from "express";
import { body, param, query } from "express-validator";

/**
 * Application Modules
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
import changeDoctorStatusController from "@/controllers/v1/doctor/changeDoctorStatus.controller";
import currentDoctorController from "@/controllers/v1/doctor/currentDoctor.controller";
import deleteDoctorByIdController from "@/controllers/v1/doctor/deleteDoctorById.controller";
import getAllDoctorByAdminController from "@/controllers/v1/doctor/getAllDoctorByAdmin.controller";
import getAllApprovedDoctorController from "@/controllers/v1/doctor/getApprovedAllDoctors.controller";
import getDoctorByIdController from "@/controllers/v1/doctor/getDoctorById.controller";
import updateDoctorController from "@/controllers/v1/doctor/updateDoctor.controller";

/**
 * Express Router Initialization
 */

const router = express.Router();

/**
 * Get All Approved Doctor Route
 * @access - public
 * @method - GET
 * @route - /api/v1/doctor/list
 */

router.get(
  "/list",
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive integer"),
  query("specialization")
    .optional()
    .isString()
    .withMessage("Specialization must be a string"),
  validationError,
  getAllApprovedDoctorController,
);

/**
 * Get All Doctor By Admin Route
 * @access - private
 * @method - GET
 * @route - /api/v1/doctor/admin/list
 */

router.get(
  "/admin/list",
  authenticate,
  authorize(["admin"]),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive integer"),
  query("specialization")
    .optional()
    .isString()
    .withMessage("Specialization must be a string"),
  validationError,
  getAllDoctorByAdminController,
);

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

/**
 * Change Doctor Status Route
 * @access - private
 * @method - PATCH
 * @route - /api/v1/doctor/:doctorId/change-status
 */

router.patch(
  "/:doctorId/change-status",
  authenticate,
  authorize(["admin"]),
  param("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["approved", "pending", "rejected"])
    .withMessage("Status must be approved, pending or rejected"),
  validationError,
  changeDoctorStatusController,
);

export default router;
