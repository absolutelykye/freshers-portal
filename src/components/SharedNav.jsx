import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { CLUBS } from '../data/clubsData'
import { FAQS } from '../data/faqsData'
import { GALLERY_LOCATIONS } from '../data/galleryData'
import { SENIORS } from '../data/seniorsData'

const navLinks = [
  { label: 'Connect', href: '/#contact' },
  { label: 'Clubs', to: '/clubs' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Gallery', to: '/gallery' },
]

function searchItems() {
  const clubItems = CLUBS.map((club) => ({
    id: `club-${club.id}`,
    title: club.name,
    subtitle: 'Club',
    to: `/clubs?club=${club.id}`,
  }))

  const faqItems = FAQS.map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    subtitle: faq.tag,
    to: `/faqs#faq-${faq.id}`,
  }))

  const galleryItems = GALLERY_LOCATIONS.map((location) => ({
    id: `gallery-${location.slug}`,
    title: location.title,
    subtitle: 'Gallery',
    to: `/gallery?loc=${location.slug}`,
  }))

  const seniorItems = SENIORS.map((senior) => ({
    id: `senior-${senior.id}`,
    title: senior.name,
    subtitle: 'Senior',
    href: '/#contact',
  }))

  return [...clubItems, ...faqItems, ...galleryItems, ...seniorItems]
}

/**
 * floating: home-page behaviour — the navbar stays hidden while the hero
 * (with its own logos) is on screen and slides in after scrolling past it.
 * Subpages render it statically visible from the start.
 */
export default function SharedNav({ floating = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(floating)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const lastScrolledRef = useRef(null)
  const lastNavHiddenRef = useRef(floating)
  const allSearchItems = useMemo(() => searchItems(), [])

  // close the mobile menu whenever the route changes
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    let raf = 0

    const run = () => {
      raf = 0
      const scrollY = window.scrollY

      const scrolled = scrollY > 40
      if (lastScrolledRef.current !== scrolled) {
        lastScrolledRef.current = scrolled
        setIsScrolled(scrolled)
      }

      if (floating) {
        const hidden = scrollY <= 80
        if (hidden !== lastNavHiddenRef.current) {
          lastNavHiddenRef.current = hidden
          setNavHidden(hidden)
        }
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [floating])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!searchOpen) return
    searchInputRef.current?.focus()
  }, [searchOpen])

  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return allSearchItems.slice(0, 10)
    return allSearchItems
      .filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(query))
      .slice(0, 10)
  }, [allSearchItems, searchQuery])

  function activateSearchItem(item) {
    setSearchOpen(false)
    setSearchQuery('')
    if (item.to) {
      navigate(item.to)
    } else if (item.href) {
      window.location.assign(item.href)
    }
  }

  function isActive(link) {
    return link.to && location.pathname === link.to
  }

  function renderLink(link, extraProps = {}) {
    return link.to ? (
      <Link
        key={link.label}
        to={link.to}
        className={isActive(link) ? 'active' : undefined}
        {...extraProps}
      >
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href} {...extraProps}>
        {link.label}
      </a>
    )
  }

  return (
    <>
      <nav
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${
          navHidden && !menuOpen ? 'navbar-hidden' : ''
        }`}
      >
        <Link className="brand" to="/" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="Freshers Guide logo" decoding="async" />
        </Link>

        <div className="nav-links" aria-label="Main navigation">
          {navLinks.map((link) => renderLink(link))}
          <button
            type="button"
            className="command-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <FaSearch aria-hidden="true" />
            <span>Search</span>
            <span className="command-kbd">CMD K</span>
          </button>
        </div>

        <button
          type="button"
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map((link) => renderLink(link, { onClick: () => setMenuOpen(false) }))}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false)
            setSearchOpen(true)
          }}
        >
          <span>Search</span>
          <span className="mobile-menu-hint">
            <FaSearch aria-hidden="true" />
          </span>
        </button>
      </div>

      {searchOpen ? (
        <div className="command-palette-shell" onClick={() => setSearchOpen(false)}>
          <div className="command-palette" onClick={(event) => event.stopPropagation()}>
            <div className="command-palette-head">
              <FaSearch aria-hidden="true" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="command-palette-input"
                placeholder="Search clubs, seniors, FAQs, gallery locations..."
                aria-label="Search the guide"
              />
            </div>
            <ul className="command-palette-results">
              {filteredSearchItems.length === 0 ? (
                <li className="command-palette-empty">No matches. Try another word.</li>
              ) : (
                filteredSearchItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="command-palette-result"
                      onClick={() => activateSearchItem(item)}
                    >
                      <span>{item.title}</span>
                      <small>{item.subtitle}</small>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  )
}
