import { Link } from 'react-router-dom'
import { FaGlobe, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { ScrollReveal } from './ScrollReveal.jsx'

export default function SharedFooter() {
  return (
    <ScrollReveal className="footer" element="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Freshers Guide</h2>
            <p>Built to help first-years find their footing faster.</p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/clubs">Clubs</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/faqs">FAQs</Link>
          </div>

          <div className="footer-column">
            <h3>Community</h3>
            <Link to="/#contact">Contact seniors</Link>
            <Link to="/gallery?loc=hostels">Hostels</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <span>Made by</span>
            <a
              href="https://vedantpardhi.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="footer-credit-link"
            >
              Vedant Pardhi
            </a>
            <span className="footer-dot">•</span>
            <a
              href="https://vedantpardhi.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="footer-icon"
              aria-label="Portfolio"
            >
              <FaGlobe />
            </a>
            <span className="footer-dot">•</span>
            <a
              href="https://linkedin.com/in/vedantpardhi"
              target="_blank"
              rel="noreferrer"
              className="footer-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <span className="footer-dot">•</span>
            <a
              href="https://instagram.com/crustrohl"
              target="_blank"
              rel="noreferrer"
              className="footer-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
