/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { model, models, Schema, Types } from "mongoose";

/**
 * Type
 */
import type { Avatar, BloodGroup, Gender, MongoId } from "@/types/common.type";

/**
 * Patient Interface Definition
 */
export interface IPatient {
  user: MongoId;
  avatar?: Avatar;
  bloodGroup?: BloodGroup;
  dateOfBirth?: Date;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
}

/**
 * Patient Profile Schema Definition
 */
const patientSchema = new Schema<IPatient>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: [true, "Patient profile is already exists"],
    },

    avatar: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
      height: {
        type: Number,
        default: null,
      },
      width: {
        type: Number,
        default: null,
      },
    },

    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not supported",
      },
      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: "",
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not supported",
      },
      default: "",
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Patient Model Definition
 */
const Patient = models.Patient || model<IPatient>("Patient", patientSchema);

export default Patient;
