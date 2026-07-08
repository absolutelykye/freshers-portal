import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'
import Home from './pages/Home.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import ClubsPage from './pages/ClubsPage.jsx'
import FAQPage from './pages/FAQpage'
import GlowCursor from './components/GlowCursor.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'
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

  /* Confetti-ish sparkle burst on every click */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const COLORS = ['#45e3ff', '#8f7bff', '#ffb454', '#ff7ac2', '#4ade80']

    const onClick = (event) => {
      if (event.target.closest?.('input, textarea, select')) return
      if (document.querySelectorAll('.click-burst').length > 4) return

      const burst = document.createElement('span')
      burst.className = 'click-burst'
      burst.style.left = `${event.clientX}px`
      burst.style.top = `${event.clientY}px`

      for (let i = 0; i < 7; i++) {
        const spark = document.createElement('i')
        const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.7
        const distance = 24 + Math.random() * 26
        spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`)
        spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`)
        spark.style.background = COLORS[(Math.random() * COLORS.length) | 0]
        burst.appendChild(spark)
      }

      document.body.appendChild(burst)
      window.setTimeout(() => burst.remove(), 700)
    }

    document.addEventListener('click', onClick, { passive: true })
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <BackgroundFX />
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
