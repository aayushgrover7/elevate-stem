import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import "./styles/pages/home.css";
import "./styles/pages/competitions.css";
import "./styles/pages/leadership.css";
import "./styles/pages/partners.css";
import "./styles/pages/sponsors.css";
import "./styles/pages/resources.css";
import "./styles/pages/donate.css";

/* ─── DATA ─── */
const STATS = [
  { k: "725+",  v: "Members" },
  { k: "7+",    v: "Workshops" },
  { k: "$574",  v: "Raised" },
  { k: "20+",   v: "Partnerships" },
];

const GUIDES = [
  { title: "Grant Writing Guide",           file: "/pdfs/Grant%20Writing%20Guide%20-%20Aspire%20STEM%20Resource.pdf",                   blurb: "Templates and tips for writing compelling funding applications.",                        color: "#2CC46F", icon: "📝", tag: "Funding" },
  { title: "Pathway To Do Research",        file: "/pdfs/Pathway%20To%20Do%20Research%20(2).pdf",                                        blurb: "Roadmap from topic → question → experiments → results.",                               color: "#0A84FF", icon: "🔬", tag: "Research" },
  { title: "Cold Email Template",           file: "/pdfs/Cold%20Email%20Template%20(3).pdf",                                             blurb: "A proven outreach message you can customize for any professor or mentor.",             color: "#7C3AED", icon: "✉️", tag: "Outreach" },
  { title: "Curriculum Vitae Template",     file: "/pdfs/Curriculum%20Vitae%20Template%20(4).pdf",                                       blurb: "Student CV starter — pre-built sections and bullet points.",                           color: "#F59E0B", icon: "📄", tag: "Career" },
  { title: "Brag Sheet Template",           file: "/pdfs/ELEVATE%20STEM%20RESOURCE%20-%20Brag%20Sheet%20(1).pdf",                        blurb: "Give recommenders a clear, organized snapshot of your achievements.",                 color: "#EC4899", icon: "⭐", tag: "College" },
  { title: "How to Write a Research Paper", file: "/pdfs/How%20to%20Write%20a%20Research%20Paper%20-%20Elevate%20STEM%20Resource.pdf",  blurb: "Intro → methods → results → discussion, explained step-by-step.",                    color: "#0A84FF", icon: "📖", tag: "Research" },
  { title: "Science Fair Poster Template",  file: "/pdfs/Poster%20Template%20for%20Science%20Fair%20-%20ELEVATE%20STEM%20RESOURCE.pdf", blurb: "Design-ready poster layout for science fairs and competitions.",                      color: "#2CC46F", icon: "🖼️", tag: "Competitions" },
  { title: "Quad Chart Template",           file: "/pdfs/QUAD%20CHART%20FOR%20SCIENCE%20FAIR%20-%20ELEVATE%20STEM%20RESOURCE%20(1).pdf",blurb: "One-page project overview format used by research professionals.",                     color: "#F59E0B", icon: "📊", tag: "Competitions" },
  { title: "Literature Review Guide",       file: "/pdfs/Literature%20Review%20How-To-Do_%20(2).pdf",                                   blurb: "How to find, synthesize, and properly cite existing research.",                       color: "#7C3AED", icon: "📚", tag: "Research" },
];

