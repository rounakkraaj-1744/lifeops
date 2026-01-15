import type { Request, Response, NextFunction } from "express";
import { z, type ZodSchema } from "zod";
import { ValidationError } from "../lib/errors.ts";

interface ValidationErrorDetail {
    field: string;
    message: string;
}

export function validateBody<T extends ZodSchema>(schema: T) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        try {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                const errors: ValidationErrorDetail[] = result.error.issues.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                throw new ValidationError("Invalid request body", errors);
            }

            req.body = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
}

export function validateQuery<T extends ZodSchema>(schema: T) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        try {
            const result = schema.safeParse(req.query);

            if (!result.success) {
                const errors: ValidationErrorDetail[] = result.error.issues.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                throw new ValidationError("Invalid query parameters", errors);
            }

            (req as Request & { validatedQuery: z.infer<T> }).validatedQuery = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
}

export function validateParams<T extends ZodSchema>(schema: T) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        try {
            const result = schema.safeParse(req.params);

            if (!result.success) {
                const errors: ValidationErrorDetail[] = result.error.issues.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                throw new ValidationError("Invalid URL parameters", errors);
            }

            (req as Request & { validatedParams: z.infer<T> }).validatedParams = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
}
