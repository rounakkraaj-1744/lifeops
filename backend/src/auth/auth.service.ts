import { prisma } from "../config/database.ts";
import { NotFoundError } from "../lib/errors.ts";
import type { UpdateProfileInput } from "./auth.schema.ts";

export class AuthService {
    async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                imageUrl: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new NotFoundError("User");
        }

        return user;
    }

    async updateProfile(userId: string, data: UpdateProfileInput) {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                imageUrl: data.image,
            },
            select: {
                id: true,
                email: true,
                name: true,
                imageUrl: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return user;
    }

    async getUserSessions(userId: string) {
        const sessions = await prisma.session.findMany({
            where: { userId },
            select: {
                id: true,
                userAgent: true,
                ipAddress: true,
                expiresAt: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return sessions;
    }

    async deleteSession(userId: string, sessionId: string) {
        await prisma.session.deleteMany({
            where: {
                id: sessionId,
                userId,
            },
        });
    }

    async deleteOtherSessions(userId: string, currentSessionId: string) {
        await prisma.session.deleteMany({
            where: {
                userId,
                id: { not: currentSessionId },
            },
        });
    }
}

export const authService = new AuthService();
