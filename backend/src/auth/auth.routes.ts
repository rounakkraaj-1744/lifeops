import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth.ts";
import { authController } from "./auth.controller.ts";
import { requireAuth, validateBody } from "../middleware/index.ts";
import { updateProfileSchema } from "./auth.schema.ts";

const router = Router();

router.all("/auth/*splat", toNodeHandler(auth));

router.get("/users/me", requireAuth, authController.getMe);
router.patch("/users/me", requireAuth, validateBody(updateProfileSchema), authController.updateMe);
router.get("/users/me/sessions", requireAuth, authController.getMySessions);
router.delete("/users/me/sessions", requireAuth, authController.deleteOtherSessions);
router.delete("/users/me/sessions/:sessionId", requireAuth, authController.deleteSession);

export { router as authRoutes };
