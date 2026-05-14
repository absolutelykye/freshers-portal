import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import campusHero from '../assets/campus-hero.jpeg'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import '../App.css'
import { FaInstagram, FaLinkedin } from "react-icons/fa"


const resources = [
  'Department notes and previous papers',
  'Timetable and exam schedule',
  'Hostel, transport, and canteen info',
  'Scholarships and important forms',
]

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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeDistance = window.innerHeight * 0.75
      const heroOpacity = Math.max(0, 1 - scrollY / fadeDistance)

      document.documentElement.style.setProperty(
        '--hero-bg-opacity',
        heroOpacity.toString(),
      )
      setIsScrolled(scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const marqueeWords = [...lingoWords, ...lingoWords]

  return (
    <>
    <main>
      <nav
        className={`navbar ${isScrolled ? 'navbar-scrolled navbar-visible' : 'navbar-hidden'}`}
      >
        <a className="brand" href="#home" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="Freshers Guide logo" />
        </a>
        <div className="nav-links" aria-label="Main navigation">
          
          <a href="#contact">Connect</a>
          <a href="#clubs">Clubs</a>
          <a href="#faqs">FAQs</a>
          <a href="#gallery">Gallery</a>
          
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
          />
          <img
            className="hero-logo hero-logo-guide"
            src={freshersGuideLogo}
            alt="Freshers Guide logo"
          />
        </div>

        <div className="hero-copy hero-glass">
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
            <a className="primary-button" href="#start-here">Start here</a>
          </div>
        </div>
      </section>

      <section className="lingo-strip" aria-label="Campus lingo">
        <div className="lingo-track">
          {marqueeWords.map((word, index) => (
            <span className="lingo-word" key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </div>
      </section>

      <section className="section start-section" id="start-here">
        <div className="section-heading">
          <p className="eyebrow">Begin here</p>
          <h2>Freshers starter kit</h2>
        </div>
        <div className="starter-grid">
          <Link className="event-card starter-card-link" to="/clubs">
            <span> </span>
            <h3>College life and Clubs</h3>
            <p>
              Take a look at all of the clubs that student body offers to make your college life more enjoyable.
            </p>
          </Link>
          <a className="event-card starter-card-link" href="#contact">
            <span></span>
            <h3>Find your seniors</h3>
            <p>
              Attend orientation, club introductions, and department meetups to
              meet classmates and seniors.
            </p>
          </a>
          <Link className="event-card starter-card-link" to="/gallery">
            <span></span>
            <h3>Gallery</h3>
            <p>
              Find hostels, lecture halls, canteens, labs, and other important campus locations to navigate your first weeks with ease.
            </p>
          </Link>
        </div>
      </section>

      <section className="section placeholder-section gallery-preview-section" id="clubs">
        <div className="section-heading gallery-preview-heading">
          <p className="eyebrow">Communities</p>
          <h2>Clubs</h2>
          <p>
            Browse short profiles of campus clubs—music, tech, theatre, sports, outreach, and more.
          </p>
          <Link className="primary-button gallery-view-button" to="/clubs">
            Browse all clubs
          </Link>
        </div>
      </section>

      <section className="section placeholder-section" id="faqs">
        <div className="section-heading">
          <p className="eyebrow">Questions</p>
          <h2>FAQs</h2>
          <p>Common fresher questions and answers can be added here.</p>
        </div>
      </section>

      <section className="section placeholder-section gallery-preview-section" id="gallery">
        <div className="section-heading gallery-preview-heading">
          <p className="eyebrow">Campus life</p>
          <h2>Gallery</h2>
          <p>
            Explore photos of campus spots: hostels, labs, sports complex, the beach nearby, and more.
          </p>
          <Link className="primary-button gallery-view-button" to="/gallery">
            View full gallery
          </Link>
        </div>
      </section>


      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Need help?</p>
          <h2>Contact the student team</h2>
          <p>
            Replace these details with your real coordinator names, phone
            numbers, email, Instagram, WhatsApp group, or Discord link.
          </p>
        </div>
        <a className="primary-button" href="mailto:freshers@example.com">
          freshers@example.com
        </a>
      </section>
    </main>
    <footer className="footer">
  <div className="footer-grid">

    <div className="footer-brand">
      <h2>Sangyan</h2>

      <p>
        A 2025 batch driven platform.
      </p>
    </div>

    <div className="footer-column">
      <h3>Explore</h3>

      <a href="#clubs">Clubs</a>
      <a href="/gallery">Gallery</a>
      <a href="#resources">Resources</a>
    </div>

    <div className="footer-column">
      <h3>Community</h3>

      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      
    </div>

  </div>

<div className="footer-bottom">
  <div className="footer-credit">

    <span>Made by</span>

    <a
      
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
    >
      <FaLinkedin />
    </a>

    <span className="footer-dot">•</span>

    <a
      href="https://instagram.com/crustrohl"
      target="_blank"
      rel="noreferrer"
      className="footer-icon"
    >
      <FaInstagram />
    </a>

  </div>
</div>

</footer>

</>
  )
  
}

