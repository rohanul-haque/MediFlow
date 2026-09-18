/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import express from "express";
import { body, cookie } from "express-validator";

/**
 * Application Middlewares
 */
import authenticate from "@/middlewares/authenticate";
import validationError from "@/middlewares/validationError";

/**
 * API Controllers
 */
import forgetPasswordController from "@/controllers/v1/auth/forgotPassword.controller";
import loginController from "@/controllers/v1/auth/login.controller";
import logoutController from "@/controllers/v1/auth/logout.controller";
import resetPasswordController from "@/controllers/v1/auth/resetPassword.controller";
import signupController from "@/controllers/v1/auth/signup.controller";
import verifyForgotPasswordOtpController from "@/controllers/v1/auth/verifyForgotPasswordOtp.controller";
import getMeController from "@/controllers/v1/user/getMe.controller";
import refreshTokenController from "@/controllers/v1/auth/refreshToken.controller";

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

/**
 * User Password Reset Route
 * @access - public
 * @method - POST
 * @route - /api/v1/auth/forget-password
 */
router.post(
  "/forget-password",

  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  validationError,
  forgetPasswordController,
);

/**
 * User Verify Forgot Password Otp Route
 * @access - public
 * @method - POST
 * @route - /api/v1/auth/verify-otp
 */
router.post(
  "/verify-otp",

  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("otp")
    .notEmpty()
    .withMessage("OTP is Required")
    .isString()
    .withMessage("OTP must be a string")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits"),

  validationError,
  verifyForgotPasswordOtpController,
);

/**
 * User Reset Password Route
 * @access - private
 * @method - POST
 * @route - /api/v1/auth/reset-password
 */
router.patch(
  "/reset-password",

  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("otp")
    .notEmpty()
    .withMessage("OTP is Required")
    .isString()
    .withMessage("OTP must be a string")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits"),
  body("newPassword")
    .notEmpty()
    .withMessage("New Password is Required")
    .isLength({ min: 7 })
    .withMessage("Password must be at least 7 characters long"),

  validationError,
  resetPasswordController,
);

/**
 * User Reset Password Route
 * @access - private
 * @method - GET
 * @route - /api/v1/auth/refresh-token
 */
router.get(
  "/refresh-token",

  cookie("refreshToken")
    .notEmpty()
    .withMessage("Refresh token is required")
    .isJWT()
    .withMessage("Invalid refresh token"),

  validationError,
  refreshTokenController,
);

export default router;
