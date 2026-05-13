import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { GALLERY_LOCATIONS, getGalleryLocation } from '../data/galleryData'
import '../App.css'
import './GalleryPage.css'

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const locSlug = searchParams.get('loc') ?? ''

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  const active = useMemo(() => getGalleryLocation(locSlug), [locSlug])
  const unknownSlug = Boolean(locSlug) && !active

  function selectLocation(slug) {
    setSearchParams({ loc: slug })
  }

  function clearLocation() {
    setSearchParams({})
  }

  return (
    <div className="gallery-page">
      <header className="gallery-page-header">
        <Link className="gallery-page-brand" to="/" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="" width={120} height={40} />
        </Link>
        <nav className="gallery-page-nav" aria-label="Gallery navigation">
          <Link to="/">Home</Link>
          <Link to="/#gallery">On this site</Link>
        </nav>
      </header>

      <main className="gallery-page-main">
        <div className="gallery-page-intro">
          <p className="eyebrow">Campus life</p>
          <h1>Gallery</h1>
          <p className="gallery-page-lead">
            Browse photos by location. Add image files under{' '}
            <code className="gallery-page-code">src/assets/gallery/</code>, one subfolder per
            location slug (for example <code className="gallery-page-code">beach/</code>), then
            import them in{' '}
            <code className="gallery-page-code">src/data/galleryData.js</code> (see the comment at
            the top of that file).
          </p>
        </div>

        {unknownSlug ? (
          <div className="gallery-unknown">
            <p>That location was not found.</p>
            <button type="button" className="primary-button" onClick={clearLocation}>
              All locations
            </button>
          </div>
        ) : !active ? (
          <>
            <h2 className="gallery-page-subheading">Choose a location</h2>
            <ul className="gallery-location-list">
              {GALLERY_LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <button
                    type="button"
                    className="gallery-location-option"
                    onClick={() => selectLocation(location.slug)}
                  >
                    {location.title}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="gallery-active-toolbar">
              <button type="button" className="secondary-button" onClick={clearLocation}>
                All locations
              </button>
              <h2 className="gallery-active-title">{active.title}</h2>
            </div>
            <ul className="gallery-image-grid">
              {active.images.map((img) => (
                <li key={img.src}>
                  <figure className="gallery-image-card">
                    <img src={img.src} alt={img.alt} loading="lazy" width={960} height={720} />
                  </figure>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}
