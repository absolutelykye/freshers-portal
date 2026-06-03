import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import campusHero from '../assets/campus-hero.jpeg'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp, FaGlobe} from 'react-icons/fa'
import { ScrollReveal, StaggerGrid, StaggerItem } from '../components/ScrollReveal.jsx'
import '../App.css'
import GlowCursor from './GlowCursor'


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
        <GlowCursor/>
        <nav
          className={`navbar ${isScrolled ? 'navbar-scrolled navbar-visible' : 'navbar-hidden'}`}
        >
          <a className="brand" href="#home" aria-label="Freshers Guide home">
            <img src={freshersGuideLogo} alt="Freshers Guide logo" decoding="async" />
          </a>
          <div className="nav-links" aria-label="Main navigation">
            <a href="#contact">Connect</a>
            <Link to="/clubs">Clubs</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/gallery">Gallery</Link>
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
            <p className="eyebrow">For freshers and aspirants who want to know more IISER Berhampur</p>
            <h1>
              <span className="hero-title-line">
                Welcome to <span className="hero-title-iiser">IISER</span>
              </span>
              <span className="hero-title-berhampur">Berhampur</span>
            </h1>
            <p className="hero-text">
              A simple guide for freshers and aspirants to find useful resources,
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
            <h2>Starter kit</h2>
          </div>
          <StaggerGrid className="starter-grid">
            <StaggerItem className="starter-grid-cell">
              <Link className="event-card starter-card-link" to="/clubs">
                <span> </span>
                <h3>College life and Clubs</h3>
                <p>
                  Take a look at all of the clubs that student body offers to make your college life
                  more enjoyable at IISER Berhampur.
                </p>
              </Link>
            </StaggerItem>
            <StaggerItem className="starter-grid-cell">
              <a className="event-card starter-card-link" href="#contact">
                <span></span>
                <h3>Find your seniors</h3>
                <p>
                  Get in touch with seniors if you need any help. Got any doubts? - ask away! 
                </p>
              </a>
            </StaggerItem>
            <StaggerItem className="starter-grid-cell">
              <Link className="event-card starter-card-link" to="/gallery">
                <span></span>
                <h3>Gallery</h3>
                <p>
                  Find hostels, lecture halls, canteens, labs, and other important campus locations in IISER Berhampur
                  to navigate your first weeks with ease.
                </p>
              </Link>
            </StaggerItem>

            <StaggerItem className="starter-grid-cell">
              <Link className="event-card starter-card-link" to="/faqs">
                <span></span>
                <h3>FAQs</h3>
                <p>
                  Frequently asked questions about IISER BPR.
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
            <p className="eyebrow">Got questions?</p>
            <h2>FAQs</h2>
            <p>Common fresher questions and answers.</p>
          </div>
          <Link to="/faqs" className="primary-button">
            View All FAQs
          </Link>
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
        src="/seniors/senior1.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Akshat Sharma</h3>

      <p className="senior-role">
        2nd Year
      </p>

        <button
                className="primary-button view-contact-btn"
                onClick={(e) => {
                  e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
                }}
              >
                View Contact
              </button>

              <div className="contact-overlay">
                <button
                  className="contact-overlay-close"
                  onClick={(e) => {
                    e.currentTarget.closest('.senior-card').classList.remove('show-contact');
                  }}
                >
                  ✕
                </button>
                      <a href="https://instagram.com/akshat.sharma_only" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
              <FaInstagram />
            </a>
                      <a href="https://wa.me/919335885779" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
              <FaWhatsapp />
            </a>
              </div>
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

      <button
              className="primary-button view-contact-btn"
              onClick={(e) => {
                e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
              }}
            >
              View Contact
            </button>

            <div className="contact-overlay">
              <button
                className="contact-overlay-close"
                onClick={(e) => {
                  e.currentTarget.closest('.senior-card').classList.remove('show-contact');
                }}
              >
                ✕
              </button>
                    <a href="https://instagram.com/thats.gaurav" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
            <FaInstagram />
          </a>
                    <a href="https://wa.me/918767480700" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
            <FaWhatsapp />
          </a>
            </div>
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

          <button
        className="primary-button view-contact-btn"
        onClick={(e) => {
          e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
        }}
      >
        View Contact
      </button>

      <div className="contact-overlay">
        <button
          className="contact-overlay-close"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.remove('show-contact');
          }}
        >
          ✕
        </button>
              <a href="https://instagram.com/impassivegreen" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
      <FaInstagram />
    </a>
              <a href="https://wa.me/919310737354" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
      <FaWhatsapp />
    </a>
      </div>
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

      <button
    className="primary-button view-contact-btn"
    onClick={(e) => {
      e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
    }}
  >
    View Contact
  </button>

  <div className="contact-overlay">
    <button
      className="contact-overlay-close"
      onClick={(e) => {
        e.currentTarget.closest('.senior-card').classList.remove('show-contact');
      }}
    >
      ✕
    </button>
          <a href="https://instagram.com/annany_pratap_singh" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
  <FaInstagram />
