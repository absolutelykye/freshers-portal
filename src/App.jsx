import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'
import Home from './pages/Home.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import ClubsPage from './pages/ClubsPage.jsx'
import FAQPage from './pages/FAQpage'
import GlowCursor from './components/GlowCursor.jsx'
import './App.css'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setVisible(window.scrollY > 640)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  )
}

export default function App() {
  const [finePointer] = useState(() => window.matchMedia('(pointer: fine)').matches)

  /* Cursor spotlight on cards: writes --mx/--my used by .way-card::after */
  useEffect(() => {
    const onPointerMove = (event) => {
      const card = event.target.closest?.('.way-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
      card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => document.removeEventListener('pointermove', onPointerMove)
  }, [])

  /* Click ripple on buttons */
  useEffect(() => {
    const onPointerDown = (event) => {
      const button = event.target.closest?.('.primary-button, .secondary-button')
      if (!button) return
      const rect = button.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'ui-ripple'
      ripple.style.setProperty('--rx', `${event.clientX - rect.left}px`)
      ripple.style.setProperty('--ry', `${event.clientY - rect.top}px`)
      button.appendChild(ripple)
      window.setTimeout(() => ripple.remove(), 600)
    }

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <>
      {finePointer ? <GlowCursor /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/faqs" element={<FAQPage />} />
      </Routes>
      <BackToTop />
    </>
  )
}
