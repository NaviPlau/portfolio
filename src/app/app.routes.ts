import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { InprintComponent } from './inprint/inprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

/**
 * Configuration for the application's routes.
 * This defines the navigation paths and their corresponding components.
 * 
 * @see {@link https://angular.io/api/router/Routes}
 * 
 * @example
 * ```typescript
 * import { Routes } from '@angular/router';
 * import { LandingPageComponent } from './landing-page/landing-page.component';
 * import { InprintComponent } from './inprint/inprint.component';
 * import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
 * 
 * export const routes: Routes = [
 *   { path: '', component: LandingPageComponent },
 *   { path: 'inprint', component: InprintComponent },
 *   { path: 'policy', component: PrivacyPolicyComponent }
 * ];
 * ```
 */
export const routes: Routes = [
  /**
   * Route for the landing page.
   * 
   * - `path: ''`: The root path of the application.
   * - `component: LandingPageComponent`: The component to display for this route.
   */
  { path: '', component: LandingPageComponent },
  
  /**
   * Route for the inprint page.
   * 
   * - `path: 'inprint'`: The URL path for the inprint page.
   * - `component: InprintComponent`: The component to display for this route.
   */
  { path: 'imprint', component: InprintComponent },
  
  /**
   * Route for the privacy policy page.
   * 
   * - `path: 'policy'`: The URL path for the privacy policy page.
   * - `component: PrivacyPolicyComponent`: The component to display for this route.
   */
  { path: 'policy', component: PrivacyPolicyComponent }
];
