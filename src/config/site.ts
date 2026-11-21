/**
 * Site-wide configuration. Values that change per environment come from
 * PUBLIC_* environment variables (see .env.example). Nothing here is secret.
 */
const env = import.meta.env;
const clean = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);

export const site = {
  name: 'Redefine Normal',
  speaker: 'Cameron Schiller',
  title: 'Redefine Normal — An Interactive Keynote by Cameron Schiller',
  description:
    'Redefine Normal is an interactive keynote about personal transformation. Four-time Team USA athlete and two-time national triathlon champion Cameron Schiller shares his story and the principles of the Operator-Athlete Method.',
  locale: 'en_US',

  booking: {
    /** JSON POST endpoint (e.g. Formspree). null = form not connected yet. */
    formEndpoint: clean(env.PUBLIC_FORM_ENDPOINT),
    /** Public booking address. null = not supplied yet. */
    email: clean(env.PUBLIC_BOOKING_EMAIL) ?? 'operatorathletemethod@gmail.com',
  },

  /** Path under /public, or null until the final PDF is supplied. */
  oneSheet: 'assets/one-sheet/redefine-normal-one-sheet.pdf' as string | null,

  analytics: {
    plausibleDomain: clean(env.PUBLIC_PLAUSIBLE_DOMAIN),
  },

  /** Show "needs approval" markers. Defaults on until PUBLIC_REVIEW_MODE=false. */
  reviewMode: env.PUBLIC_REVIEW_MODE !== 'false',
};

/** Prefix a /public path with the deploy base (needed for GitHub project pages). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