const PARTNERS = [
  { name: "EduVisa",                   blurb: "501(c)(3) tutoring and college mentoring organization with 100+ tutors, AMAs, and volunteer opportunities.", links: [{label:"Website",href:"https://myeduvisa.org/"},{label:"Discord",href:"https://discord.gg/9aFBhgf"}] },
  { name: "CompetifyHub",              blurb: "Free math competition resources serving thousands of competitors monthly in partnership with top organizations.", links: [{label:"Website",href:"https://competifyhub.com"},{label:"Discord",href:"https://discord.gg/UAMTuU9d8Z"}] },
  { name: "APStudy",                   blurb: "AP course overviews, study tips, and community resources for students navigating advanced coursework.", links: [{label:"Website",href:"https://apstudy.org/"},{label:"Discord",href:"https://discord.gg/XaxgdsZ4Ht"}] },
  { name: "B.O.O.S.T.",               blurb: "Student-run organization hosting STEM workshops and competitions to ignite passion in science and engineering.", links: [{label:"Discord",href:"https://discord.gg/W6RywdKAmh"}] },
  { name: "Infinity Squared Mathematics", blurb: "501(c)(3) offering free math competitions with $2,000+ prizes, lectures, and weekly challenge problems.", links: [{label:"Website",href:"https://www.infinitysquaredmathematics.org/"},{label:"Discord",href:"https://discord.gg/dqjrMmNaS6"}] },
  { name: "StudyQuest",                blurb: "Free academic hub with 40+ AP guides, SAT prep materials, essay tips, and a passion project generator.", links: [{label:"Discord",href:"https://discord.gg/jXBfmU7QHU"}] },
  { name: "Lunar Community",           blurb: "501(c)(3) running math and physics Olympiads with $2,500+ in prizes, partnered with AoPS and Wolfram.", links: [{label:"Website",href:"https://cuddly-part-971010.framer.app/"},{label:"Discord",href:"https://discord.gg/VQVXGAS8nk"}] },
  { name: "NeuraVia",                  blurb: "Global youth initiative building AI tools for early neurological diagnosis — $20K+ funded and actively recruiting.", links: [{label:"Discord",href:"https://discord.gg/pvcAepJQBH"}] },
];

const TEAM = [
  {
    name: "Neelesh Sathish", role: "CEO & Founder", init: "NS", color: "var(--green)",
    bio: "Neelesh co-founded Elevate STEM with a mission to democratize access to STEM education and research for students everywhere. Under his leadership, Elevate STEM has grown to a 725+ member community, hosted 7+ hands-on workshops, and built 20+ institutional partnerships.",
  },
  {
    name: "Aayush Grover", role: "CTO & Founder", init: "AG", color: "var(--blue)",
    bio: "Aayush co-founded Elevate STEM and leads all technical development and digital infrastructure, supporting the organization's community platforms, resource library, and student outreach programs worldwide.",
  },
];

const DISCORD       = "https://discord.gg/ymrERFS4Et";
const YOUTUBE       = "https://www.youtube.com/@ElevateSTEM_1";
const HACKCLUB_DONATE = "https://hackclub.com/donations/";

/* ─── UTILITIES ─── */
function useReveal() {
  useEffect(() => {
    const SELECTORS = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(SELECTORS).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ target }) {
  const [val, setVal] = useState("0");
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !ran.current) { ran.current = true; animate(target, setVal); } },
      { threshold: 0.5 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
}

function animate(raw, setter) {
  const plus = /\+$/.test(raw);
  const currency = raw.trim().startsWith("$") ? "$" : "";
  const s = raw.replace("$","").replace("+","").trim();
  const unit = /[kKmM]$/.test(s) ? s.slice(-1).toLowerCase() : "";
  const mult = unit==="k"?1_000:unit==="m"?1_000_000:1;
  const num  = parseFloat(unit?s.slice(0,-1):s);
  const total= Number.isFinite(num)?Math.round(num*mult):0;
  function toText(n){
    if(mult===1_000_000) return `${currency}${(n/1_000_000).toFixed(n>=10_000_000?0:1)}M${plus?"+":""}`;
    if(mult===1_000)     return `${currency}${(n/1_000).toFixed(n>=10_000?0:1)}K${plus?"+":""}`;
    return `${currency}${n.toLocaleString()}${plus?"+":""}`;
  }
  const dur=1800, t0=performance.now();
  (function step(t){
    const k=Math.min(1,(t-t0)/dur);
    const e=1-Math.pow(1-k,3);
    setter(toText(Math.floor(total*e)));
    if(k<1) requestAnimationFrame(step); else setter(toText(total));
  })(t0);
}

