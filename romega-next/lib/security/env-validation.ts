/**
 * Security environment validation
 * Validates and sanitizes environment variables on startup
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'DATABASE_URL',
  'NEXT_PUBLIC_APP_URL',
] as const;

const optionalEnvVars = [
  'RESEND_API_KEY',
  'ADMIN_EMAIL',
  'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
  'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
  'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
] as const;

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate all environment variables
 */
export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  for (const varName of requiredEnvVars) {
    const value = process.env[varName];
    
    if (!value) {
      errors.push(`Missing required environment variable: ${varName}`);
      continue;
    }

    // Check for placeholder values
    if (isPlaceholderValue(value)) {
      errors.push(`${varName} contains placeholder value`);
    }

    // Validate format based on variable name
    if (varName.includes('URL')) {
      if (!isValidUrl(value)) {
        errors.push(`${varName} is not a valid URL`);
      }
    }
  }

  // Check optional variables
  for (const varName of optionalEnvVars) {
    const value = process.env[varName];
    
    if (!value) {
      warnings.push(`Optional environment variable not set: ${varName}`);
      continue;
    }

    if (isPlaceholderValue(value)) {
      warnings.push(`${varName} contains placeholder value`);
    }
  }

  // Security checks
  if (process.env.NODE_ENV === 'production') {
    // Ensure HTTPS in production
    if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.startsWith('https://')) {
      errors.push('NEXT_PUBLIC_APP_URL must use HTTPS in production');
    }

    // Check for development keys in production
    if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes('placeholder')) {
      errors.push('Using placeholder API keys in production');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Get sanitized environment variables for client-side use
 * Only returns NEXT_PUBLIC_* variables with sensitive parts obfuscated
 */
export function getSanitizedPublicEnv() {
  const publicEnv: Record<string, string> = {};

  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('NEXT_PUBLIC_')) {
      const value = process.env[key];
      if (value) {
        // Obfuscate sensitive parts of keys
        if (key.includes('KEY') || key.includes('SECRET')) {
          publicEnv[key] = obfuscateKey(value);
        } else {
          publicEnv[key] = value;
        }
      }
    }
  });

  return publicEnv;
}

/**
 * Check if a value is a placeholder
 */
function isPlaceholderValue(value: string): boolean {
  const placeholders = [
    'placeholder',
    'your-',
    'xxx',
    'change-me',
    'replace-me',
    'todo',
  ];

  return placeholders.some(p => value.toLowerCase().includes(p));
}

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Obfuscate API keys for logging
 */
function obfuscateKey(key: string): string {
  if (key.length <= 8) {
    return '****';
  }
  return key.substring(0, 4) + '****' + key.substring(key.length - 4);
}

/**
 * Run validation on startup (only in development)
 */
if (process.env.NODE_ENV === 'development') {
  const result = validateEnvironment();
  
  if (!result.isValid) {
    console.error('\n❌ Environment Validation Failed:\n');
    result.errors.forEach(error => console.error(`  - ${error}`));
    console.error('\n');
  }

  if (result.warnings.length > 0) {
    console.warn('\n⚠️  Environment Warnings:\n');
    result.warnings.forEach(warning => console.warn(`  - ${warning}`));
    console.warn('\n');
  }

  if (result.isValid && result.warnings.length === 0) {
    console.log('✅ Environment validation passed\n');
  }
}

// Export validation function for use in other modules
export default validateEnvironment;
