import { useRef, useState } from 'react'

const CAPTIONS = [
  'poke the atom',
  'again!',
  'building charge…',
  'excited state ⚡',
  'certified fidget device',
]

/* A pokeable atom. Does nothing useful. That is the point. */
export default function FidgetAtom() {
  const [clicks, setClicks] = useState(0)
  const [excited, setExcited] = useState(false)
  const timeoutRef = useRef(null)

  function poke() {
    setClicks((count) => count + 1)
    setExcited(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setExcited(false), 850)
  }

  const caption = CAPTIONS[Math.min(Math.floor(clicks / 5), CAPTIONS.length - 1)]

  return (
    <div className="fidget-atom-wrap">
      <button
        type="button"
        className={`fidget-atom ${excited ? 'excited' : ''}`}
        onClick={poke}
        style={{ '--atom-hue': `${(clicks * 24) % 360}deg` }}
        aria-label="Fidget atom — poke it"
      >
        <span className="atom-orbit atom-orbit-1">
          <span className="atom-electron" />
        </span>
        <span className="atom-orbit atom-orbit-2">
          <span className="atom-electron" />
        </span>
        <span className="atom-orbit atom-orbit-3">
          <span className="atom-electron" />
        </span>
        <span className="atom-nucleus" />
        <span className="atom-ring" key={clicks} />
      </button>
      <p className="fidget-atom-caption">
        {caption}
        {clicks > 0 ? ` · ${clicks}` : ''}
      </p>
    </div>
  )
}
