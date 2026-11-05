import * as brevo from '@getbrevo/brevo';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

let apiInstance: brevo.TransactionalEmailsApi | null = null;

try {
  apiInstance = new brevo.TransactionalEmailsApi();
  if (env.BREVO_API_KEY && env.BREVO_API_KEY !== 'placeholder-brevo-key') {
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, env.BREVO_API_KEY);
    logger.info('Brevo Transactional Emails API initialized with configured API key.');
  } else {
    logger.warn('Brevo API key is not configured or using placeholder. Transactional emails will be simulated in dev/test.');
  }
} catch (error) {
  logger.error({ error }, 'Failed to initialize Brevo TransactionalEmailsApi');
}

export const brevoClient = apiInstance;

