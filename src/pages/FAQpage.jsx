import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SharedNav from '../components/SharedNav.jsx'
import { FAQS, FAQ_TAG_COLORS } from '../data/faqsData'
import '../App.css'

export default function FAQPage() {
  const location = useLocation()
  const [openId, setOpenId] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
    window.scrollTo(0, 0)
  }, [])

  const tags = useMemo(() => ['All', ...new Set(FAQS.map((faq) => faq.tag))], [])
  const filteredFaqs = filter === 'All' ? FAQS : FAQS.filter((faq) => faq.tag === filter)

  useEffect(() => {
    if (!location.hash) return

    const targetId = Number(location.hash.replace('#faq-', ''))
    const targetFaq = FAQS.find((faq) => faq.id === targetId)

    if (!targetFaq) return

    setFilter(targetFaq.tag)
    setOpenId(targetFaq.id)

    window.setTimeout(() => {
      document.getElementById(`faq-${targetFaq.id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 80)
  }, [location.hash])

  function toggleFaq(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div className="subpage-shell faq-page">
      <SharedNav />

      <main className="subpage-main">
        <section className="faq-shell way-card">
          <div className="section-heading faq-heading">
            <p className="eyebrow">Answers</p>
            <h1>Frequently asked questions</h1>
            <p>
              The questions seniors get again and again, collected into one place so first-year
              panic does not have to reinvent itself.
            </p>
          </div>

          <div className="faq-filters" role="group" aria-label="Filter FAQs by category">
            {tags.map((tag) => {
              const activeColor = tag === 'All' ? 'var(--amber)' : FAQ_TAG_COLORS[tag]
              return (
                <button
                  key={tag}
                  type="button"
                  className={`faq-filter-btn ${filter === tag ? 'active' : ''}`}
                  onClick={() => setFilter(tag)}
                  style={filter === tag ? { borderColor: activeColor, color: activeColor } : undefined}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          <div className="faq-list">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id
              const tagColor = FAQ_TAG_COLORS[faq.tag]

              return (
                <article
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="faq-q-left">
                      <span
                        className="faq-tag"
                        style={{ color: tagColor, borderColor: `${tagColor}55`, background: `${tagColor}15` }}
                      >
                        {faq.tag}
                      </span>
                      <span className="faq-q-text">{faq.question}</span>
                    </span>
                    <span className="faq-icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div className="faq-answer-wrapper" id={`faq-answer-${faq.id}`}>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="faq-footer">
            <p>Still unsure about something?</p>
            <Link to="/#contact" className="secondary-button btn-secondary">
              Ask the seniors
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
