import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import campusHero from '../assets/campus-hero.jpeg'
import freshersGuideLogo from '../assets/freshers-guide-logo.png'
import { FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { ScrollReveal, StaggerGrid, StaggerItem } from '../components/ScrollReveal.jsx'
import '../App.css'
import GlowCursor from './GlowCursor'


const lingoWords = [
  'Amphi',
  'GH',
  'BH-1',
  'Pixophiles',
  'shadjam',
  'academic-block',
  'onestop',
  'hungry-house',
  'lovelace',
  'yavanika',
  'verdad',
]

const iiserLogoUrl =
  'https://iiserbpr.ac.in/webcontrol/uploads/file_upload/Logo_6936_X_22001728276596.png'

const heroEase = [0.22, 1, 0.36, 1]

export default function Home() {
  

const faqs = [
  { id: 1, question: "What medical facilities are available on campus if I fall sick or face a health emergency?", answer: "Your health and well-being are fully supported on campus. The institute features a dedicated Health Centre that operates 24/7, ensuring medical assistance is always available whenever you need it. For immediate or severe situations, there is a fully equipped ambulance ready on the go 24/7 to transport students instantly. Furthermore, the campus emergency ward features state-of-the-art medical equipment to handle urgent healthcare needs efficiently.", tag: "Health" },
  { id: 2, question: "Is there an Outpatient Department (OPD), and how much do consultations or medicines cost?", answer: "Yes, the campus has a functional OPD that runs 24/7 to accommodate student schedules. The best part is that both doctor consultations and prescribed medications at the Health Centre are completely free of cost for students, ensuring you can get proper medical attention without any financial worry.", tag: "Health" },
  { id: 3, question: "How safe is the campus, and what is the security setup like?", answer: "The campus is exceptionally safe and secure. It is actively monitored 24/7 by a dedicated team of over 100 security personnel stationed across every corner of the property. Whether it is the middle of the day or late at night, the security team ensures a well-protected environment for all residents.", tag: "Security" },
  { id: 4, question: "Does having a large security presence feel restrictive or intrusive?", answer: "Not at all. The security model is designed to protect, not to restrict. The personnel are trained to maintain a secure environment while ensuring they never intrude on your personal privacy. Furthermore, the guards are highly supportive and approachable; if you ever find yourself needing assistance with directions, late-night safety, or any unexpected issue on campus, they are always ready to help.", tag: "Security" },
  { id: 5, question: "Are there any specific rules regarding late-night gatherings around the campus or hostels?", answer: "To maintain a peaceful academic atmosphere and ensure everyone gets adequate rest, public gatherings outside the hostels are not allowed after 2:00 AM. This policy applies equally to both the boys' and girls' hostels. It helps keep the campus secure and quiet during the late hours, ensuring that students who are resting or studying are not disturbed.", tag: "Security" },
  { id: 6, question: "What is the deadline for leaving or entering the campus in the evening?", answer: "For safety and security reasons, students are not permitted to leave the campus after 8:00 PM. The campus gates are monitored to ensure a secure environment overnight. If a situation arises where you absolutely must leave past this time, you just need to inform the hostel warden in advance to secure the necessary permissions.", tag: "Security" },
  { id: 7, question: " What's so special about the campus location of IISER Berhampur?", answer: "wo words: the beach. IISER Berhampur holds one of the most spectacular locations across all IISERs. Imagine wrapping up an intense lab session or a challenging exam and heading straight to the coast to unwind. The proximity to the beach gives you an unparalleled campus lifestyle where spontaneous weekend getaways, pristine sunsets, and incredible seaside fun with friends are not uncommon. It is a completely unique perk that transforms the student experience into something outstanding, offering the perfect scenic backdrop to balance your academic journey.", tag: "Campus Life" },
  { id: 8, question: "How does online delivery and shopping work on the campus?", answer: "You will find that your essential shopping needs are mostly taken care of. Amazon and Flipkart operate seamlessly here, delivering everything from textbooks to personal electronics right to the hostel entrance without a hitch. While instant 10-minute grocery or food apps like Zomato, Swiggy, and Blinkit do not serve our specific coastal ecosystem yet, it is a surprisingly manageable chore nevertheless. This shift away from commercial food delivery is compensated by fantastic community culture where students bond over night canteens, hostel mess meals, the bakery called One Stop and our beloved restaurant, the Hungry House.", tag: "Campus Life" },
  { id: 9, question: "Is the campus connected to the main city, and how do students travel back and forth?", answer: "The campus is located roughly 20-22 kilometres away from the main city, positioned perfectly to offer a serene, distraction-free environment ideal for deep learning and research. Connectivity is straightforward and budget-friendly thanks to reliable institute vehicles and government buses that run back and forth on fixed, convenient schedules. These scheduled rides take care of travelling into the city for shopping or entertainment. A quick pro-tip for your journey: while local auto-rickshaws are always available for urgent trips, they generally charge around 400 to 600 rupees for a one-way ride, so smart students usually prefer the scheduled buses or pool an auto with a group of friends to share the cost.", tag: "Campus Life" },
  { id: 10, question: "Is the academic pressure at an IISER so intense that it leaves no time for personal life?", answer: "Not at all. While the curriculum is rigorous, it is designed to be manageable. Once your scheduled classes and labs wrap up, and you're back to your hostels, usually around 6 PM, your time is largely your own. Students actively balance their studies with a variety of personal interests, whether that means hitting the gym, playing competitive sports, jamming with a band, or simply hanging out with friends. Success here is about effective time management, not sacrificing your social life.", tag: "Campus Life" },
  { id: 11, question: "What can I expect regarding the living arrangements and hostel life?", answer: "IISER BPR provides excellent residential facilities. Compared to many government institutions and even other IISERs, the hostels are well-maintained, safe, and comfortable. They are designed to foster a sense of community, serving as a hub where you can easily connect with fellow students, find support from seniors, and integrate into the campus culture. Also, IISER BPR is among the rare institutions that provide a single occupancy room from the 2nd year onwards.", tag: "Campus Life" },
  { id: 12, question: "Will I feel isolated as a first-year student?", answer: "Quite the opposite. The environment is built to be supportive, with professors and seniors who are generally approachable and willing to offer guidance. Whether you need help navigating a difficult assignment or advice on which research area to explore, you will find that the community is collaborative rather than competitive. You will find that you have plenty of resources to help you adjust to your new life quickly.", tag: "Campus Life" },
  { id: 13, question: "How much freedom will I actually have in managing my daily schedule?", answer: "Attendance policies (75% mandatory attendance policy) can vary by course and instructor, but in the first year, there is often a reasonable degree of flexibility. The expectation is that you manage your time responsibly to keep up with your academic commitments. Lectures and labs are conducted from 9.30 to 12.30, and then 2.30 to 5.30 with a two-hour lunch break in between.", tag: "Academics" },
  { id: 14, question: "How does the curriculum transition from the broad subjects in the first year to my final specialization?", answer: "The BS-MS program is structured to guide you smoothly from a foundational general scientist to a specialized researcher over five years: 1) First Year (Semesters 1 & 2): You will build a broad foundation by taking five compulsory core subjects—Physics, Chemistry, Mathematics, Biology, and Earth Science—alongside mandatory laboratory courses and an additional course (like Communication, Physical Education, or Computer Science). 2)⁠Second Year (Semesters 3 & 4): You begin to narrow your focus by choosing 3 subjects as your pre-majors. You will also take additional courses (Computer Science and Economics) along with compulsory lab modules. 3) Third & Fourth Years (Semesters 5 to 8): You officially select and enter the Major of your choice, focusing heavily on your specialization alongside advanced labs and required foundational courses. You are free to choose another subject as Minor too or Audit your Major by taking Elective courses if you think they'll facilitate you in your research interest (given you can handle them along the compulsory syllabus).", tag: "Academics" },
  { id: 15, question: "What is the focus of the final year, and how does the program conclude?", answer: "The entire fifth year (Semesters 9 & 10) is dedicated to preparing your Master’s thesis. This year-long research project allows you to dive deep into an original scientific problem under the mentorship of a faculty member, combining all the theoretical knowledge and laboratory skills you accumulated over the previous four years. Successfully completing and defending this thesis marks the culmination of your graduation, earning you your BS-MS dual degree.", tag: "Academics" },

  
  { id: 16, question: "I have already mastered most of the concepts from 11th and 12th grade. Will the first year be a redundant experience for me?", answer: "It is a common misconception that the first year is just a repeat. While the topics might look similar to what you covered in school, the way they are taught shifts significantly toward a university level of rigor. You will explore these familiar areas with much more depth, uncovering the mathematical proofs and theoretical foundations that were often skipped over during your school and entrance exam preparation. Think of it less as going over old material and more as building a strong, logical foundation that you will need for actual research later on.", tag: "Academics" },
  { id: 17, question: "I have a clear preference for a specific stream. Why am I forced to study disciplines I find unappealing, such as Chemistry or Earth and Environmental Sciences?", answer: "The mandatory interdisciplinary structure is there for a reason. Modern research is becoming more holistic. By exposing you to subjects outside your immediate interest, the curriculum pushes you to be more flexible and ensures that when you eventually specialize, you have a much broader scientific perspective. Learning to engage with these subjects is an important part of becoming a well-rounded scientist.", tag: "Academics" },
  { id: 18, question: "Are all IISERs identical in their academic offerings?", answer: "While the core mission of a research-oriented, interdisciplinary BS-MS degree remains the same across all campuses, each one is starting to develop its own unique focus. Most IISERs prioritize pure sciences like Mathematics, Physics, Chemistry, and Biology, but we are seeing more variety now. Programs like Data Science, Statistics, and Economics, or the newly launched BTech programs, show that these institutions are adapting to bridge the gap between pure research and modern, interdisciplinary fields. Always check the current brochure for the specific campus you are interested in.", tag: "Academics" },
  { id: 19, question: "Does the 'foundational year' imply that actual research starts only in later years?", answer: "Not necessarily. While the formal classes are designed to build your toolkit during the beginning, the culture of research is everywhere from day one. The environment is meant to encourage a curious mindset right from the start. You will often find opportunities to talk with professors, join research groups, or attend seminars, colloquiums and talks as soon as you show you are ready to take them on. These first years are simply the time you take to learn the language and technical skills needed to eventually contribute to meaningful research.", tag: "Academics" },
  { id: 20, question: "Is an IISER degree only useful if I want to pursue a PhD and enter academia?", answer: "While IISERs are widely considered the premier stepping stone for a PhD in India or abroad, that is not your only option. The rigorous training you receive builds strong analytical, problem-solving, and data skills. Graduates have successfully transitioned into corporate careers in finance, enrolled in MBA programs, entered the private sector, taken up government roles (including joining the defense forces like the Navy and Air Force), or even launched their own startups.", tag: "Careers" },
  { id: 21, question: "Can I expect a guaranteed campus placement right after my BS-MS graduation?", answer: "No, you should not join an IISER with the expectation of a guaranteed corporate placement like you might see at traditional engineering colleges. Direct campus placements right after graduation are less common because the institutional framework is built to foster research. If your primary and immediate goal after five years is a corporate job through a campus placement cell, an IISER might not be the right fit for you.", tag: "Careers" },
  { id: 22, question: "If campus placements are limited, how do students transition into non-research jobs?", answer: "Because direct placements are not the primary focus, students looking for non-academic routes take a more proactive approach. They leverage the deep analytical, computational, and statistical skills gained during their degree to apply for off-campus roles, secure corporate internships, or prepare for competitive examinations like the civil services. The degree carries significant prestige, but the onus of securing corporate roles often relies on your individual effort and networking.", tag: "Careers" },
  { id: 23, question: "How well does an IISER degree prepare me for international opportunities?", answer: "How well does an IISER degree prepare me for international opportunities?", tag: "Careers" },
  
];

const tagColors = {
  Health: "#2563eb",
  Security: "#7c3aed",
  "Campus Life": "#059669",
  Academics: "#db2777",
  Careers: "#d97706",
};

const [openId, setOpenId] = useState(null);
const [filter, setFilter] = useState("All");

const tags = ["All", ...new Set(faqs.map((f) => f.tag))];
const filtered = filter === "All" ? faqs : faqs.filter((f) => f.tag === filter);
const toggle = (id) => setOpenId(openId === id ? null : id);

  const [isScrolled, setIsScrolled] = useState(false)
  const reduceMotion = useReducedMotion()
  const lastOpacityRef = useRef(-1)
  const lastScrolledRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    let raf = 0

    const run = () => {
      raf = 0
      const scrollY = window.scrollY
      const fadeDistance = Math.max(window.innerHeight * 0.75, 1)
      const heroOpacity = Math.max(0, 1 - scrollY / fadeDistance)

      if (Math.abs(heroOpacity - lastOpacityRef.current) > 0.008) {
        lastOpacityRef.current = heroOpacity
        document.documentElement.style.setProperty('--hero-bg-opacity', String(heroOpacity))
      }

      const scrolled = scrollY > 12
      if (lastScrolledRef.current !== scrolled) {
        lastScrolledRef.current = scrolled
        setIsScrolled(scrolled)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const marqueeWords = [...lingoWords, ...lingoWords]

  return (
    <>
      <main>
        <GlowCursor/>
        <nav
          className={`navbar ${isScrolled ? 'navbar-scrolled navbar-visible' : 'navbar-hidden'}`}
        >
          <a className="brand" href="#home" aria-label="Freshers Guide home">
            <img src={freshersGuideLogo} alt="Freshers Guide logo" decoding="async" />
          </a>
          <div className="nav-links" aria-label="Main navigation">
            <a href="#contact">Connect</a>
            <Link to="/clubs">Clubs</Link>
            <a href="#faqs">FAQs</a>
            <Link to="/gallery">Gallery</Link>
          </div>
        </nav>

        <section
          className="hero-section"
          id="home"
          style={{ '--hero-image': `url(${campusHero})` }}
        >
          <div
            className={`hero-logos ${isScrolled ? 'hero-logos-hidden' : 'hero-logos-visible'}`}
            aria-label="IISER Berhampur and Freshers Guide logos"
          >
            <img
              className="hero-logo hero-logo-iiser"
              src={iiserLogoUrl}
              alt="IISER Berhampur logo"
              decoding="async"
              fetchPriority="high"
            />
            <img
              className="hero-logo hero-logo-guide"
              src={freshersGuideLogo}
              alt="Freshers Guide logo"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <motion.div
            className="hero-copy hero-glass"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.62,
              ease: heroEase,
              delay: reduceMotion ? 0 : 0.06,
            }}
          >
            <p className="eyebrow">For first-year students</p>
            <h1>
              <span className="hero-title-line">
                Welcome to <span className="hero-title-iiser">IISER</span>
              </span>
              <span className="hero-title-berhampur">Berhampur</span>
            </h1>
            <p className="hero-text">
              A simple guide for freshers to find events, useful resources,
              campus contacts, and everything they usually ask seniors in the
              first few weeks.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#start-here">
                Start here
              </a>
            </div>
          </motion.div>
        </section>

        <ScrollReveal className="lingo-strip" aria-label="Campus lingo">
          <div className="lingo-track">
            {marqueeWords.map((word, index) => (
              <span className="lingo-word" key={`${word}-${index}`}>
                {word}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="section start-section" id="start-here">
          <div className="section-heading">
            <p className="eyebrow">Begin here</p>
            <h2>Freshers starter kit</h2>
          </div>
          <StaggerGrid className="starter-grid">
            <StaggerItem className="starter-grid-cell">
              <Link className="event-card starter-card-link" to="/clubs">
                <span> </span>
                <h3>College life and Clubs</h3>
                <p>
                  Take a look at all of the clubs that student body offers to make your college life
                  more enjoyable.
                </p>
              </Link>
            </StaggerItem>
            <StaggerItem className="starter-grid-cell">
              <a className="event-card starter-card-link" href="#contact">
                <span></span>
                <h3>Find your seniors</h3>
                <p>
                  Attend orientation, club introductions, and department meetups to meet classmates
                  and seniors.
                </p>
              </a>
            </StaggerItem>
            <StaggerItem className="starter-grid-cell">
              <Link className="event-card starter-card-link" to="/gallery">
                <span></span>
                <h3>Gallery</h3>
                <p>
                  Find hostels, lecture halls, canteens, labs, and other important campus locations
                  to navigate your first weeks with ease.
                </p>
              </Link>
            </StaggerItem>

            <StaggerItem className="starter-grid-cell">
              <a className="event-card starter-card-link" href="#faqs">
                <span></span>
                <h3>FAQs</h3>
                <p>
                  Frequently asked questions.
                </p>
              </a>
            </StaggerItem>

          </StaggerGrid>
        </ScrollReveal>

        <ScrollReveal
          className="section placeholder-section gallery-preview-section"
          id="clubs"
        >
          <div className="section-heading gallery-preview-heading">
            <p className="eyebrow">Communities</p>
            <h2>Clubs</h2>
            <p>
              Browse short profiles of campus clubs—music, tech, theatre, sports, outreach, and
              more.
            </p>
            <Link className="primary-button gallery-view-button" to="/clubs">
              Browse all clubs
            </Link>
          </div>
        </ScrollReveal>

<ScrollReveal className="section placeholder-section" id="faqs">
  <div className="faq-bg-accent" aria-hidden="true" />

  <div className="faq-inner">
    <div className="section-heading">
      <p className="eyebrow">Got questions?</p>
      <h2>Frequently Asked <em style={{ fontStyle: "normal", background: "linear-gradient(135deg, #2563eb, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</em></h2>
      <p>Everything you need to know before diving in.</p>
    </div>

    <div className="faq-filters" role="group" aria-label="Filter FAQs by category">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`faq-filter-btn ${filter === tag ? "active" : ""}`}
          onClick={() => setFilter(tag)}
          style={filter === tag && tag !== "All" ? { borderColor: tagColors[tag], color: tagColors[tag] } : {}}
        >
          {tag}
        </button>
      ))}
    </div>

    <div className="faq-list">
      {filtered.map((faq, i) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className={`faq-item ${isOpen ? "open" : ""}`} style={{ "--i": i }}>
            <button className="faq-question" onClick={() => toggle(faq.id)} aria-expanded={isOpen}>
              <span className="faq-q-left">
                <span className="faq-tag" style={{ background: tagColors[faq.tag] + "22", color: tagColors[faq.tag] }}>
                  {faq.tag}
                </span>
                <span className="faq-q-text">{faq.question}</span>
              </span>
              <span className="faq-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 7L9 12L14 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div className="faq-answer-wrapper">
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="faq-footer">
      <p>Still have questions?</p>
      <a href="#contact" className="primary-button faq-cta">
        Ask the seniors!
      </a>
    </div>
  </div>
</ScrollReveal>



        <ScrollReveal className="section placeholder-section gallery-preview-section" id="gallery">
          <div className="section-heading gallery-preview-heading">
            <p className="eyebrow">Campus life</p>
            <h2>Gallery</h2>
            <p>
              Explore photos of campus spots: hostels, labs, sports complex, the beach nearby, and
              more.
            </p>
            <Link className="primary-button gallery-view-button" to="/gallery">
              View full gallery
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal className="contact-section" id="contact">
  <div className="contact-header">
    <p className="eyebrow">NEED HELP?</p>

    <h2>Contact seniors</h2>

    <p className="contact-subtext">
      Reach out to seniors for help regarding academics,
      hostels, clubs, events, and campus life.
    </p>
  </div>

  <div className="senior-grid">

    <div className="senior-card">
      <img
        src="/seniors/senior1.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Akshat Sharma</h3>

      <p className="senior-role">
        2nd Year
      </p>

        <button
                className="primary-button view-contact-btn"
                onClick={(e) => {
                  e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
                }}
              >
                View Contact
              </button>

              <div className="contact-overlay">
                <button
                  className="contact-overlay-close"
                  onClick={(e) => {
                    e.currentTarget.closest('.senior-card').classList.remove('show-contact');
                  }}
                >
                  ✕
                </button>
                      <a href="https://instagram.com/akshat.sharma_only" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
              <FaInstagram />
            </a>
                      <a href="https://wa.me/919335885779" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
              <FaWhatsapp />
            </a>
              </div>
    </div>

    <div className="senior-card">
      <img
        src="/seniors/senior2.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Gaurav Powar</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
              className="primary-button view-contact-btn"
              onClick={(e) => {
                e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
              }}
            >
              View Contact
            </button>

            <div className="contact-overlay">
              <button
                className="contact-overlay-close"
                onClick={(e) => {
                  e.currentTarget.closest('.senior-card').classList.remove('show-contact');
                }}
              >
                ✕
              </button>
                    <a href="https://instagram.com/thats.gaurav" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
            <FaInstagram />
          </a>
                    <a href="https://wa.me/918767480700" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
            <FaWhatsapp />
          </a>
            </div>
    </div>

    <div className="senior-card">
      <img
        src="/seniors/senior3.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>F Shiefer Melbert</h3>

      <p className="senior-role">
        2nd Year
      </p>

          <button
        className="primary-button view-contact-btn"
        onClick={(e) => {
          e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
        }}
      >
        View Contact
      </button>

      <div className="contact-overlay">
        <button
          className="contact-overlay-close"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.remove('show-contact');
          }}
        >
          ✕
        </button>
              <a href="https://instagram.com/impassivegreen" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
      <FaInstagram />
    </a>
              <a href="https://wa.me/919310737354" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
      <FaWhatsapp />
    </a>
      </div>
    </div>
        <div className="senior-card">
      <img
        src="/seniors/senior4.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Annany Pratap Singh</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
    className="primary-button view-contact-btn"
    onClick={(e) => {
      e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
    }}
  >
    View Contact
  </button>

  <div className="contact-overlay">
    <button
      className="contact-overlay-close"
      onClick={(e) => {
        e.currentTarget.closest('.senior-card').classList.remove('show-contact');
      }}
    >
      ✕
    </button>
          <a href="https://instagram.com/annany_pratap_singh" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
  <FaInstagram />
</a>
          <a href="https://wa.me/917454072488" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
  <FaWhatsapp />
</a>
  </div>

    </div>    <div className="senior-card">
      <img
        src="/seniors/senior5.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Vedant Pardhi</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          <a href="https://instagram.com/crustrohl" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
  <FaInstagram />
</a>
          <a href="https://t.me/vedntp" target="_blank" rel="noopener noreferrer" className='contact-icon telegram'>
  <FaTelegram />
</a>
        </div>
    </div>  <div className="senior-card">
      <img
        src="/seniors/senior6.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Vedant Bhajipale</h3>

      <p className="senior-role">
        2nd Year
      </p>

        <button
    className="primary-button view-contact-btn"
    onClick={(e) => {
      e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
    }}
  >
    View Contact
  </button>

  <div className="contact-overlay">
    <button
      className="contact-overlay-close"
      onClick={(e) => {
        e.currentTarget.closest('.senior-card').classList.remove('show-contact');
      }}
    >
      ✕
    </button>
    <a href="https://instagram.com/vedantabhajipale6" target="_blank" rel="noopener noreferrer" className='contact-icon insta'>
      <FaInstagram />
    </a>
              <a href="https://wa.me/8623041968" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
      <FaWhatsapp />
    </a>
  </div>
    
    </div> 
    <div className="senior-card">
      <img
        src="/seniors/senior7.webp"
        alt="Senior"
        className="senior-image"
      />

      <h3>Satya</h3>

      <p className="senior-role">
        2nd Year
      </p>

      <button
          className="primary-button view-contact-btn"
          onClick={(e) => {
            e.currentTarget.closest('.senior-card').classList.toggle('show-contact');
          }}
        >
          View Contact
        </button>

        <div className="contact-overlay">
          <button
            className="contact-overlay-close"
            onClick={(e) => {
              e.currentTarget.closest('.senior-card').classList.remove('show-contact');
            }}
          >
            ✕
          </button>
          
          <a href="https://wa.me/917904997406" target="_blank" rel="noopener noreferrer" className='contact-icon whatsapp'>
  <FaWhatsapp />
</a>
        </div>
    </div>

  </div>
</ScrollReveal>

      </main>

      <ScrollReveal className="footer" element="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Freshers&apos; Guide</h2>
            <p>A 2025 batch driven platform.</p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/clubs">Clubs</Link>
            <Link to="/gallery">Gallery</Link>
            <a href="#start-here">Guides</a>
          </div>

          <div className="footer-column">
            <h3>Community</h3>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <span>Made by</span>
            <a
              href="https://linkedin.com/in/vedantpardhi"
              target="_blank"
              rel="noreferrer"
              className="footer-credit-link"
            >
              Vedant
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
      </ScrollReveal>
    </>
  )
}
