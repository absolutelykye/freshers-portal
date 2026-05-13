/**
 * Real photos: add image files under `src/assets/gallery/<slug>/` using the slug
 * from each entry (e.g. `beach`, `maingate`, `academic-block`). Import each file
 * below and replace the `images` array for that location, for example:
 *
 *   import beach1 from '../assets/gallery/beach/photo-01.jpg'
 *   { slug: 'beach', title: 'Beach', images: [{ src: beach1, alt: '...' }, ...] },
 *
 * You do not need to send images through chat; add them locally in that folder,
 * then wire imports here (or use public URLs if you prefer).
 */
function imagesFor(slug, title, count = 4) {
  return Array.from({ length: count }, (_, i) => ({
    src: `https://picsum.photos/seed/iiserbpr-${slug}-${i}/960/720`,
    alt: `${title} — photo ${i + 1}`,
  }))
}

export const GALLERY_LOCATIONS = [
  {
    slug: 'beach',
    title: 'Beach',
    images: imagesFor('beach', 'Beach'),
  },
  {
    slug: 'maingate',
    title: 'IISER BPR main gate',
    images: imagesFor('maingate', 'IISER BPR main gate'),
  },
  {
    slug: 'academic-block',
    title: 'Academic block',
    images: imagesFor('academic-block', 'Academic block'),
  },
  {
    slug: 'onestop',
    title: 'Onestop',
    images: imagesFor('onestop', 'Onestop'),
  },
  {
    slug: 'amphitheatre',
    title: 'Amphitheatre',
    images: imagesFor('amphitheatre', 'Amphitheatre'),
  },
  {
    slug: 'labs',
    title: 'Labs',
    images: imagesFor('labs', 'Labs'),
  },
  {
    slug: 'sports-complex',
    title: 'Sports complex',
    images: imagesFor('sports-complex', 'Sports complex'),
  },
  {
    slug: 'gh',
    title: 'Girls hostel (GH)',
    images: imagesFor('gh', 'Girls hostel (GH)'),
  },
  {
    slug: 'bh1',
    title: 'Boys hostel-1 (BH1)',
    images: imagesFor('bh1', 'Boys hostel-1 (BH1)'),
  },
  {
    slug: 'bh2',
    title: 'Boys hostel-2 (BH2)',
    images: imagesFor('bh2', 'Boys hostel-2 (BH2)'),
  },
  {
    slug: 'misc',
    title: 'Misc',
    images: imagesFor('misc', 'Misc'),
  },
]

const bySlug = new Map(GALLERY_LOCATIONS.map((loc) => [loc.slug, loc]))

export function getGalleryLocation(slug) {
  if (!slug) return undefined
  return bySlug.get(slug)
}
