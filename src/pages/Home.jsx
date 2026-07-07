import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaCheck,
  FaChevronRight,
  FaCopy,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa'
import { motion, useReducedMotion } from 'framer-motion'
import campusHero from '../assets/campus-hero.jpeg'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import SharedNav from '../components/SharedNav.jsx'
import SharedFooter from '../components/SharedFooter.jsx'
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

/* Counts up from 0 when scrolled into view */
function StatCounter({ value, suffix = '', label }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const [display, setDisplay] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (reduceMotion) return undefined

    const node = ref.current
    if (!node) return undefined

    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const duration = 1100
        const start = performance.now()

        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(eased * value))
          if (t < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, reduceMotion])

  return (
    <div className="stat-card way-card" ref={ref}>
      <span className="stat-value">
        {display}
        <em>{suffix}</em>
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function Home() {
  const reduceMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [openSeniorId, setOpenSeniorId] = useState(null)
  const [copiedLabel, setCopiedLabel] = useState('')
  const [contactFilter, setContactFilter] = useState('All')
  const lastOpacityRef = useRef(-1)
  const lastScrolledRef = useRef(null)

  const galleryPhotoCount = useMemo(
    () => GALLERY_LOCATIONS.reduce((total, location) => total + location.images.length, 0),
    [],
  )

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
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      document.documentElement.style.setProperty('--scroll-progress', '0')
      document.documentElement.style.setProperty('--hero-bg-opacity', '1')
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenSeniorId(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!copiedLabel) return undefined
    const timeout = window.setTimeout(() => setCopiedLabel(''), 2000)
    return () => window.clearTimeout(timeout)
  }, [copiedLabel])

  const filteredSeniors = useMemo(
    () => SENIORS.filter((senior) => matchesContactType(senior, contactFilter)),
    [contactFilter],
  )

  const marqueeWords = [...lingoWords, ...lingoWords]

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
      <SharedNav floating />

      <main className="wayfinding-page">
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

          <div className="hero-scroll-hint" aria-hidden="true">
            Scroll
          </div>
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

        <ScrollReveal className="section stats-section" aria-label="Campus in numbers">
          <div className="stats-grid">
            <StatCounter value={CLUBS.length} suffix="+" label="Student clubs" />
            <StatCounter value={galleryPhotoCount} suffix="+" label="Campus photos" />
            <StatCounter value={FAQS.length} label="Questions answered" />
            <StatCounter value={SENIORS.length} label="Seniors on call" />
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
                <img src={senior.image} alt={`${senior.name} portrait`} className="senior-image" loading="lazy" />
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

      <SharedFooter />

      {copiedLabel ? (
        <div className="copy-toast" role="status" aria-live="polite">
          <FaCheck aria-hidden="true" />
          <span>{copiedLabel}</span>
        </div>
      ) : null}
    </>
  )
}