function ResourceCard({ guide: g, style: cardStyle }) {
  const filename = g.file.split("/").pop() || "guide.pdf";
  return (
    <div className="rl-card reveal" style={cardStyle}>
      <div className="rl-thumb" style={{ background: `linear-gradient(135deg, ${g.color}22, ${g.color}44)`, borderBottom: `1px solid ${g.color}33` }}>
        <span className="rl-thumb-icon">{g.icon}</span>
        <span className="rl-tag" style={{ background: `${g.color}22`, color: g.color }}>{g.tag}</span>
      </div>
      <div className="rl-body">
        <div className="rl-title">{g.title}</div>
        <div className="rl-blurb">{g.blurb}</div>
        <a className="rl-download" href={g.file} download={filename} style={{ color: g.color, borderColor: `${g.color}44` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        </a>
      </div>
    </div>
  );
}

function PageHero({ eyebrow, title, sub }) {
  return (
    <div className="page-hero">
      <div className="page-hero-inner reveal">
        <div className="section-eyebrow">{eyebrow}</div>
        <h1 className="page-hero-title">{title}</h1>
        {sub && <p className="page-hero-sub">{sub}</p>}
      </div>
    </div>
  );
}

/* ─── STATUS BANNER ─── */
function StatusBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="status-banner">
      <span className="status-dot" />
      <span className="status-text">
        <strong>Note:</strong> All current competitions are now closed. We are reviewing submissions — check back soon for upcoming opportunities!
      </span>
      <button className="status-close" onClick={() => setDismissed(true)} aria-label="Dismiss">✕</button>
    </div>
  );
}

