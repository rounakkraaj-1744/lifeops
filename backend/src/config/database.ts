import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.ts";
import { env } from "./env.ts";

const pool = new Pool({
    connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

process.on("beforeExit", async () => {
    await prisma.$disconnect();
    await pool.end();
});
