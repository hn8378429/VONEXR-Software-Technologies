import ChatDemo from "./ChatDemo";
import ContactForm from "./ContactForm";
import Effects from "./Effects";
import Header from "./Header";

// ====== Apni details yahan badlo ======
const WHATSAPP = "03453932221"; // country code ke saath, + ke baghair
const EMAIL = "hn8378429@gmail.com";
const LINKEDIN = "https://www.linkedin.com/company/vonexr-software-technologies";
// ======================================

const wa = (text) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const services = [
  {
    title: "Websites and web apps",
    text: "Business sites, online stores and dashboards built with Next.js. Fast on phones, easy to update.",
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    title: "AI agents and chatbots",
    text: "An agent that answers customer questions, books appointments and hands off to you when needed.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    title: "Automation",
    text: "WhatsApp bots, order alerts and report workflows that remove repeat manual work.",
    icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  },
  {
    title: "UI and UX design",
    text: "Clean, on-brand screens designed before any code is written, so you approve what you get.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </>
    ),
  },
];

// [number, suffix, label] - sirf wahi rakho jo sach ho
const stats = [
  [8, "", "Live projects"],
  [4, "", "Core services"],
  [24, "h", "Reply time"],
  [100, "%", "Fixed-price quotes"],
];

const steps = [
  ["Tell us the goal", "Share what you need on WhatsApp or the form. We reply within a day."],
  ["Get a quote", "A fixed price and timeline, agreed before work starts."],
  ["We build", "You see progress at each stage and can request changes."],
  ["Launch and support", "We deploy, train you, and fix issues after delivery."],
];

const projects = [
  {
    name: "AI-Driven Book",
    type: "AI web app",
    text: "Interactive book with a chatbot that answers from the book's content, English and Urdu translation, personalized explanations and user login.",
    tags: ["Docusaurus", "FastAPI", "Gemini AI"],
    url: "https://chatbot-hackatone.vercel.app/",
    repo: "https://github.com/hn8378429/chatbot-hackatone",
  },
  {
    name: "Furniture Store",
    type: "E-commerce, Figma to code",
    text: "Furniture shop built from a Figma design, with shop, cart, wishlist, profile, product sections and blog pages.",
    tags: ["Next.js", "Figma", "E-commerce"],
    url: "https://figmahasan.vercel.app/",
  },
  {
    name: "UrbanMarks Beauty Store",
    type: "E-commerce demo",
    text: "Online store with product grid, cart, wishlist, categories and live weather and time in the footer.",
    tags: ["Next.js", "Cart", "Responsive"],
    url: "https://mine-project-hasan.vercel.app/",
  },
  {
    name: "Ramzan Calendar 2026",
    type: "Web app",
    text: "Prayer timings by city, countdown to Ramzan, fasting duas in Urdu and English, dark mode and print view.",
    tags: ["Next.js", "Weather API", "Urdu and English"],
    url: "https://ramzancalender2.vercel.app/",
  },
  {
    name: "Developer Portfolio",
    type: "Portfolio website",
    text: "Animated personal site with skills, projects and a contact form, built with Next.js and GSAP.",
    tags: ["Next.js", "TypeScript", "GSAP"],
    url: "https://muhammad-hasan-portfolio.vercel.app/",
  },
  {
    name: "Global New Year 2026",
    type: "Interactive web page",
    text: "Fireworks show, countdown to the next midnight, local time by country and personal greetings you can send on WhatsApp.",
    tags: ["JavaScript", "Animation", "WhatsApp share"],
    url: "https://happy-new-year-2026byhasan.vercel.app/",
  },
  {
    name: "Dynamic Resume Builder",
    type: "Web tool",
    text: "Fill in personal details, education, experience and skills, and a resume is generated for you.",
    tags: ["JavaScript", "Forms"],
    url: "https://milestone2-resumeby-muhammadhasan.vercel.app/",
  },
  {
    name: "Digital Project Website",
    type: "Hackathon, Figma to code",
    text: "Multi-section site built from a Figma design with gallery, projects, certifications and contact areas.",
    tags: ["Next.js", "Figma", "Responsive"],
    url: "https://class-hackathon-lt1h.vercel.app/",
  },
];

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "OpenAI API", "Claude API", "Vercel"];

const faqs = [
  ["How long does a website take?", "A simple business site takes about a week. Stores and web apps take two to four weeks, depending on features."],
  ["How much does it cost?", "Price depends on pages and features. Send your requirement and you get a fixed quote before any work starts."],
  ["Can an AI agent work on WhatsApp?", "Yes. We can connect an agent to WhatsApp or your website chat so it answers questions and collects orders."],
  ["Do you help after launch?", "Yes. We fix bugs, update content and add features after delivery."],
];

