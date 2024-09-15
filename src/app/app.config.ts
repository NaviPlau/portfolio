import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

/**
 * Configuration for the Angular application.
 * This includes providers for routing and HTTP client services.
 * 
 * @see {@link https://angular.io/api/core/ApplicationConfig}
 * 
 * @example
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideRouter } from '@angular/router';
 * import { routes } from './app.routes';
 * import { provideHttpClient } from '@angular/common/http';
 * 
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideRouter(routes), provideHttpClient()]
 * };
 * ```
 */
export const appConfig: ApplicationConfig = {
  /**
   * Providers for the application configuration.
   * 
   * - `provideRouter(routes)`: Configures the router with the defined routes.
   * - `provideHttpClient()`: Provides the HTTP client for making HTTP requests.
   */
  providers: [provideRouter(routes), provideHttpClient()]
};
