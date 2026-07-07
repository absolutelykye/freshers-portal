import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaCheck,
  FaChevronRight,
  FaCopy,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSearch,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa'
import { motion, useReducedMotion } from 'framer-motion'
import campusHero from '../assets/campus-hero.jpeg'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { ScrollReveal, StaggerGrid, StaggerItem } from '../components/ScrollReveal.jsx'
import { CLUBS } from '../data/clubsData'
import { FAQS } from '../data/faqsData'
import { GALLERY_LOCATIONS } from '../data/galleryData'
import { SENIORS } from '../data/seniorsData'
import '../App.css'

const lingoWords = [
  'Amphi',
  'GH',
  'BH-1',
  'Pixophiles',
  'Shadjam',
  'Academic Block',
  'One Stop',
  'Hungry House',
  'Lovelace',
  'Yavanika',
]

const starterCards = [
  {
    code: '// 01',
    title: 'College Life',
    body: 'Learn the rhythm of campus, hostels, canteens, and the shortcuts people actually use.',
    action: 'Walk the map',
    to: '/gallery?loc=hostels',
  },
  {
    code: '// 02',
    title: 'Find Seniors',
    body: 'Reach out to second-years for the stuff the handbook never explains properly.',
    action: 'Open contacts',
    href: '#contact',
  },
  {
    code: '// 03',
    title: 'Gallery',
    body: 'Preview hostels, labs, sports spaces, and campus landmarks before you arrive.',
    action: 'Browse photos',
    to: '/gallery',
  },
  {
    code: '// 04',
    title: 'FAQs',
    body: 'Get fast answers about academics, health, safety, transport, and campus basics.',
    action: 'Read answers',
    to: '/faqs',
  },
]

const navLinks = [
  { label: 'Connect', href: '#contact' },
  { label: 'Clubs', to: '/clubs' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Gallery', to: '/gallery' },
]

const iiserLogoUrl =
  'https://iiserbpr.ac.in/webcontrol/uploads/file_upload/Logo_6936_X_22001728276596.png'

function matchesContactType(senior, filter) {
  if (filter === 'All') return true
  return senior.contacts.some((contact) => contact.type === filter.toLowerCase())
}

function contactIcon(type) {
  if (type === 'instagram') return <FaInstagram aria-hidden="true" />
  if (type === 'telegram') return <FaTelegram aria-hidden="true" />
  return <FaWhatsapp aria-hidden="true" />
}

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
    href: '#contact',
  }))

  return [...clubItems, ...faqItems, ...galleryItems, ...seniorItems]
}

