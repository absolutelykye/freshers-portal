import { useEffect, useId, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SharedNav from '../components/SharedNav.jsx'
import SharedFooter from '../components/SharedFooter.jsx'
import { CLUBS } from '../data/clubsData'
import '../App.css'
import './ClubsPage.css'

export default function ClubsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedClubId = searchParams.get('club')
  const headingId = useId()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
    window.scrollTo(0, 0)
  }, [])

  const selectedClub = useMemo(
    () => CLUBS.find((club) => club.id === selectedClubId) ?? null,
    [selectedClubId],
  )

  useEffect(() => {
    if (!selectedClub) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSearchParams({})
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedClub, setSearchParams])

  function openClub(club) {
    setSearchParams({ club: club.id })
  }

  function closeClub() {
    setSearchParams({})
  }

  return (
    <div className="subpage-shell clubs-page">
      <SharedNav />

      <main className="subpage-main">
        <div className="section-heading clubs-page-intro">
          <p className="eyebrow">Communities</p>
          <h1 id={headingId}>Student clubs</h1>
          <p className="clubs-page-lead">
            Most people find their campus rhythm through one club, then three more by accident.
            Start with the communities that already feel like your people.
          </p>
        </div>

        <ul className="clubs-grid" aria-labelledby={headingId}>
          {CLUBS.map((club) => (
            <li key={club.id}>
              <article
                className="club-card way-card"
                onClick={() => openClub(club)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openClub(club)
                  }
                }}
                aria-label={`Open details for ${club.name}`}
              >
                <span className="card-code">Club</span>
                <div className="club-logo-wrapper">
                  <img className="club-card-logo" src={club.logo} alt="" />
                </div>
                <div className="club-card-content">
                  <h2 className="club-card-name">{club.name}</h2>
                  <p className="club-card-copy">{club.info.slice(0, 120)}...</p>
                  <div className="club-card-action">
                    <span>Open guide</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>

      <SharedFooter />

      <div
        className={`club-modal-overlay ${selectedClub ? 'active' : ''}`}
        onClick={closeClub}
        aria-hidden={selectedClub ? 'false' : 'true'}
      >
        <div
          className={`club-modal ${selectedClub ? 'active' : ''}`}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={selectedClub ? `club-title-${selectedClub.id}` : undefined}
        >
          {selectedClub ? (
            <>
              <button
                type="button"
                className="club-modal-close ghost-icon-button"
                onClick={closeClub}
                aria-label="Close club details"
              >
                ×
              </button>
              <span className="card-code">Student club</span>
              <div className="club-modal-logo-wrapper">
                <img src={selectedClub.logo} alt="" className="club-modal-logo" />
              </div>
              <h2 id={`club-title-${selectedClub.id}`}>{selectedClub.name}</h2>
              <p>{selectedClub.info}</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
