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
import type {
  AvailableSlot,
  Avatar,
  MongoId,
  Status,
} from "@/types/common.type";

/**
 * Doctor Interface Definition
 */
export interface IDoctor {
  user: MongoId;
  avatar: Avatar;
  specialization: string[];
  qualification: string;
  experience: number;
  consultationFee: number;
  availableSlots: AvailableSlot[];
  bio: string;
  status: Status;
}

/**
 * Doctor Profile Schema
 */
const doctorSchema = new Schema<IDoctor>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
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

    specialization: {
      type: [String],
      default: [],
    },

    qualification: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
      min: [0, "Experience cannot be negative"],
    },

    consultationFee: {
      type: Number,
      default: 0,
      min: [0, "Consultation fee cannot be negative"],
    },

    availableSlots: [
      {
        day: {
          type: String,
          enum: {
            values: [
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            message: "{VALUE} is not a supported day",
          },
          required: [true, "Day is required"],
        },

        slots: [
          {
            from: {
              type: String,
              required: [true, "Start time is required"],
              match: [
                /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
                "Invalid start time format",
              ],
            },

            to: {
              type: String,
              required: [true, "End time is required"],
              match: [
                /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
                "Invalid end time format",
              ],
            },
          },
        ],
      },
    ],

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["approved", "pending", "rejected"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Doctor Model Definition
 */
const Doctor = models.Doctor || model<IDoctor>("Doctor", doctorSchema);

export default Doctor;
