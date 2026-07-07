import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaCheck } from 'react-icons/fa'
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
    subtitle: 'Student club',
    to: `/clubs?club=${club.id}`,
  }))

  const faqItems = FAQS.slice(0, 12).map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    subtitle: faq.tag,
    to: `/faqs#faq-${faq.id}`,
  }))

  const galleryItems = GALLERY_LOCATIONS.map((location) => ({
    id: `gallery-${location.slug}`,
    title: location.title,
    subtitle: 'Gallery location',
    to: `/gallery?loc=${location.slug}`,
  }))

  const seniorItems = SENIORS.map((senior) => ({
    id: `senior-${senior.id}`,
    title: senior.name,
    subtitle: 'Contact senior',
    to: '/#contact',
  }))

  return [...clubItems, ...faqItems, ...galleryItems, ...seniorItems]
}

export default function SharedNav() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const lastScrolledRef = useRef(false)
  const lastNavHiddenRef = useRef(true)
  const allSearchItems = useMemo(searchItems, [])

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

      const hidden = scrollY <= 80
      if (hidden !== lastNavHiddenRef.current) {
        lastNavHiddenRef.current = hidden
        setNavHidden(hidden)
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
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
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
    if (item.to) navigate(item.to)
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${navHidden ? 'navbar-hidden' : ''}`}>
        <Link className="brand" to="/" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="Freshers Guide logo" decoding="async" />
        </Link>
        <div className="nav-links" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ),
          )}
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
      </nav>

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
              {filteredSearchItems.map((item) => (
                <li key={item.id}>
                  <button type="button" className="command-palette-result" onClick={() => activateSearchItem(item)}>
                    <span>{item.title}</span>
                    <small>{item.subtitle}</small>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  )
}