</a>
          <a href="https://wa.me/917454072488" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
  <FaWhatsapp />
</a>
  </div>

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

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          <a href="https://instagram.com/crustrohl" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
  <FaInstagram />
</a>
          <a href="https://t.me/vedntp" target="_blank" rel="noopener noreferrer" className='contact-icon telegram'>
  <FaTelegram />
</a>
        </div>
    </div>  <div className="senior-card">
      <img
        src="/seniors/senior6.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Vedant Bhajipale</h3>

      <p className="senior-role">
        2nd Year
      </p>

        <button
    className="primary-button view-contact-btn"
    onClick={(e) => {
      e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
    }}
  >
    View Contact
  </button>

  <div className="contact-overlay">
    <button
      className="contact-overlay-close"
      onClick={(e) => {
        e.currentTarget.closest('.senior-card').classList.remove('show-contact');
      }}
    >
      ✕
    </button>
    <a href="https://instagram.com/vedantabhajipale6" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
      <FaInstagram />
    </a>
              <a href="https://wa.me/8623041968" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
      <FaWhatsapp />
    </a>
  </div>
    
    </div> 
    <div className="senior-card">
      <img
        src="/seniors/senior7.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Sathya Narayanan V</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          
          <a href="https://wa.me/917904997406" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
  <FaWhatsapp />
</a>
        </div>
    </div>
    <div className="senior-card">
      <img
        src="/seniors/senior8.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Kanshika Khatri</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          
          <a href="https://wa.me/919796261024" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
  <FaWhatsapp />
</a>
          <a href="https://instagram.com/venomous_rose16" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
  <FaInstagram />
</a>
        </div>
    </div>

    <div className="senior-card">
      <img
        src="/seniors/senior9.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Harshita Sharma</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          

          <a href="https://instagram.com/hrshita.a" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
  <FaInstagram />
</a>
        </div>
    </div>
  
      <div className="senior-card">
      <img
        src="/seniors/senior10.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Reeddhi Kundu</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          

          <a href="https://instagram.com/reeddhiiser" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
  <FaInstagram />
</a>
        </div>
    </div>

      <div className="senior-card">
      <img
        src="/seniors/senior11.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Shreya Singh</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          

          <a href="https://wa.me/916306047764" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
  <FaWhatsapp />
</a>
        </div>
    </div>

  </div>
</ScrollReveal>

      </main>

      <ScrollReveal className="footer" element="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Freshers and Aspirants&apos; Guide</h2>
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
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <span>Made by</span>
            <a
              href="https://vedantpardhi.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="footer-credit-link"
            >
              Vedant Pardhi 
            </a>
            <span className="footer-dot">•</span>

            <a
              href="https://vedantpardhi.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="footer-icon"
              aria-label="LinkedIn"
            >
              <FaGlobe />
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
