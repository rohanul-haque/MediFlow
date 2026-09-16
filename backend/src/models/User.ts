/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import bcrypt from "bcrypt";
import { model, models, Schema } from "mongoose";

/**
 * User Interface Definition
 */
export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: "admin" | "doctor" | "patient";
  resetOtp: string;
  resetOtpExpired: Date | null;
}

/**
 * User Schema Definition
 */
const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      maxlength: [50, "Full Name must be less than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      maxlength: [100, "Email must be less than 100 characters"],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [7, "Password must be at least 7 characters long"],
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: ["admin", "doctor", "patient"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Role is required"],
    },

    resetOtp: {
      type: String,
      default: "",
      select: false,
    },

    resetOtpExpired: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Hash the password before persisting the user document.
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * User Model Definition
 */
const User = models.User || model<IUser>("User", userSchema);

export default User;
