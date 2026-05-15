import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import campusHero from '../assets/campus-hero.jpeg'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { ScrollReveal, StaggerGrid, StaggerItem } from '../components/ScrollReveal.jsx'
import '../App.css'

const lingoWords = [
  'Amphi',
  'GH',
  'BH-1',
  'Pixophiles',
  'shadjam',
  'academic-block',
  'onestop',
  'hungry-house',
  'lovelace',
  'yavanika',
  'verdad',
]

const iiserLogoUrl =
  'https://iiserbpr.ac.in/webcontrol/uploads/file_upload/Logo_6936_X_22001728276596.png'

const heroEase = [0.22, 1, 0.36, 1]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const reduceMotion = useReducedMotion()
  const lastOpacityRef = useRef(-1)
  const lastScrolledRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    let raf = 0

    const run = () => {
      raf = 0
      const scrollY = window.scrollY
      const fadeDistance = Math.max(window.innerHeight * 0.75, 1)
      const heroOpacity = Math.max(0, 1 - scrollY / fadeDistance)

      if (Math.abs(heroOpacity - lastOpacityRef.current) > 0.008) {
        lastOpacityRef.current = heroOpacity
        document.documentElement.style.setProperty('--hero-bg-opacity', String(heroOpacity))
      }

      const scrolled = scrollY > 12
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
    }
  }, [])

  const marqueeWords = [...lingoWords, ...lingoWords]

  return (
    <>
      <main>
        <nav
          className={`navbar ${isScrolled ? 'navbar-scrolled navbar-visible' : 'navbar-hidden'}`}
        >
          <a className="brand" href="#home" aria-label="Freshers Guide home">
            <img src={freshersGuideLogo} alt="Freshers Guide logo" decoding="async" />
          </a>
          <div className="nav-links" aria-label="Main navigation">
            <a href="#contact">Connect</a>
            <Link to="/clubs">Clubs</Link>
            <a href="#faqs">FAQs</a>
            <Link to="/gallery">Gallery</Link>
            <a href="#start-here">Guides</a>
          </div>
        </nav>

        <section
          className="hero-section"
          id="home"
          style={{ '--hero-image': `url(${campusHero})` }}
        >
          <div
            className={`hero-logos ${isScrolled ? 'hero-logos-hidden' : 'hero-logos-visible'}`}
            aria-label="IISER Berhampur and Freshers Guide logos"
          >
            <img
              className="hero-logo hero-logo-iiser"
              src={iiserLogoUrl}
              alt="IISER Berhampur logo"
              decoding="async"
              fetchPriority="high"
            />
            <img
              className="hero-logo hero-logo-guide"
              src={freshersGuideLogo}
              alt="Freshers Guide logo"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <motion.div
            className="hero-copy hero-glass"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.62,
              ease: heroEase,
              delay: reduceMotion ? 0 : 0.06,
            }}
          >
            <p className="eyebrow">For first-year students</p>
            <h1>
              <span className="hero-title-line">
                Welcome to <span className="hero-title-iiser">IISER</span>
              </span>
              <span className="hero-title-berhampur">Berhampur</span>
            </h1>
            <p className="hero-text">
              A simple guide for freshers to find events, useful resources,
              campus contacts, and everything they usually ask seniors in the
              first few weeks.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#start-here">
                Start here
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

        <ScrollReveal className="section start-section" id="start-here">
          <div className="section-heading">
            <p className="eyebrow">Begin here</p>
            <h2>Freshers starter kit</h2>
          </div>
          <StaggerGrid className="starter-grid">
            <StaggerItem className="starter-grid-cell">
              <Link className="event-card starter-card-link" to="/clubs">
                <span> </span>
                <h3>College life and Clubs</h3>
                <p>
                  Take a look at all of the clubs that student body offers to make your college life
                  more enjoyable.
                </p>
              </Link>
            </StaggerItem>
            <StaggerItem className="starter-grid-cell">
              <a className="event-card starter-card-link" href="#contact">
                <span></span>
                <h3>Find your seniors</h3>
                <p>
                  Attend orientation, club introductions, and department meetups to meet classmates
                  and seniors.
                </p>
              </a>
            </StaggerItem>
            <StaggerItem className="starter-grid-cell">
              <Link className="event-card starter-card-link" to="/gallery">
                <span></span>
                <h3>Gallery</h3>
                <p>
                  Find hostels, lecture halls, canteens, labs, and other important campus locations
                  to navigate your first weeks with ease.
                </p>
              </Link>
            </StaggerItem>
          </StaggerGrid>
        </ScrollReveal>

        <ScrollReveal
          className="section placeholder-section gallery-preview-section"
          id="clubs"
        >
          <div className="section-heading gallery-preview-heading">
            <p className="eyebrow">Communities</p>
            <h2>Clubs</h2>
            <p>
              Browse short profiles of campus clubs—music, tech, theatre, sports, outreach, and
              more.
            </p>
            <Link className="primary-button gallery-view-button" to="/clubs">
              Browse all clubs
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal className="section placeholder-section" id="faqs">
          <div className="section-heading">
            <p className="eyebrow">Questions</p>
            <h2>FAQs</h2>
            <p>Common fresher questions and answers can be added here.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="section placeholder-section gallery-preview-section" id="gallery">
          <div className="section-heading gallery-preview-heading">
            <p className="eyebrow">Campus life</p>
            <h2>Gallery</h2>
            <p>
              Explore photos of campus spots: hostels, labs, sports complex, the beach nearby, and
              more.
            </p>
            <Link className="primary-button gallery-view-button" to="/gallery">
              View full gallery
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal className="contact-section" id="contact">
  <div className="contact-header">
    <p className="eyebrow">NEED HELP?</p>

    <h2>Contact seniors</h2>

    <p className="contact-subtext">
      Reach out to seniors for help regarding academics,
      hostels, clubs, events, and campus life.
    </p>
  </div>

  <div className="senior-grid">

    <div className="senior-card">
      <img
        src="/seniors/senior1.jpg"
        alt="Senior"
        className="senior-image"
      />

      <h3>Akshat Sharma</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <details className="contact-dropdown">
        <summary>View Contact</summary>

        <div className="contact-info">
          <p>Instagram: @thegoodscientist</p>
          <p>Whatsapp: 9335885779 </p>
        </div>
      </details>
    </div>

    <div className="senior-card">
      <img
        src="/seniors/senior2.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Gaurav Powar</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <details className="contact-dropdown">
        <summary>View Contact</summary>

        <div className="contact-info">
          <p>Instagram: @thats.gaurav</p>
          <p>Whatsapp: 8767480700</p>
        </div>
      </details>
    </div>

    <div className="senior-card">
      <img
        src="/seniors/senior3.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>F Shiefer Melbert</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <details className="contact-dropdown">
        <summary>View Contact</summary>

        <div className="contact-info">
          <p>Instagram: @impassivegreen </p>
          <p>WhatsApp: 9310737354 </p>
        </div>
      </details>
    </div>
        <div className="senior-card">
      <img
        src="/seniors/senior4.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Annany Pratap Singh</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <details className="contact-dropdown">
        <summary>View Contact</summary>

        <div className="contact-info">
          <p>Instagram: @annany_pratap_singh</p>
          <p>Whatsapp: 7454072488</p>
        </div>
      </details>
    </div>    <div className="senior-card">
      <img
        src="/seniors/senior5.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Vedant Pardhi</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <details className="contact-dropdown">
        <summary>View Contact</summary>

        <div className="contact-info">
          <p>Instagram: @crustrohl</p>
          <p>Telegram: @vedntp</p>
        </div>
      </details>
    </div>

  </div>
</ScrollReveal>

      </main>

      <ScrollReveal className="footer" element="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Freshers&apos; Guide</h2>
            <p>A 2025 batch driven platform.</p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/clubs">Clubs</Link>
            <Link to="/gallery">Gallery</Link>
            <a href="#start-here">Guides</a>
          </div>

          <div className="footer-column">
            <h3>Community</h3>
            <a href="#home">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <span>Made by</span>
            <a
              href="https://linkedin.com/in/vedantpardhi"
              target="_blank"
              rel="noreferrer"
              className="footer-credit-link"
            >
              Vedant
            </a>
            <span className="footer-dot">•</span>
            <a
              href="https://linkedin.com/in/vedantpardhi"
              target="_blank"
              rel="noreferrer"
              className="footer-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <span className="footer-dot">•</span>
            <a
              href="https://instagram.com/crustrohl"
              target="_blank"
              rel="noreferrer"
              className="footer-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </>
  )
}
