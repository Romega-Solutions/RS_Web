/**
 * Security utilities export barrel
 * Import all security functions from this single entry point
 */

// API Protection
export {
  checkRateLimit,
  validateRequestBody,
  validateContactForm,
  validateRequestHeaders,
  securityCheck,
  createSecurityErrorResponse,
  withSecurity,
} from './api-protection';

// Export types from api-protection
export type { RateLimitConfig, SecurityCheckResult } from './api-protection';

// Validation
export {
  isValidEmail,
  isValidPhone,
  sanitizeHtml,
  sanitizeText,
  isValidUrl,
  containsSqlInjection,
  containsXss,
  isValidOrigin,
  isValidFileType,
  generateToken,
  isValidToken,
  checkHoneypot,
  safeCompare,
  obfuscateIp,
  generateCsrfToken,
  isValidBodySize,
} from './validation';

// Environment Validation
export {
  validateEnvironment,
  getSanitizedPublicEnv,
} from './env-validation';

// Default export
export { default as validateEnv } from './env-validation';
