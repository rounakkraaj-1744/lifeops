import { createApp } from "./app.ts";
import { env } from "./config/index.ts";
import { logger } from "./lib/index.ts";

async function main() {
    const app = createApp();

    app.listen(env.PORT, () => {
        logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
        logger.info(`   Environment: ${env.NODE_ENV}`);
        logger.info(`   Health: http://localhost:${env.PORT}/health`);
        logger.info(`   API: http://localhost:${env.PORT}/api`);
    });
}

main().catch((error) => {
    logger.error("Failed to start server", error);
    process.exit(1);
});
