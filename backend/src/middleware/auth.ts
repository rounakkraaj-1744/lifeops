import type { Request, Response, NextFunction, RequestHandler } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../config/auth.ts";
import { AuthenticationError } from "../lib/errors.ts";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name?: string | null;
                emailVerified: boolean;
            };
            session?: {
                id: string;
                userId: string;
                expiresAt: Date;
            };
        }
    }
}

export const requireAuth: RequestHandler = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            throw new AuthenticationError("Invalid or expired session");
        }

        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            emailVerified: session.user.emailVerified,
        };
        req.session = {
            id: session.session.id,
            userId: session.session.userId,
            expiresAt: session.session.expiresAt,
        };

        next();
    } catch (error) {
        next(error);
    }
};

export const optionalAuth: RequestHandler = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (session) {
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                emailVerified: session.user.emailVerified,
            };
            req.session = {
                id: session.session.id,
                userId: session.session.userId,
                expiresAt: session.session.expiresAt,
            };
        }

        next();
    } catch {
        next();
    }
};
