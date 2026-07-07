import { useEffect, useRef } from 'react'

/* Soft radial glow that trails the cursor; brightens over interactive elements. */
export default function GlowCursor() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return undefined

    const pos = { x: -400, y: -400 }
    const glowPos = { x: -400, y: -400 }
    let raf = 0

    const onMove = (event) => {
      pos.x = event.clientX
      pos.y = event.clientY
    }

    const animate = () => {
      glowPos.x += (pos.x - glowPos.x) * 0.18
      glowPos.y += (pos.y - glowPos.y) * 0.18
      glow.style.transform = `translate(${glowPos.x}px, ${glowPos.y}px)`
      raf = requestAnimationFrame(animate)
    }

    const onOver = (event) => {
      if (event.target.closest?.('a, button, [role="button"]')) {
        glow.classList.add('cursor-hover')
      } else {
        glow.classList.remove('cursor-hover')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}
