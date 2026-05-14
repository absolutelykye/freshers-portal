import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { CLUBS } from '../data/clubsData'
import '../App.css'
import './ClubsPage.css'

export default function ClubsPage() {
  const [expandedId, setExpandedId] = useState(null)
  const headingId = useId()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  function toggleClub(id) {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <div className="clubs-page">
      <header className="clubs-page-header">
        <Link className="clubs-page-brand" to="/" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="" width={120} height={40} />
        </Link>
        <nav className="clubs-page-nav" aria-label="Clubs page navigation">
          <Link to="/">Home</Link>
          <Link to="/#clubs">On this site</Link>
        </nav>
      </header>

      <main className="clubs-page-main">
        <div className="clubs-page-intro">
          <p className="eyebrow">Communities</p>
          <h1 id={headingId}>Student clubs</h1>
          <p className="clubs-page-lead">
            Placeholder summaries for ten campus groups. Tap a club’s button to read a short blurb;
            replace names, logos, and text in <code className="clubs-page-code">src/data/clubsData.js</code>{' '}
            when you have the real details.
          </p>
        </div>

        <ul className="clubs-grid" aria-labelledby={headingId}>
          {CLUBS.map((club) => {
            const isOpen = expandedId === club.id
            const panelId = `club-panel-${club.id}`
            return (
              <li key={club.id}>
                <article className="club-card">
                  <div className="club-card-header">
                    <img
                      className="club-card-logo"
                      src={club.logo}
                      alt=""
                      width={128}
                      height={128}
                      loading="lazy"
                    />
                    <div className="club-card-title-block">
                      <h2 className="club-card-name">{club.name}</h2>
                      <button
                        type="button"
                        className="primary-button club-card-toggle"
                        onClick={() => toggleClub(club.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        {isOpen ? 'Hide details' : 'About this club'}
                      </button>
                    </div>
                  </div>
                  {isOpen ? (
                    <div className="club-card-panel" id={panelId} role="region">
                      <p className="club-card-info">{club.info}</p>
                    </div>
                  ) : null}
                </article>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
