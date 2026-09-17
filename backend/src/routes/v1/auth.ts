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
import authenticate from "@/middlewares/authenticate";
import validationError from "@/middlewares/validationError";

/**
 * API Controllers
 */
import loginController from "@/controllers/v1/auth/login.controller";
import logoutController from "@/controllers/v1/auth/logout.controller";
import signupController from "@/controllers/v1/auth/signup.controller";
import getMeController from "@/controllers/v1/user/getMe.controller";

/**
 * Express Router Initialization
 */
const router = express.Router();

/**
 * User Signup Route
 * @access - public
 * @method - POST
 * @route - /api/v1/auth/signup
 */
router.post(
  "/signup",

  body("fullName")
    .notEmpty()
    .withMessage("Full Name is Requred")
    .isLength({ max: 50 })
    .withMessage("Full Name must be less than 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 7 })
    .withMessage("Password must be at least 7 characters long"),
  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string")
    .isIn(["admin", "doctor", "patient"])
    .withMessage("Role must be admin, doctor or patient"),

  validationError,
  signupController,
);

/**
 * User login Route
 * @access - public
 * @method - POST
 * @route - /api/v1/auth/login
 */
router.post(
  "/login",

  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password").notEmpty().withMessage("Password is Required"),

  validationError,
  loginController,
);

/**
 * User logout Route
 * @access - public
 * @method - POST
 * @route - /api/v1/auth/logout
 */
router.post("/logout", authenticate, logoutController);

/**
 * User Profile Route
 * @access - private
 * @method - GET
 * @route - /api/v1/auth/me
 */
router.get("/me", authenticate, getMeController);

export default router;
