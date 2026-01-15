import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.ts";
import { env } from "./env.ts";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const pool = new Pool({
    connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// process.on("beforeExit") hooks are removed to prevent "Called end on pool more than once" errors.
// Prisma handles disconnection gracefully, and the OS cleans up connections on process exit.