const reasons = [
  "Fixed pricing with no surprise charges",
  "Every project is checked before it reaches you",
  "Modern stack: Next.js, Tailwind, OpenAI and Claude APIs",
  "Support after launch",
];

export default function Home() {
  return (
    <>
      <Effects />
      <Header />

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <div className="hero-title">
              <span className="hero-name">VONEXR</span>
              <span className="hero-sub">Software Technologies</span>
            </div>
            <h1>We build websites and AI agents that keep your business answering, even when you are asleep.</h1>
            <p>
              VONEXR is a software team for small businesses and startups. Tell us what slows you down and we will build the site, bot or workflow that fixes it.
            </p>
            <div className="actions">
              <a className="btn" href={wa("Hi VONEXR, I want a free quote.")}>Get a free quote</a>
              <a className="btn ghost" href="#services">See what we build</a>
            </div>
          </div>

          <ChatDemo />
        </section>

        <section className="stats" data-reveal aria-label="VONEXR in numbers">
          {stats.map(([n, suffix, label]) => (
            <div key={label} className="stat">
              <b data-count={n} data-suffix={suffix}>{n}{suffix}</b>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="services" className="section" data-reveal>
          <h2>What we build</h2>
          <div className="grid">
            {services.map((s) => (
              <article key={s.title} className="service spot">
                <div className="service-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section" data-reveal>
          <h2>Projects we have built</h2>
          <div className="projects">
            {projects.map((p) => (
              <article key={p.name} className="project spot">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="shot" aria-label={`Open ${p.name}`}>
                  <iframe src={p.url} title={`${p.name} preview`} loading="lazy" tabIndex={-1} />
                </a>
                <div className="project-body">
                  <span className="kind">{p.type}</span>
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                  <ul className="tags">
                    {p.tags.map((t) => (<li key={t}>{t}</li>))}
                  </ul>
                  <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">Open live site</a>
                  {p.repo && (
                    <a className="link" href={p.repo} target="_blank" rel="noopener noreferrer">Source code on GitHub</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="marquee" aria-label="Technologies we use">
          <div className="marquee-track">
            {[...stack, ...stack].map((t, i) => (
              <span key={i} aria-hidden={i >= stack.length ? "true" : undefined}>{t}</span>
            ))}
          </div>
        </section>

        <section id="process" className="section" data-reveal>
          <h2>How a project works</h2>
          <ol className="steps">
            {steps.map(([t, d]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section split" data-reveal>
          <h2>Why clients pick VONEXR</h2>
          <ul className="reasons">
            {reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="section founder" data-reveal>
          <div className="logo-3d" aria-hidden="true">
            <div className="cube">
              <span className="face front" />
              <span className="face back" />
              <span className="face right" />
              <span className="face left" />
            </div>
          </div>
          <div>
            <h2>Built by Muhammad Hasan</h2>
            <p>
              Full stack developer trained under the Governor IT Initiative at Governor House, Sindh, now focused on Next.js and agentic AI. Every project goes through me before it reaches you.
            </p>
          </div>
        </section>

        <section className="section faq" data-reveal>
          <h2>Questions clients ask</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>

        <section id="team" className="section band" data-reveal>
          <h2>Developer? Work with us.</h2>
          <p>
            We take on more projects than one person can build. If you build with Next.js, React, Python or AI tools, send us your portfolio and we will match you with paid projects.
          </p>
          <a className="btn" href={wa("Hi VONEXR, I am a developer and want to join your team.")}>Apply on WhatsApp</a>
        </section>

        <section id="contact" className="section contact" data-reveal>
          <h2>Start your project</h2>
          <p>Tell us what you need. We reply with questions and a price.</p>
          <ContactForm whatsapp={WHATSAPP} />
          <p className="or">Or reach us directly</p>
          <div className="actions">
            <a className="btn ghost" href={wa("Hi VONEXR, I want to discuss a project.")}>Chat on WhatsApp</a>
            <a className="btn ghost" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a className="btn ghost" href={LINKEDIN}>LinkedIn</a>
          </div>
        </section>
      </main>

      <a className="float-wa" href={wa("Hi VONEXR, I have a question.")} aria-label="Chat on WhatsApp">Chat with us</a>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <img src="/logo.png" alt="" width="40" height="40" />
              <span>VONEXR</span>
            </a>
            <p>Websites, AI agents and automation for small businesses and startups.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#work">Work</a>
              <a href="#process">Process</a>
              <a href="#team">Join us</a>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="footer-links">
              <a href={wa("Hi VONEXR, I want to discuss a project.")}>WhatsApp</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
              <a href={LINKEDIN}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VONEXR Software Technologies</span>
          <span>Karachi, Pakistan</span>
        </div>
      </footer>
    </>
  );
}