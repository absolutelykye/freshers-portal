import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { GALLERY_LOCATIONS, getGalleryLocation } from '../data/galleryData'
import '../App.css'
import './GalleryPage.css'

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const touchStartXRef = useRef(0)
  const touchEndXRef = useRef(0)
  const locSlug = searchParams.get('loc') ?? ''

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  const active = useMemo(() => getGalleryLocation(locSlug), [locSlug])
  const unknownSlug = Boolean(locSlug) && !active
  const activeImage = active && lightboxIndex !== null ? active.images[lightboxIndex] : null

  useEffect(() => {
    setLightboxIndex(null)
  }, [locSlug])

  useEffect(() => {
    if (!active || lightboxIndex === null) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null)
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((current) =>
          current === null ? current : (current + 1) % active.images.length,
        )
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) =>
          current === null
            ? current
            : (current - 1 + active.images.length) % active.images.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, lightboxIndex])

  function selectLocation(slug) {
    setSearchParams({ loc: slug })
  }

  function clearLocation() {
    setSearchParams({})
  }

  function openLightbox(index) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function showNextImage() {
    if (!active) return
    setLightboxIndex((current) =>
      current === null ? current : (current + 1) % active.images.length,
    )
  }

  function showPreviousImage() {
    if (!active) return
    setLightboxIndex((current) =>
      current === null ? current : (current - 1 + active.images.length) % active.images.length,
    )
  }

  function handleLightboxTouchStart(event) {
    touchStartXRef.current = event.changedTouches[0].clientX
  }

  function handleLightboxTouchEnd(event) {
    touchEndXRef.current = event.changedTouches[0].clientX
    const delta = touchEndXRef.current - touchStartXRef.current

    if (Math.abs(delta) < 48) return

    if (delta < 0) {
      showNextImage()
    } else {
      showPreviousImage()
    }
  }

  return (
    <div className="subpage-shell gallery-page">
      <header className="subpage-header">
        <Link className="subpage-brand" to="/" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="" width={136} height={52} />
        </Link>
        <nav className="subpage-nav" aria-label="Gallery navigation">
          <Link to="/">Home</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/faqs">FAQs</Link>
        </nav>
      </header>

      <main className="subpage-main gallery-page-main">
        <div className="section-heading gallery-page-intro">
          <p className="eyebrow">Campus Life</p>
          <h1>Gallery</h1>
          <p className="gallery-page-lead">
            Think of this as the visual map. Open a place, inspect it properly, and swipe through it
            on your phone without the grid fighting back.
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
                    <span>{location.title}</span>
                    <small>{location.images.length} photos</small>
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
            {active.images.length === 0 ? (
              <div className="gallery-unknown">
                <p>No images available for this location yet.</p>
              </div>
            ) : (
              <ul className="gallery-image-grid">
                {active.images.map((img, index) => (
                  <li key={img.src}>
                    <button
                      type="button"
                      className="gallery-image-button"
                      onClick={() => openLightbox(index)}
                      aria-label={`Open image ${index + 1} of ${active.images.length}`}
                    >
                      <figure className="gallery-image-card">
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          decoding="async"
                          width={960}
                          height={720}
                        />
                        <figcaption className="gallery-image-meta">
                          <span>{active.title}</span>
                          <span>{index + 1} / {active.images.length}</span>
                        </figcaption>
                      </figure>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>

      {activeImage ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} image viewer`}
          onClick={closeLightbox}
        >
          <div
            className="gallery-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              Close
            </button>

            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow-left"
              onClick={showPreviousImage}
              aria-label="Previous image"
            >
              ‹
            </button>

            <figure className="gallery-lightbox-figure">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="gallery-lightbox-image"
              />
              <figcaption className="gallery-lightbox-caption">
                <span>{activeImage.alt}</span>
                <span>{lightboxIndex + 1} / {active.images.length}</span>
              </figcaption>
            </figure>

            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow-right"
              onClick={showNextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
