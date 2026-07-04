import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { CLUBS } from '../data/clubsData'
import '../App.css'
import './ClubsPage.css'

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
            Explore our vibrant student communities, find your passion, and connect with like-minded peers.
          </p>
        </div>

        <ul className="clubs-grid" aria-labelledby={headingId}>
          {CLUBS.map((club) => {
            return (
              <li key={club.id}>
                <article 
                  className="club-card"
                  onClick={() => setSelectedClub(club)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedClub(club);
                    }
                  }}
                >
                  <div className="club-logo-wrapper">
                    <img
                      className="club-card-logo"
                      src={club.logo}
                      alt={club.name}
                    />
                  </div>
                  <div className="club-card-content">
                    <h2 className="club-card-name">{club.name}</h2>
                    <div className="club-card-action">
                      <span>Explore</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </main>
      
      <div className={`club-modal-overlay ${selectedClub ? 'active' : ''}`} onClick={() => setSelectedClub(null)}>
        <div 
          className={`club-modal ${selectedClub ? 'active' : ''}`} 
          onClick={(e) => e.stopPropagation()}
        >
          {selectedClub && (
            <>
              <button 
                className="club-modal-close"
                onClick={() => setSelectedClub(null)}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="club-modal-logo-wrapper">
                <img
                  src={selectedClub.logo}
                  alt={selectedClub.name}
                  className="club-modal-logo"
                />
              </div>
              <h2>{selectedClub.name}</h2>
              <p>{selectedClub.info}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
