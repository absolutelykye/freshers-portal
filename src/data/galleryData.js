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
const allImages = import.meta.glob(
  '../assets/gallery/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
  {
    eager: true,
    import: 'default',
  }
)

function imagesFor(slug, title) {
  return Object.entries(allImages)
    .filter(([path]) => path.includes(`/${slug}/`))
    .map(([, src], index) => ({
      src,
      alt: `${title} — photo ${index + 1}`,
    }))
}
export const GALLERY_LOCATIONS = [
  {
    slug: 'beach',
    title: 'Beach',
    images: imagesFor('beach', 'Beach'),
  },  

  {
    slug: 'academic-block',
    title: 'Academic block',
    images: imagesFor('academic-block', 'Academic block'),
  },
  {
    slug: 'mess',
    title: 'Mess',
    images: imagesFor('mess', 'Mess'),
  },
  {
    slug: 'sports-complex',
    title: 'Sports Facilities',
    images: imagesFor('sports-complex', 'Sports Facilities'),
  },

  {
    slug: 'hostels',
    title: 'Hostels',
    images: imagesFor('hostels', 'Hostels'),
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