export default function Home() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(true)
  const lastScrollYForNavRef = useRef(0)
  const lastNavHiddenRef = useRef(true)  
  const [openSeniorId, setOpenSeniorId] = useState(null)
  const [copiedLabel, setCopiedLabel] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [contactFilter, setContactFilter] = useState('All')
  const searchInputRef = useRef(null)
  const lastOpacityRef = useRef(-1)
  const lastScrolledRef = useRef(null)
  const allSearchItems = useMemo(searchItems, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    document.body.dataset.route = 'home'
    localStorage.setItem('theme', 'dark')

    return () => {
      delete document.body.dataset.route
    }
  }, [])

  useEffect(() => {
    let raf = 0

    const run = () => {
      raf = 0
      const scrollY = window.scrollY
      const fadeDistance = Math.max(window.innerHeight * 0.8, 1)
      const heroOpacity = Math.max(0, 1 - scrollY / fadeDistance)
      const progress = Math.min(scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1), 1)

      if (Math.abs(heroOpacity - lastOpacityRef.current) > 0.008) {
        lastOpacityRef.current = heroOpacity
        document.documentElement.style.setProperty('--hero-bg-opacity', String(heroOpacity))
      }

      document.documentElement.style.setProperty('--scroll-progress', String(progress))

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
        setOpenSeniorId(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!searchOpen) return
    searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    if (!copiedLabel) return undefined
    const timeout = window.setTimeout(() => setCopiedLabel(''), 2000)
    return () => window.clearTimeout(timeout)
  }, [copiedLabel])

  const filteredSeniors = useMemo(
    () => SENIORS.filter((senior) => matchesContactType(senior, contactFilter)),
    [contactFilter],
  )

  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return allSearchItems.slice(0, 10)
    return allSearchItems
      .filter((item) =>
        `${item.title} ${item.subtitle}`.toLowerCase().includes(query),
      )
      .slice(0, 10)
  }, [allSearchItems, searchQuery])

  const marqueeWords = [...lingoWords, ...lingoWords]

  function activateSearchItem(item) {
    setSearchOpen(false)
    setSearchQuery('')

    if (item.to) {
      navigate(item.to)
      return
    }

    if (item.href) {
      window.location.hash = item.href.replace('#', '')
    }
  }

  async function copyContact(value, label) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedLabel(`Copied ${label}`)
    } catch {
      setCopiedLabel(`Could not copy ${label}`)
    }
  }

  return (
    <>
      <div className="page-progress" aria-hidden="true" />
      <main className="wayfinding-page">
        
          <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${navHidden ? 'navbar-hidden' : ''}`}>
          <a className="brand" href="#home" aria-label="Freshers Guide home">
            <img src={freshersGuideLogo} alt="Freshers Guide logo" decoding="async" />
          </a>
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

        <section className="hero-section" id="home" style={{ '--hero-image': `url(${campusHero})` }}>
          <div className={`hero-logos ${isScrolled ? 'hero-logos-hidden' : 'hero-logos-visible'}`} aria-label="IISER Berhampur and Freshers Guide logos">
            <img className="hero-logo hero-logo-iiser" src={iiserLogoUrl} alt="IISER Berhampur logo" decoding="async" fetchPriority="high" />
            <img className="hero-logo hero-logo-guide" src={freshersGuideLogo} alt="Freshers Guide logo" decoding="async" fetchPriority="high" />
          </div>

          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
          >
            <p className="eyebrow hero-coordinate">[ ENTRY POINT ]</p>
            <h1 className="hero-title">
              Welcome to <span className="hero-title-accent">IISER Berhampur</span>
            </h1>
            <p className="hero-text">
              A first-year wayfinding guide for campus life, clubs, seniors, everyday survival,
              and the places you’ll learn to call by their nicknames.
            </p>
            <div className="hero-actions">
              <a className="primary-button btn-primary" href="#start-here">
                Start here
              </a>
              <a className="secondary-button btn-secondary" href="#contact">
                Meet seniors
              </a>
            </div>
          </motion.div>
        </section>

        <ScrollReveal className="lingo-strip" aria-label="Campus lingo">
          <div className="lingo-track">
            {marqueeWords.map((word, index) => (
              <span className="lingo-word" key={`${word}-${index}`}>
                {word}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="section start-section way-section" id="start-here">
          <div className="section-heading">
            <p className="eyebrow">Starter Sequence</p>
            <h2>Find your way in</h2>
            <p>The first four things most freshers need are not random. They form a route.</p>
          </div>

          <div className="starter-flow">
            <svg className="starter-route" viewBox="0 0 1200 220" aria-hidden="true">
              <path d="M80 118 C 210 60, 290 60, 380 118 S 560 176, 660 118 S 860 52, 1120 118" />
            </svg>
            <div className="starter-route-pulse" aria-hidden="true" />
            <StaggerGrid className="starter-grid way-grid">
              {starterCards.map((card) => (
                <StaggerItem className="starter-grid-cell" key={card.title}>
                  {card.to ? (
                    <Link className="event-card starter-card-link way-card" to={card.to}>
                      <span className="card-code">{card.code}</span>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                      <span className="card-arrow">
                        {card.action}
                        <FaChevronRight aria-hidden="true" />
                      </span>
                    </Link>
                  ) : (
                    <a className="event-card starter-card-link way-card" href={card.href}>
                      <span className="card-code">{card.code}</span>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                      <span className="card-arrow">
                        {card.action}
                        <FaChevronRight aria-hidden="true" />
                      </span>
                    </a>
                  )}
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </ScrollReveal>

        <ScrollReveal className="section placeholder-section gallery-preview-section way-section" id="clubs">
          <div className="section-heading gallery-preview-heading">
            <p className="eyebrow">Communities</p>
            <h2>Clubs</h2>
            <p>From astronomy to theatre, club life is where the campus becomes legible.</p>
            <Link className="secondary-button btn-secondary gallery-view-button" to="/clubs">
              Browse all clubs
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal className="section placeholder-section way-section" id="faqs">
          <div className="section-heading">
            <p className="eyebrow">Questions</p>
            <h2>FAQs</h2>
            <p>The answers people usually collect over a month are here in one sitting.</p>
          </div>
          <Link to="/faqs" className="secondary-button btn-secondary">
            View all FAQs
          </Link>
        </ScrollReveal>

        <ScrollReveal className="section placeholder-section gallery-preview-section way-section" id="gallery">
          <div className="section-heading gallery-preview-heading">
            <p className="eyebrow">Campus Life</p>
            <h2>Gallery</h2>
            <p>Use the gallery like a pre-arrival map: hostels, labs, beach, mess, sports spaces.</p>
            <Link className="secondary-button btn-secondary gallery-view-button" to="/gallery">
              View full gallery
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal className="contact-section way-section" id="contact">
          <div className="contact-header">
            <p className="eyebrow">Signal Desk</p>
            <h2>Find your seniors</h2>
            <p className="contact-subtext">
              Ask about classes, hostels, clubs, where to eat, and which doors to knock on first.
            </p>
          </div>

          <div className="senior-filters" role="group" aria-label="Filter seniors by contact method">
            {['All', 'WhatsApp', 'Instagram', 'Telegram'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`secondary-button senior-filter-chip ${contactFilter === filter ? 'is-active' : ''}`}
                onClick={() => setContactFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="senior-grid">
            {filteredSeniors.map((senior) => (
              <article className={`senior-card way-card ${openSeniorId === senior.id ? 'show-contact' : ''}`} key={senior.id}>
                <span className="card-code">{senior.code}</span>
                <img src={senior.image} alt={`${senior.name} portrait`} className="senior-image" />
                <h3>{senior.name}</h3>
                <p className="senior-role">{senior.year}</p>

                <button
                  className="secondary-button btn-secondary view-contact-btn"
                  onClick={() => setOpenSeniorId((current) => (current === senior.id ? null : senior.id))}
                  aria-expanded={openSeniorId === senior.id}
                >
                  View contact
                </button>

                <div className="contact-overlay" role="dialog" aria-label={`${senior.name} contact options`}>
                  <button
                    className="contact-overlay-close ghost-icon-button"
                    onClick={() => setOpenSeniorId(null)}
                    aria-label="Close contact options"
                  >
                    ×
                  </button>
                  <div className="contact-popover-arrow" aria-hidden="true" />
                  <div className="contact-popover-list">
                    {senior.contacts.map((contact) => (
                      <div className="contact-popover-item" key={contact.href}>
                        <a href={contact.href} target="_blank" rel="noopener noreferrer" className={`contact-pill contact-pill-${contact.type}`}>
                          <span className="contact-pill-icon">{contactIcon(contact.type)}</span>
                          <span>{contact.label}</span>
                        </a>
                        <button
                          type="button"
                          className="contact-copy-btn ghost-icon-button"
                          onClick={() => copyContact(contact.value, `${senior.name}'s ${contact.label.toLowerCase()}`)}
                          aria-label={`Copy ${contact.label}`}
                        >
                          <FaCopy aria-hidden="true" />
                          <span>{contact.value}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </main>

      <ScrollReveal className="footer" element="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Freshers Guide</h2>
            <p>Built to help first-years find their footing faster.</p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/clubs">Clubs</Link>
            <Link to="/gallery">Gallery</Link>
            <a href="#start-here">Starter kit</a>
          </div>

          <div className="footer-column">
            <h3>Community</h3>
            <a href="#contact">Contact seniors</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <span>Made by</span>
            <a href="https://vedantpardhi.vercel.app" target="_blank" rel="noreferrer" className="footer-credit-link">
              Vedant Pardhi
            </a>
            <span className="footer-dot">•</span>
            <a href="https://vedantpardhi.vercel.app" target="_blank" rel="noreferrer" className="footer-icon" aria-label="Portfolio">
              <FaGlobe />
            </a>
            <span className="footer-dot">•</span>
            <a href="https://linkedin.com/in/vedantpardhi" target="_blank" rel="noreferrer" className="footer-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <span className="footer-dot">•</span>
            <a href="https://instagram.com/crustrohl" target="_blank" rel="noreferrer" className="footer-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </ScrollReveal>

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

      {copiedLabel ? (
        <div className="copy-toast" role="status" aria-live="polite">
          <FaCheck aria-hidden="true" />
          <span>{copiedLabel}</span>
        </div>
      ) : null}
    </>
  )
}
