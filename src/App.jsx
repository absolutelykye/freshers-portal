import { useEffect, useState } from 'react'
import campusHero from './assets/campus-hero.jpeg'
import freshersGuideLogo from './assets/freshers-guide-logo.png'
import './App.css'

const events = [
  {
    date: 'Week 1',
    title: 'Orientation Day',
    detail: 'Meet faculty, mentors, and classmates before regular classes begin.',
  },
  {
    date: 'Week 2',
    title: 'Club Showcase',
    detail: 'Explore technical, cultural, sports, and volunteering communities.',
  },
  {
    date: 'Week 3',
    title: 'First-Year Help Desk',
    detail: 'Ask seniors about timetables, notes, attendance, and campus basics.',
  },
]

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
]

const iiserLogoUrl =
  'https://iiserbpr.ac.in/webcontrol/uploads/file_upload/Logo_6936_X_22001728276596.png'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleCursorMove = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }

    document.addEventListener('mousemove', handleCursorMove, { passive: true })
    document.addEventListener('pointermove', handleCursorMove, { passive: true })
    document.addEventListener('pointerdown', handleCursorMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleCursorMove)
      document.removeEventListener('pointermove', handleCursorMove)
      document.removeEventListener('pointerdown', handleCursorMove)
    }
  }, [])

  const marqueeWords = [...lingoWords, ...lingoWords]

  return (
    <main>
      <div className="cursor-glow" aria-hidden="true"></div>

      <nav
        className={`navbar ${isScrolled ? 'navbar-scrolled navbar-visible' : 'navbar-hidden'}`}
      >
        <a className="brand" href="#home" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="Freshers Guide logo" />
        </a>
        <div className="nav-links" aria-label="Main navigation">
          <a href="#resources">Resources</a>
          <a href="#contact">Connect</a>
          <a href="#clubs">Clubs</a>
          <a href="#faqs">FAQs</a>
          <a href="#gallery">Gallery</a>
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
          />
          <img
            className="hero-logo hero-logo-guide"
            src={freshersGuideLogo}
            alt="Freshers Guide logo"
          />
        </div>

        <div className="hero-copy">
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
            <a className="secondary-button" href="#explore">Explore</a>
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
          <article className="event-card">
            <span>Step 1</span>
            <h3>Know the essentials</h3>
            <p>
              Save the academic calendar, campus map, student portal, and
              library login before classes get busy.
            </p>
          </article>
          <article className="event-card">
            <span>Step 2</span>
            <h3>Find your people</h3>
            <p>
              Attend orientation, club introductions, and department meetups to
              meet classmates and seniors.
            </p>
          </article>
          <article className="event-card">
            <span>Step 3</span>
            <h3>Ask for help early</h3>
            <p>
              Keep coordinator contacts handy for hostel, timetable, forms, and
              first-week doubts.
            </p>
          </article>
        </div>
      </section>

      <section className="section explore-section" id="explore">
        <div className="section-heading">
          <p className="eyebrow">Coming next</p>
          <h2>Explore</h2>
          <p>
            This section is ready for whatever you decide later: clubs,
            departments, campus places, student stories, or a gallery.
          </p>
        </div>
      </section>

      <section className="section placeholder-section" id="clubs">
        <div className="section-heading">
          <p className="eyebrow">Communities</p>
          <h2>Clubs</h2>
          <p>Club details can go here once you decide what to include.</p>
        </div>
      </section>

      <section className="section placeholder-section" id="faqs">
        <div className="section-heading">
          <p className="eyebrow">Questions</p>
          <h2>FAQs</h2>
          <p>Common fresher questions and answers can be added here.</p>
        </div>
      </section>

      <section className="section placeholder-section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">Campus life</p>
          <h2>Gallery</h2>
          <p>Photos and memories from IISER Berhampur can live here later.</p>
        </div>
      </section>

      <section className="section" id="events">
        <div className="section-heading">
          <p className="eyebrow">What is happening</p>
          <h2>Freshers events</h2>
        </div>
        <div className="event-grid">
          {events.map((event) => (
            <article className="event-card" key={event.title}>
              <span>{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section resource-section" id="resources">
        <div className="section-heading">
          <p className="eyebrow">Keep this handy</p>
          <h2>Student resources</h2>
        </div>
        <ul className="resource-list">
          {resources.map((resource) => (
            <li key={resource}>{resource}</li>
          ))}
        </ul>
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
  )
}

export default App
