/**
 * Root Route Server Load Function
 * Redirects to the capture page as default entry point
 */

import { redirect } from '@sveltejs/kit';

export function load() {
  // Redirect root to capture page
  throw redirect(307, '/capture');
}
