
export const logger = {
  info: (message: string) => {
    console.log(`ℹ️ ${message}`);
  },

  error: (message: string, error?: unknown) => {
    console.error(`❌ ${message}`, error);
  },

  warn: (message: string) => {
    console.warn(`⚠️ ${message}`);
  },
};