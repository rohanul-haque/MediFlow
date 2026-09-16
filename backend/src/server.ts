/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

/**
 * Application Modules
 */
import config from "@/config";
import corsOptions from "@/lib/corsOptions";
import limiter from "@/lib/expressRateLimit";
import { connectToMongoDB, disconnectFromMongoDB } from "@/lib/mongoose";
import { logger } from "@/lib/winston";

/**
 * Middlewares
 */
import globalErrorHandler from "@/middlewares/globalErrorHandler";
import notFoundRoute from "@/middlewares/notFoundRoute";

/**
 * Routes
 */
import v1Routes from "@/routes/v1";

/**
 * Initialize Express
 */
const app = express();

/**
 * Security Middleware
 */
app.use(
  helmet({
    contentSecurityPolicy: config.NODE_ENV === "production",
  }),
);

/**
 * Enable CORS
 */
app.use(cors(corsOptions));

/**
 * Response Compression
 */
app.use(
  compression({
    threshold: 1024,
  }),
);

/**
 * Body Parser
 */
app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

/**
 * Cookie Parser
 */
app.use(cookieParser());

/**
 * Rate Limiter
 */
app.use(limiter);

/**
 * API Routes
 */
app.use("/api/v1", v1Routes);

/**
 * Route Not Found
 */
app.use(notFoundRoute);

/**
 * Global Error Handler
 */
app.use(globalErrorHandler);

/**
 * HTTP Server
 */
let server: ReturnType<typeof app.listen>;

/**
 * Start Server
 */
const startServer = async () => {
  try {
    await connectToMongoDB();

    server = app.listen(config.PORT, () => {
      logger.info(`Server running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

/**
 * Graceful Shutdown
 */
const gracefulShutdown = async (signal: string) => {
  logger.warn(`${signal} received. Shutting down server...`);

  server.close(async () => {
    try {
      await disconnectFromMongoDB();

      logger.info("MongoDB disconnected.");
      logger.info("Server shutdown completed.");

      process.exit(0);
    } catch (error) {
      logger.error("Error during shutdown", error);
      process.exit(1);
    }
  });
};

/**
 * Handle Process Signals
 */
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

/**
 * Handle Unhandled Promise Rejections
 */
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", reason);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

/**
 * Handle Uncaught Exceptions
 */
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", error);
  process.exit(1);
});
