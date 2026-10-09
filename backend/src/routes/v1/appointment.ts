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
 * Application Middlewares
 */
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import validationError from "@/middlewares/validationError";

/**
 * API Controllers
 */
import createAppointmentController from "@/controllers/v1/appointment/createAppointment.controller";
import getAvailableSlotsController from "@/controllers/v1/appointment/getAvailableSlots.controller";
import getMyAppointmentsController from "@/controllers/v1/appointment/getMyAppointments.controller";

/**
 * Express Router Initialization
 */
const router = express.Router();

/**
 * Get My Appointments Route
 * @access - private
 * @method - GET
 * @route - /api/v1/appointment/my-appointments
 */
router.get(
  "/my-appointments",
  authenticate,
  authorize(["patient"]),
  getMyAppointmentsController,
);

/**
 * Get Doctor Available Slots Route
 * @access - public
 * @method - GET
 * @route - /api/v1/appointment/:doctorId/available-slots
 */
router.get(
  "/:doctorId/available-slots",
  param("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),
  query("date")
    .notEmpty()
    .withMessage("Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM-DD format"),
  validationError,
  getAvailableSlotsController,
);

/**
 * Create Appointment Route
 * @access - private
 * @method - POST
 * @route - /api/v1/appointment
 */
router.post(
  "/",
  authenticate,
  // authorize(["patient"]),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM-DD format"),
  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .matches(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
    .withMessage("Invalid start time format"),
  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .matches(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
    .withMessage("Invalid end time format"),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["online", "cash"])
    .withMessage("Payment method must be online or cash"),
  validationError,
  createAppointmentController,
);

export default router;
