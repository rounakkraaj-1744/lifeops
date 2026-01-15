import type { Request, Response, NextFunction, RequestHandler } from "express";
import { success, noContent } from "../lib/response.ts";
import { authService } from "./auth.service.ts";
import type { UpdateProfileInput } from "./auth.schema.ts";

class AuthControllerClass {
    getMe: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await authService.getUserById(req.user!.id);
            success(res, user, "User profile retrieved");
        } catch (error) {
            next(error);
        }
    };

    updateMe: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as UpdateProfileInput;
            const user = await authService.updateProfile(req.user!.id, data);
            success(res, user, "Profile updated successfully");
        } catch (error) {
            next(error);
        }
    };

    getMySessions: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const sessions = await authService.getUserSessions(req.user!.id);

            const sessionsWithCurrent = sessions.map((session) => ({
                ...session,
                isCurrent: session.id === req.session!.id,
            }));

            success(res, sessionsWithCurrent, "Sessions retrieved");
        } catch (error) {
            next(error);
        }
    };

    deleteSession: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const sessionId = req.params.sessionId as string;
            await authService.deleteSession(req.user!.id, sessionId);
            noContent(res);
        } catch (error) {
            next(error);
        }
    };

    deleteOtherSessions: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await authService.deleteOtherSessions(req.user!.id, req.session!.id);
            success(res, null, "All other sessions have been terminated");
        } catch (error) {
            next(error);
        }
    };
}

export const authController = new AuthControllerClass();
