/**
 * Application constants - update these to change branding across the site
 */

// Club identity
export const CLUB = {
  name: "White Army Arts & Sports Club",
  shortName: "White Army",
  village: "Thumpoly",
  villageFull: "Thumpoly Village",
} as const;

// Milestones
export const MILESTONES = {
  /** Year the club was officially registered */
  registeredYear: 2014,
  /** Number of years since the club started (informally) */
  yearsOfService: 17,
} as const;

// Contact
export const CONTACT = {
  email: "contact@whitearmy.org",
  phone: "+91 XXXXX XXXXX",
} as const;

// SEO / Metadata (computed from constants above)
const startYear = new Date().getFullYear() - MILESTONES.yearsOfService;
export const APP = {
  title: `${CLUB.name} - ${CLUB.village}`,
  description: `${CLUB.name}, ${CLUB.village}. A community built on unity—no politics, no religion, no caste. Serving our village since ${startYear}.`,
} as const;
