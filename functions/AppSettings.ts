import getConfig from 'next/config';
import type { RuntimeAppSettings } from '../types/RuntimeAppSettings';

/**
 * Returns runtime application Environment Variables readable only from server-side code.
 * Environment variables read from the machine should be set in `next.config.js`
 */
export const AppSettings = {
    get current(): RuntimeAppSettings {
        const config = getConfig();
        return { ...config.serverRuntimeConfig };
    }
}

// Configure environment variables read in the next.config.js file
// During development, use .env.development or .env.local to add environment variables
// During production (running in a container), use machine environment variables (docker -e)
