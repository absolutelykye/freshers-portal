import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { CLUBS } from '../data/clubsData'
import '../App.css'
import   './ClubsPage.css'

export default function ClubsPage() {
  const [selectedClub, setSelectedClub] = useState(null)
  const headingId = useId()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])
useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  return (
    <div className="clubs-page">
      <header className="clubs-page-header">
        <Link className="clubs-page-brand" to="/" aria-label="Freshers Guide home">
          <img src={freshersGuideLogo} alt="" width={120} height={40} />
        </Link>
        <nav className="clubs-page-nav" aria-label="Clubs page navigation">
          <Link to="/">Home</Link>
      
        </nav>
      </header>

      <main className="clubs-page-main">
        <div className="clubs-page-intro">
          <p className="eyebrow">Communities</p>
          <h1 id={headingId}>Student clubs</h1>
          <p className="clubs-page-lead">
        
          </p>
        </div>

        <ul className="clubs-grid" aria-labelledby={headingId}>
          {CLUBS.map((club) => {
            return (
              <li key={club.id}>
                <article className="club-card">
                  <div className="club-card-header">
                    <div className="club-logo-wrapper">
                      <img
                        className="club-card-logo"
                        src={club.logo}
                        alt={club.name}
                      />
                    </div>
                    <div className="club-card-title-block">
                      <h2 className="club-card-name">{club.name}</h2>
                      <button
                        type="button"
                        className="primary-button club-card-toggle"
                        onClick={() => setSelectedClub(club)}
                      >
                        About this club
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </main>
      {selectedClub && (
  <div
    className="club-modal-overlay"
    onClick={() => setSelectedClub(null)}
  >
    <div
      className="club-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="club-modal-logo-wrapper">
        <img
          src={selectedClub.logo}
          alt={selectedClub.name}
          className="club-modal-logo"
        />
      </div>

      <h2>{selectedClub.name}</h2>

      <p>{selectedClub.info}</p>

      <button
        className="primary-button"
        onClick={() => setSelectedClub(null)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  )
}