/* ─── NAVIGATION ─── */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <NavLink to="/" className="logo-link" end>
        <span>Elevate</span>{" "}
        <span className="logo-stem">
          <span className="grad">S</span><span className="grad">T</span>
          <span className="grad">E</span><span className="grad">M</span>
        </span>
      </NavLink>
      <nav className="desk-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/competitions">Competitions</NavLink>
        <NavLink to="/leadership">Leadership</NavLink>
        <NavLink to="/partners">Partners</NavLink>
        <NavLink to="/sponsors">Sponsors</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/donate">Donate</NavLink>
        <a className="nav-pill" href={DISCORD} target="_blank" rel="noreferrer">Join Discord</a>
      </nav>
      <button className={`hamburger${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <div className={`mobile-drawer${open ? " open" : ""}`}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/competitions">Competitions</NavLink>
        <NavLink to="/leadership">Leadership</NavLink>
        <NavLink to="/partners">Partners</NavLink>
        <NavLink to="/sponsors">Sponsors</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/donate">Donate</NavLink>
        <a href={YOUTUBE} target="_blank" rel="noreferrer">YouTube</a>
        <a className="nav-pill" href={DISCORD} target="_blank" rel="noreferrer">Join Discord</a>
      </div>
    </header>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            Elevate{" "}
            <span className="logo-stem">
              <span className="grad">S</span><span className="grad">T</span>
              <span className="grad">E</span><span className="grad">M</span>
            </span>
          </div>
          <p className="footer-mission">Empowering the next generation of global innovators — one student at a time.</p>
          <div className="footer-socials">
            <a href={DISCORD} target="_blank" rel="noreferrer" className="social-chip">Discord</a>
            <a href={YOUTUBE} target="_blank" rel="noreferrer" className="social-chip">YouTube</a>
          </div>
        </div>
        <div className="footer-links-group">
          <div>
            <div className="footer-heading">Organization</div>
            <Link to="/leadership">Leadership</Link>
            <Link to="/partners">Partners</Link>
            <Link to="/sponsors">Sponsors</Link>
            <Link to="/donate">Donate</Link>
          </div>
          <div>
            <div className="footer-heading">Programs</div>
            <Link to="/competitions">Competitions</Link>
            <Link to="/resources">Resources</Link>
            <a href={YOUTUBE} target="_blank" rel="noreferrer">YouTube</a>
          </div>
          <div>
            <div className="footer-heading">Community</div>
            <a href={DISCORD} target="_blank" rel="noreferrer">Discord Server</a>
            <a href={YOUTUBE} target="_blank" rel="noreferrer">YouTube Channel</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Elevate STEM Foundation. All rights reserved.</span>
        <span className="footer-tagline">Built by students, for students.</span>
      </div>
    </footer>
  );
}

/* ─── CURSOR GLOW ─── */
function CursorGlow() {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let revealed = false;
    const onMove = (e) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (!el) return;
        el.style.left = `${e.clientX}px`;
        el.style.top  = `${e.clientY}px`;
        if (!revealed) { el.style.opacity = "1"; revealed = true; }
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);
  return <div className="cursor-glow" ref={ref} />;
}

/* ─── APP ROOT ─── */
export default function App() {
  return (
    <div className="app-wrap">
      <CursorGlow />
      <StatusBanner />
      <Header />
      <main>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/leadership"   element={<Leadership />} />
          <Route path="/partners"     element={<Partners />} />
          <Route path="/sponsors"     element={<Sponsors />} />
          <Route path="/resources"    element={<ResourcesPage />} />
          <Route path="/donate"       element={<Donate />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

/* ─── MARQUEE TICKER ─── */
function MarqueeTicker() {
  const items = [
    "725+ Members", "7+ Workshops", "$574 Raised", "20+ Partners",
    "100% Free", "Student-Led", "Open to All", "STEM for Everyone",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}<span className="marquee-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─── */
function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <ImpactStrip />
      <AboutSection />
      <ProgramsSection />
      <ResourceLibrary />
      <CommunityTrust />
    </>
  );
}

/* ── FLOATING ATOM ── */
function FloatingAtom() {
  const orbits = [
    { angle: 0,   color: "#2CC46F", dur: "7s",  begin: "0s"    },
    { angle: 60,  color: "#0A84FF", dur: "11s", begin: "-3.5s" },
    { angle: 120, color: "#2CC46F", dur: "15s", begin: "-7s"   },
  ];
  return (
    <svg className="atom-svg" viewBox="-160 -160 320 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="atomGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="nucGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="10" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="nucFill" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#2CC46F"/>
          <stop offset="100%" stopColor="#0A84FF"/>
        </radialGradient>
      </defs>
      {orbits.map(({ angle, color, dur, begin }) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <ellipse cx="0" cy="0" rx="130" ry="42" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
          <circle r="5.5" fill={color} filter="url(#atomGlow)">
            <animateMotion
              path="M 130,0 A 130,42 0 1,1 -130,0 A 130,42 0 1,1 130,0"
              dur={dur} repeatCount="indefinite" begin={begin}
            />
          </circle>
        </g>
      ))}
      <circle cx="0" cy="0" r="14" fill="url(#nucFill)" filter="url(#nucGlow)">
        <animate attributeName="r" values="12;17;12" dur="2.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="0" cy="0" r="6" fill="white" opacity="0.9"/>
    </svg>
  );
}

/* ── HERO ── */
function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;
    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientX - cx) / (rect.width / 2)) * 3;
        const ry = ((e.clientY - cy) / (rect.height / 2)) * -1.5;
        if (titleRef.current) {
          titleRef.current.style.transform = `perspective(1200px) rotateY(${rx}deg) rotateX(${ry}deg)`;
        }
      });
    };
    const onLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (titleRef.current) {
        titleRef.current.style.transition = "transform .7s var(--ease-out-expo)";
        titleRef.current.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
        setTimeout(() => { if (titleRef.current) titleRef.current.style.transition = ""; }, 700);
      }
    };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-grain" />
      <div className="atom-wrap"><FloatingAtom /></div>
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          100% Student-Run Nonprofit · Free for Everyone
        </div>
        <h1 className="hero-title" ref={titleRef}>
          <span className="hero-line-wrap">
            <span className="hero-line-elevate">
              {"Elevate".split("").map((ch, i) => (
                <span key={i} className="hero-letter" style={{ "--li": i }}>{ch}</span>
              ))}
            </span>
          </span>
          <span className="hero-line-wrap">
            <span className="hero-word hero-line-stem" style={{ "--d": ".48s" }}>STEM</span>
          </span>
        </h1>
        <p className="hero-sub">
          Built by students. Built for students.<br />
          Built to change what's possible.
        </p>
        <div className="hero-cta">
          <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Join the Community</a>
          <Link className="btn-secondary-dark" to="/resources">Explore Resources</Link>
        </div>
      </div>
    </section>
  );
}

/* ── IMPACT STRIP ── */
function ImpactStrip() {
  return (
    <section className="impact-grid-section">
      <div className="impact-grid-inner">
        {STATS.map(({ k, v }, i) => (
          <div key={v} className="impact-counter reveal-scale" style={{ "--reveal-delay": `${i * 0.1}s` }}>
            <div className="ic-number"><Counter target={k} /></div>
            <div className="ic-label">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function AboutSection() {
  return (
    <section className="section about-section">
      <div className="about-grid">
        <div className="about-text reveal-left">
          <div className="section-eyebrow">Our Mission</div>
          <h2>Built by Students,<br />For Students</h2>
          <p>Elevate STEM is a 100% student-run nonprofit dedicated to democratizing access to STEM education, research opportunities, and college pathways. We believe every student — regardless of background or resources — deserves the tools to pursue their passions in science, technology, engineering, and mathematics.</p>
          <p>Since our founding, we've hosted 7+ hands-on workshops, built 20+ institutional partnerships, raised $574+ to expand STEM access, and collaborated with educators and advocates to bring real opportunities directly to students.</p>
          <div className="about-ctas">
            <Link className="btn-primary" to="/competitions">View Competitions</Link>
            <a className="btn-secondary" href={YOUTUBE} target="_blank" rel="noreferrer">Watch on YouTube</a>
          </div>
        </div>
        <div className="about-highlights reveal-right">
          {[
            { title:"Research Resources",     desc:"9 free downloadable guides covering grant writing, CV templates, science fair posters, and more." },
            { title:"STEMvision Competition", desc:"Annual STEM project competition with cash prizes open to all students nationwide." },
            { title:"20+ Partnerships",       desc:"Collaborative network of nonprofits, academic institutions, and student organizations." },
            { title:"7+ Workshops",           desc:"Hands-on student workshops bringing STEM education and mentorship directly to our community." },
          ].map(({ title, desc }) => (
            <div key={title} className="highlight-card">
              <span className="highlight-dot" />
              <div>
                <div className="highlight-title">{title}</div>
                <div className="highlight-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROGRAMS ── */
function ProgramsSection() {
  const programs = [
    { icon:"🏅", title:"Competitions",    desc:"The STEMvision competition invites students to showcase creativity and technical skill for cash prizes.", to:"/competitions", cta:"Learn More" },
    { icon:"📚", title:"Free Resources",  desc:"Nine curated PDF guides covering research, grant writing, CV templates, cold emailing, and more.",        to:"/resources",    cta:"Download Guides" },
    { icon:"🎬", title:"YouTube",          desc:"Educational videos, workshop recordings, and STEM career content on our growing YouTube channel.",        href:YOUTUBE,       cta:"Watch Now" },
    { icon:"🤝", title:"Partnerships",    desc:"We collaborate with 20+ nonprofits, academic orgs, and community groups to amplify student impact.",     to:"/partners",     cta:"View Partners" },
    { icon:"💬", title:"Community",        desc:"A 725+ member Discord community for students to connect, collaborate, and grow together.",              href:DISCORD,       cta:"Join Discord" },
    { icon:"💙", title:"STEM for All",     desc:"We're committed to getting STEM supplies and resources into the hands of underserved kids worldwide.",  to:"/donate",       cta:"Support the Mission" },
  ];
  return (
    <section className="section programs-section">
      <div className="section-header reveal">
        <div className="section-eyebrow">What We Do</div>
        <h2 className="section-title">Programs & Initiatives</h2>
        <p className="section-sub">From competitions to content — every program is free and student-driven.</p>
      </div>
      <div className="programs-grid">
        {programs.map(({ icon, title, desc, to, href, cta }, i) => (
          <div key={title} className="program-card reveal" style={{ "--reveal-delay": `${i * 0.07}s` }}>
            <div className="program-icon-wrap">{icon}</div>
            <h3 className="program-title">{title}</h3>
            <p className="program-desc">{desc}</p>
            {to
              ? <Link className="program-cta" to={to}>{cta} →</Link>
              : <a className="program-cta" href={href} target="_blank" rel="noreferrer">{cta} →</a>
            }
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── RESOURCE LIBRARY ── */
function ResourceLibrary() {
  return (
    <section className="section resource-library">
      <div className="section-header reveal">
        <div className="section-eyebrow">Free Downloads</div>
        <h2 className="section-title">Resource Library</h2>
        <p className="section-sub">Professional-grade guides and templates — completely free, no sign-up required.</p>
      </div>
      <div className="rl-grid">
        {GUIDES.slice(0, 6).map((g, i) => (
          <ResourceCard key={g.file} guide={g} style={{ "--reveal-delay": `${i * 0.07}s` }} />
        ))}
      </div>
      <div className="browse-wrap reveal">
        <Link className="btn-secondary" to="/resources">Browse All {GUIDES.length} Resources →</Link>
      </div>
    </section>
  );
}

/* ── COMMUNITY TRUST ── */
function CommunityTrust() {
  return (
    <section className="section community-trust">
      <div className="section-header reveal">
        <div className="section-eyebrow">Trusted By</div>
        <h2 className="section-title">Our Partner Network</h2>
        <p className="section-sub">20+ organizations collaborate with Elevate STEM on programs that move the needle for students.</p>
      </div>
      <div className="logo-cloud reveal">
        {PARTNERS.map((p) => (
          <a key={p.name} className="logo-chip" href={p.links[0]?.href} target="_blank" rel="noreferrer" title={p.blurb}>{p.name}</a>
        ))}
      </div>
      <div className="trust-cta reveal">
        <Link className="btn-secondary" to="/partners">View All Partners →</Link>
      </div>
    </section>
  );
}

/* ─── LEADERSHIP PAGE ─── */
function Leadership() {
  useReveal();
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Leadership Team"
        sub="Founded and led by students committed to expanding STEM access for the next generation."
      />
      <section className="section" style={{ background: "var(--surface2)" }}>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div key={m.name} className="team-card reveal-scale" style={{ "--reveal-delay": `${i * 0.12}s` }}>
              <div className="team-avatar" style={{ background:`linear-gradient(135deg,${m.color}22,${m.color}44)`, borderColor:`${m.color}55` }}>
                <span className="team-initials" style={{ color: m.color }}>{m.init}</span>
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role" style={{ color: m.color }}>{m.role}</div>
              <p className="team-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="leadership-cta-section">
        <div className="lm-inner reveal">
          <h3>Join the Movement</h3>
          <p>Elevate STEM is always growing. If you're passionate about STEM and want to make a real impact, join our community.</p>
          <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Join Our Discord</a>
        </div>
      </section>
    </>
  );
}

/* ─── COMPETITIONS PAGE ─── */
function Competitions() {
  useReveal();
  return (
    <>
      <PageHero
        eyebrow="Annual Competition"
        title="The STEMvision 2025"
        sub="Organized by Elevate STEM · Open to all students"
      />
      <section className="section competitions-page">
        <div className="comp-closed-banner reveal">
          <span className="comp-closed-dot" />
          <span>Submissions are currently closed. We are reviewing entries — stay tuned for results and future competitions.</span>
        </div>
        <div className="comp-hero reveal">
          {[
            { val:"$225+", label:"Total Prize Pool" },
            { val:"4",     label:"Max Team Size" },
            { val:"$10",   label:"Entry Per Person" },
            { val:"Closed",label:"Submissions" },
          ].map(({ val, label }) => (
            <div key={label} className="comp-stat">
              <span>{val}</span>
              <div>{label}</div>
            </div>
          ))}
        </div>
        <div className="comp-body">
          <div className="comp-about reveal-left">
            <h3>About the Competition</h3>
            <p>The STEMvision 2025 STEM Project Competition invites students to showcase creativity, problem-solving, and technical expertise across science, technology, engineering, and mathematics. Participants may work individually or in teams of up to four.</p>
            <h3>Cash Prizes</h3>
            <div className="prizes">
              {[
                { place:"1st Place", prize:"$100", medal:"🥇" },
                { place:"2nd Place", prize:"$75",  medal:"🥈" },
                { place:"3rd Place", prize:"$50",  medal:"🥉" },
              ].map(({ place, prize, medal }) => (
                <div key={place} className="prize-card">
                  <div className="prize-medal">{medal}</div>
                  <div className="prize-place">{place}</div>
                  <div className="prize-amount">{prize}</div>
                </div>
              ))}
            </div>
            <a className="btn-primary" href="https://forms.gle/Z2ZMXycnbTcL5NxNA" target="_blank" rel="noreferrer" style={{opacity:.5, pointerEvents:"none"}}>
              Submissions Closed
            </a>
          </div>
          <div className="comp-rubric reveal-right">
            <h3>Scoring Rubric</h3>
            <p className="comp-note">Scores run 1 (Excellent) → 6 (Poor). Formula: <code>(7 – Score) ÷ 6 × Weight</code></p>
            <table className="rubric-table">
              <thead><tr><th>Category</th><th>Weight</th></tr></thead>
              <tbody>
                {[
                  ["Creativity & Originality","20%"],["Innovation & Practicality","20%"],
                  ["Technical Skill & Execution","25%"],["Research & Documentation","15%"],
                  ["Impact & Contribution","15%"],["Presentation & Communication","5%"],
                ].map(([cat, wt]) => (
                  <tr key={cat}><td>{cat}</td><td className="weight-cell">{wt}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="comp-note">Tiebreaker: Impact &amp; Contribution score. Judges provide written feedback for every category.</p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── PARTNERS PAGE ─── */
function Partners() {
  useReveal();
  return (
    <>
      <PageHero
        eyebrow="Our Network"
        title="Partner Organizations"
        sub="We collaborate with organizations that actually move the needle for students."
      />
      <section className="section" style={{ background: "var(--surface2)" }}>
        <div className="partners-grid">
          {PARTNERS.map((p, i) => (
            <div key={p.name} className="partner-card reveal" style={{ "--reveal-delay": `${i * 0.06}s` }}>
              <div className="partner-name">{p.name}</div>
              <p className="partner-blurb">{p.blurb}</p>
              <div className="partner-links">
                {p.links.map((l) => (
                  <a key={l.href} className="partner-link" href={l.href} target="_blank" rel="noreferrer">{l.label} →</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ─── SPONSORS PAGE ─── */
function Sponsors() {
  useReveal();
  return (
    <>
      <PageHero
        eyebrow="Support Us"
        title="Our Sponsors"
        sub="Our sponsors make free programs, competitions, and resources possible for students everywhere."
      />
      <section className="section" style={{ background: "var(--surface2)" }}>
        <div className="sponsors-tiers reveal">
          {[
            { tier:"Platinum Sponsors", count: 3 },
            { tier:"Gold Sponsors",     count: 4 },
            { tier:"Community Partners",count: 6 },
          ].map(({ tier, count }) => (
            <div key={tier}>
              <div className="sponsor-tier-label">{tier}</div>
              <div className="sponsor-tier-grid">
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="sponsor-placeholder">Logo coming soon</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sponsors-cta reveal">
          <h3>Become a Sponsor</h3>
          <p>Partner with Elevate STEM and put your brand in front of hundreds of motivated students, educators, and innovators.</p>
          <div className="sponsors-impact">
            {[
              { num:"725+",  label:"Members" },
              { num:"7+",    label:"Workshops" },
              { num:"20+",   label:"Partnerships" },
            ].map(({ num, label }) => (
              <div key={label} className="si-item">
                <div className="si-num">{num}</div>
                <div className="si-label">{label}</div>
              </div>
            ))}
          </div>
          <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Get in Touch</a>
        </div>
      </section>
    </>
  );
}

/* ─── RESOURCES PAGE ─── */
function ResourcesPage() {
  useReveal();
  const [activeTag, setActiveTag] = useState("All");
  const tags = ["All", ...new Set(GUIDES.map((g) => g.tag))];
  const filtered = activeTag === "All" ? GUIDES : GUIDES.filter((g) => g.tag === activeTag);
  return (
    <>
      <PageHero
        eyebrow="Free Downloads"
        title="Resource Library"
        sub="Curated PDFs to help you research, apply, and present — completely free, no sign-up required."
      />
      <section className="section resources-full">
        <div className="filter-strip">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`filter-pill${activeTag === tag ? " active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="rl-grid" key={activeTag}>
          {filtered.map((g, i) => (
            <ResourceCard key={g.file} guide={g} style={{ "--reveal-delay": `${i * 0.06}s` }} />
          ))}
        </div>
        <div className="resources-back reveal">
          <Link className="btn-secondary" to="/">← Back to Home</Link>
        </div>
      </section>
    </>
  );
}

