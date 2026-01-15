import express from "express";
import { corsMiddleware, errorHandler, notFoundHandler } from "./middleware/index.ts";
import { authRoutes } from "./auth/index.ts";
import { healthRoutes } from "./health/index.ts";

export function createApp() {
    const app = express();

    app.use(corsMiddleware);
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    app.use("/health", healthRoutes);
    app.use("/api", authRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
