import express, { type Request, type Response, type NextFunction } from "express";
import { auth } from "./config/auth.config.ts";
import { toNodeHandler } from "better-auth/node";

const app = express();
const port = process.env.PORT || 8080;

// CORS middleware for frontend
app.use((req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});

// Better Auth handler - handles all /api/auth/* routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Health check
app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`🚀 Backend server running at http://localhost:${port}`);
    console.log(`   Auth endpoints: http://localhost:${port}/api/auth/*`);
});