// Visibility for content that is not ready to show on the live site.
//
// Projects: set SHOW_PROJECTS to true after src/data/projects.ts has real jobs
// (a photo, city or neighborhood, year, and an accurate scope). While this is
// false, the homepage cards, the /projects page, and every Projects nav link
// stay hidden. /projects redirects home.
//
// Testimonial: set SHOW_TESTIMONIAL to true only for a real client quote used
// with permission. The homepage block stays hidden while this is false.
//
// Owner bio: set SHOW_OWNER_BIO to true after replacing the bracketed bio on
// /about with verifiable facts. The placeholder paragraph stays hidden while
// this is false.
//
// Job-site photo: set SHOW_JOB_SITE_PHOTO to true after replacing the dashed
// photo slot on /about with a real photo of Jeremiah or the crew.
export const SHOW_PROJECTS = false;
export const SHOW_TESTIMONIAL = false;
export const SHOW_OWNER_BIO = false;
export const SHOW_JOB_SITE_PHOTO = false;
