/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Node.js Module
 */
import dns from "dns";

/**
 * Third-Party Module
 */
import mongoose from "mongoose";

/**
 * Application Modules
 */
import config from "@/config";
import { logger } from "./winston";

/**
 * Type
 */
import type { ConnectOptions } from "mongoose";

/**
 * MongoDB Client Configuration
 */
const clientOptions: ConnectOptions = {
  dbName: "medi-flow-db",
  appName: "Medi-Flow-API",
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

/**
 * Establish a Connection to MongoDB
 */
export const connectToMongoDB = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  // Set DNS servers for local development
  if (config.NODE_ENV === "development") dns.setServers(["1.1.1.1", "8.8.8.8"]);

  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);

    logger.info("Connected to the database successfully", {
      url: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    logger.error("Error connecting to MongoDB:", error);
  }
};

/**
 * Close the MongoDB Connection
 */
export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info("Disconnected from the database successfully", {
      url: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    logger.error("Error disconnecting from MongoDB:", error);
  }
};
