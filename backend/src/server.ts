import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { AdminAccountService } from './services/adminAccountService.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`Advocate Legal Suite API Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  logger.info(`Health check available at http://localhost:${env.PORT}/api/health`);

  // Seed default chamber administrator and temporary development credentials
  AdminAccountService.seedDefaultAdmins().catch((err) => {
    logger.warn({ err }, 'Error during admin account initial seeding');
  });
});

// Graceful shutdown handling
function shutdown(signal: string) {
  logger.info(`Received ${signal}. Shutting down HTTP server gracefully...`);
  server.close(() => {
    logger.info('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force close after 10s
  setTimeout(() => {
    logger.error('Forceful shutdown timeout reached.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

