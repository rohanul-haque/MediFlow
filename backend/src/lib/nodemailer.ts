/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { createTransport } from "nodemailer";

/**
 * Application Module
 */
import config from "@/config";

/**
 * Node Mailer configuration
 * @description Nodemailer is a module for Node.js applications
 * that allows you to send emails.
 */
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export default transporter;
