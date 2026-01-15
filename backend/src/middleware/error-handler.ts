import type { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/errors.ts";
import { error } from "../lib/response.ts";
import { logger } from "../lib/logger.ts";
import { isDev } from "../config/env.ts";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    logger.error(`${req.method} ${req.path} - ${err.message}`, {
        stack: isDev ? err.stack : undefined,
        body: isDev ? req.body : undefined,
    });

    if (err instanceof AppError) {
        error(res, err.message, err.statusCode, err.code, err.details);
        return;
    }

    if (err.name === "ZodError") {
        const zodError = err as unknown as { issues: Array<{ path: (string | number)[]; message: string }> };
        const details = zodError.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
        }));
        error(res, "Validation failed", 400, "VALIDATION_ERROR", details);
        return;
    }

    if (err.name === "PrismaClientKnownRequestError") {
        const prismaError = err as unknown as { code: string };

        switch (prismaError.code) {
            case "P2002":
                error(res, "A record with this value already exists", 409, "CONFLICT_ERROR");
                return;
            case "P2025":
                error(res, "Record not found", 404, "NOT_FOUND_ERROR");
                return;
            default:
                error(res, "Database error", 500, "DATABASE_ERROR");
                return;
        }
    }

    error(
        res,
        isDev ? err.message : "An unexpected error occurred",
        500,
        "INTERNAL_ERROR",
        isDev ? { stack: err.stack } : undefined
    );
}

export function notFoundHandler(req: Request, res: Response): void {
    error(res, `Route ${req.method} ${req.path} not found`, 404, "ROUTE_NOT_FOUND");
}
