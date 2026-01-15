import { Router, type Request, type Response } from "express";
import { success } from "../lib/response.ts";
import { prisma } from "../config/database.ts";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
    success(res, {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

router.get("/ready", async (_req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        success(res, {
            status: "ready",
            timestamp: new Date().toISOString(),
            checks: {
                database: "ok",
            },
        });
    } catch {
        res.status(503).json({
            success: false,
            data: {
                status: "not ready",
                timestamp: new Date().toISOString(),
                checks: {
                    database: "error",
                },
            },
        });
    }
});

export { router as healthRoutes };