/* ─── DONATE PAGE ─── */
function Donate() {
  useReveal();
  return (
    <>
      <PageHero
        eyebrow="Make an Impact"
        title="STEM Supplies for Kids Worldwide"
        sub="Help us put science kits, coding tools, and learning materials into the hands of underserved children around the globe."
      />
      <section className="section donate-page">
        <div className="donate-why reveal">
          <h3>Why It Matters</h3>
          <div className="donate-why-list">
            {[
              "Millions of children worldwide lack access to basic STEM tools and materials.",
              "Early exposure to science and technology shapes lifelong career paths and opportunities.",
              "Your donation directly funds supplies shipped to communities that need them most.",
            ].map((text) => (
              <div key={text} className="donate-why-item">
                <span className="donate-check">✓</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="donate-impact reveal">
          {[
            { amt:"$10",  impact:"Funds a basic science kit for one child" },
            { amt:"$25",  impact:"Covers coding supplies for a small classroom activity" },
            { amt:"$50",  impact:"Sponsors a full STEM kit for an underserved student" },
            { amt:"$100", impact:"Equips an entire group with hands-on learning materials" },
          ].map(({ amt, impact }, i) => (
            <div key={amt} className="donate-tier" style={{ "--reveal-delay": `${i * 0.08}s` }}>
              <span className="donate-amt">{amt}</span>
              <span className="donate-impact-text">{impact}</span>
            </div>
          ))}
        </div>
        <div className="donate-cta-box reveal">
          <p>Donate securely through Hack Club — a trusted 501(c)(3) fiscal sponsor supporting student-led nonprofits worldwide.</p>
          <a className="btn-primary" href={HACKCLUB_DONATE} target="_blank" rel="noreferrer">Donate via Hack Club →</a>
          <p style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: "4px" }}>
            Questions? Reach us on <a href={DISCORD} target="_blank" rel="noreferrer" style={{ color: "var(--blue)" }}>Discord</a>.
          </p>
        </div>
      </section>
    </>
  );
}
