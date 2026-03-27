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
  { k: "1k+",   v: "Members" },
  { k: "13M+",  v: "Impressions" },
  { k: "160k+", v: "People Reached" },
  { k: "$3k+",  v: "Raised for Access" },
];

const GUIDES = [
  { title: "Grant Writing Guide",        file: "/pdfs/Grant%20Writing%20Guide%20-%20Aspire%20STEM%20Resource.pdf",                      blurb: "Templates and tips for writing compelling funding applications.",                              color: "#2CC46F", icon: "📝", tag: "Funding" },
  { title: "Pathway To Do Research",     file: "/pdfs/Pathway%20To%20Do%20Research%20(2).pdf",                                           blurb: "Roadmap from topic → question → experiments → results.",                                     color: "#0A84FF", icon: "🔬", tag: "Research" },
  { title: "Cold Email Template",        file: "/pdfs/Cold%20Email%20Template%20(3).pdf",                                                blurb: "A proven outreach message you can customize for any professor or mentor.",                   color: "#7C3AED", icon: "✉️", tag: "Outreach" },
  { title: "Curriculum Vitae Template",  file: "/pdfs/Curriculum%20Vitae%20Template%20(4).pdf",                                          blurb: "Student CV starter — pre-built sections and bullet points.",                                 color: "#F59E0B", icon: "📄", tag: "Career" },
  { title: "Brag Sheet Template",        file: "/pdfs/ELEVATE%20STEM%20RESOURCE%20-%20Brag%20Sheet%20(1).pdf",                           blurb: "Give recommenders a clear, organized snapshot of your achievements.",                       color: "#EC4899", icon: "⭐", tag: "College" },
  { title: "How to Write a Research Paper", file: "/pdfs/How%20to%20Write%20a%20Research%20Paper%20-%20Elevate%20STEM%20Resource.pdf",   blurb: "Intro → methods → results → discussion, explained step-by-step.",                          color: "#0A84FF", icon: "📖", tag: "Research" },
  { title: "Science Fair Poster Template", file: "/pdfs/Poster%20Template%20for%20Science%20Fair%20-%20ELEVATE%20STEM%20RESOURCE.pdf",   blurb: "Design-ready poster layout for science fairs and competitions.",                           color: "#2CC46F", icon: "🖼️", tag: "Competitions" },
  { title: "Quad Chart Template",        file: "/pdfs/QUAD%20CHART%20FOR%20SCIENCE%20FAIR%20-%20ELEVATE%20STEM%20RESOURCE%20(1).pdf",    blurb: "One-page project overview format used by research professionals.",                          color: "#F59E0B", icon: "📊", tag: "Competitions" },
  { title: "Literature Review Guide",    file: "/pdfs/Literature%20Review%20How-To-Do_%20(2).pdf",                                       blurb: "How to find, synthesize, and properly cite existing research.",                            color: "#7C3AED", icon: "📚", tag: "Research" },
];

const PARTNERS = [
  { name: "EduVisa",        blurb: "501(c)(3) tutoring + college mentoring with 100+ tutors, AMAs, and volunteer hours.", links: [{label:"Website",href:"https://myeduvisa.org/"},{label:"Discord",href:"https://discord.gg/9aFBhgf"}] },
  { name: "CompetifyHub",   blurb: "Free math resources shared to 9,000+ competitors per month in partnership with top orgs.", links: [{label:"Website",href:"https://competifyhub.com"},{label:"Discord",href:"https://discord.gg/UAMTuU9d8Z"}] },
  { name: "APStudy",        blurb: "AP course overviews, tips, and study materials with an active study community.", links: [{label:"Website",href:"https://apstudy.org/"},{label:"Discord",href:"https://discord.gg/XaxgdsZ4Ht"}] },
  { name: "B.O.O.S.T.",    blurb: "Workshops and competitions that ignite STEM interest; open staff and leadership roles available.", links: [{label:"Apply",href:"https://forms.fillout.com/t/t88jtBBUHKus"},{label:"Discord",href:"https://discord.gg/W6RywdKAmh"}] },
  { name: "Visionary",      blurb: "Networking and showcase hub for student founders and builders to share and grow projects.", links: [{label:"Discord",href:"https://discord.gg/qGWFBPvjfC"}] },
  { name: "Infinity Squared Mathematics", blurb: "501(c)(3) with free competitions ($2,000+ prizes), lectures, and weekly challenges.", links: [{label:"Website",href:"https://www.infinitysquaredmathematics.org/"},{label:"Discord",href:"https://discord.gg/dqjrMmNaS6"}] },
  { name: "StudyQuest",     blurb: "40+ AP guides, SAT prep, essay tips, AI passion project generator — a free academic hub.", links: [{label:"Discord",href:"https://discord.gg/jXBfmU7QHU"}] },
  { name: "Lunar Community",blurb: "501(c)(3) running math/physics Olympiads with $2,500+ prizes; partners include AoPS and Wolfram.", links: [{label:"Website",href:"https://cuddly-part-971010.framer.app/"},{label:"Discord",href:"https://discord.gg/VQVXGAS8nk"}] },
  { name: "NeuraVia",       blurb: "Global youth initiative building AI tools for early neuro diagnosis; $20K+ funded; recruiting.", links: [{label:"Discord",href:"https://discord.gg/pvcAepJQBH"}] },
];

const TEAM = [
  { name: "Neelesh Sathish", role: "CEO & Founder", init: "NS", color: "var(--green)", bio: "Neelesh co-founded Elevate STEM with a mission to democratize access to STEM education and research for students everywhere. Under his leadership, Elevate STEM has grown to a 1,000+ member network generating over 13 million impressions and reaching 160,000+ people worldwide." },
  { name: "Aayush Grover", role: "CTO & Founder", init: "AG", color: "var(--blue)", bio: "Aayush co-founded Elevate STEM and leads all technical development, including Achievr — a college insights and planning platform — and the digital infrastructure that supports Elevate STEM's global community and outreach." },
];

const DISCORD = "https://discord.gg/ymrERFS4Et";
const YOUTUBE  = "https://www.youtube.com/@ElevateSTEM_1";
const ACHIEVR  = "https://app--achievr-a62a84f5.base44.app/";

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
            <a href={ACHIEVR} target="_blank" rel="noreferrer" className="social-chip">Achievr</a>
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
            <a href={ACHIEVR} target="_blank" rel="noreferrer">Achievr</a>
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

/* ─── APP ROOT ─── */
export default function App() {
  return (
    <div className="app-wrap">
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

/* ─── HOME PAGE ─── */
function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <ImpactStrip />
      <AboutSection />
      <SolarFridgeSpotlight />
      <ProgramsSection />
      <ResourceLibrary />
      <CommunityTrust />
      <AchevrStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge hero-anim-1">Youth-Led STEM Nonprofit</div>
        <h1 className="hero-title hero-anim-2">
          Empowering the Next Generation<br />
          of <span className="grad-text">Global Innovators.</span>
        </h1>
        <p className="hero-sub hero-anim-3">
          We help students build real-world projects with real impact — from research labs to
          remote clinics, from Discord communities to university stages.
        </p>
        <div className="hero-cta hero-anim-4">
          <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Join the Community</a>
          <Link className="btn-secondary" to="/resources">Explore Resources</Link>
        </div>
        <div className="hero-proof hero-anim-5">
          <span>1,000+ members</span>
          <span className="proof-dot" />
          <span>160K+ people reached</span>
          <span className="proof-dot" />
          <span>13M+ impressions</span>
        </div>
      </div>
    </section>
  );
}

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

function AboutSection() {
  return (
    <section className="section about-section">
      <div className="about-grid">
        <div className="about-text reveal-left">
          <div className="section-eyebrow">Our Mission</div>
          <h2>Built by Students,<br />For Students</h2>
          <p>Elevate STEM is a 100% student-run nonprofit dedicated to democratizing access to STEM education, research opportunities, and college pathways. We believe every student — regardless of background or resources — deserves the tools to pursue their passions in science, technology, engineering, and mathematics.</p>
          <p>Since our founding, we've organized 15+ hands-on workshops, built 100+ institutional partnerships, raised $3,000+ to expand STEM access, and collaborated with top universities to bring admissions officers and real opportunities directly to students.</p>
          <div className="about-ctas">
            <Link className="btn-primary" to="/competitions">View Competitions</Link>
            <a className="btn-secondary" href={YOUTUBE} target="_blank" rel="noreferrer">Watch on YouTube</a>
          </div>
        </div>
        <div className="about-highlights reveal-right">
          {[
            { title:"Research Resources",     desc:"9 free downloadable guides covering grant writing, CV templates, science fair posters, and more." },
            { title:"STEMvision Competition", desc:"Annual STEM project competition with cash prizes open to all students nationwide." },
            { title:"100+ Partnerships",      desc:"Collaborative network of nonprofits, academic institutions, and student organizations." },
            { title:"Achievr Platform",       desc:"AI-powered college insights and planning tool built by our own founding team." },
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

function SolarFridgeSpotlight() {
  return (
    <section className="solar-section">
      <div className="solar-inner">
        <div className="solar-content reveal-left">
          <div className="case-study-tag">Case Study · Humanitarian Initiative</div>
          <h2 className="solar-title">The Solar Fridge Campaign</h2>
          <p className="solar-desc">In partnership with global health advocates, Elevate STEM volunteers organized a coordinated effort to source, fund, and deliver solar-powered refrigeration units to remote clinics that lacked reliable electricity — and therefore could not preserve life-saving vaccines.</p>
          <div className="solar-steps">
            {[
              { num:"01", title:"Identified the Problem", desc:"Millions of vaccines spoil annually in off-grid clinics due to lack of cold storage infrastructure." },
              { num:"02", title:"Mobilized the Community", desc:"Elevate STEM students across our network raised awareness and funds through campaigns and outreach." },
              { num:"03", title:"Delivered Real Impact", desc:"300+ solar refrigeration units delivered to remote clinics, protecting vaccines and the communities that depend on them." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="solar-step">
                <div className="step-num">{num}</div>
                <div><div className="step-title">{title}</div><div className="step-desc">{desc}</div></div>
              </div>
            ))}
          </div>
          <Link className="btn-primary" to="/leadership">Meet the Team Behind It →</Link>
        </div>
        <div className="solar-stats reveal-right">
          {[
            { number:"300+", label:"Solar Units Delivered" },
            { number:"Remote", label:"Clinics Served" },
            { number:"1000s", label:"Vaccines Preserved" },
            { number:"Global", label:"Community Effort" },
          ].map(({ number, label }, i) => (
            <div key={label} className="solar-stat-card reveal-scale" style={{ "--reveal-delay": `${i * 0.08}s` }}>
              <div className="ss-number">{number}</div>
              <div className="ss-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const programs = [
    { icon:"🏅", title:"Competitions",    desc:"The STEMvision competition invites students to showcase creativity and technical skill for cash prizes.", to:"/competitions", cta:"Learn More" },
    { icon:"📚", title:"Free Resources",  desc:"Nine curated PDF guides covering research, grant writing, CV templates, cold emailing, and more.",        to:"/resources",    cta:"Download Guides" },
    { icon:"🎬", title:"YouTube",          desc:"Educational videos, workshop recordings, and STEM career content on our growing YouTube channel.",        href:YOUTUBE,       cta:"Watch Now" },
    { icon:"🤖", title:"Achievr",          desc:"Our AI-powered college planning tool that gives students personalized insights and application strategies.",href:ACHIEVR,       cta:"Try Achievr" },
    { icon:"🤝", title:"Partnerships",    desc:"We collaborate with 100+ nonprofits, academic orgs, and community groups to amplify student impact.",     to:"/partners",     cta:"View Partners" },
    { icon:"💬", title:"Community",        desc:"A 1,000+ member Discord community for students to connect, collaborate, and grow together.",              href:DISCORD,       cta:"Join Discord" },
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

function CommunityTrust() {
  return (
    <section className="section community-trust">
      <div className="section-header reveal">
        <div className="section-eyebrow">Trusted By</div>
        <h2 className="section-title">Our Partner Network</h2>
        <p className="section-sub">100+ organizations trust Elevate STEM to collaborate on programs that move the needle for students.</p>
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

function AchevrStrip() {
  return (
    <section className="section achievr-section">
      <a className="achievr-wrap reveal" href={ACHIEVR} target="_blank" rel="noreferrer">
        <div className="achievr-left">
          <span className="achievr-badge">New Tool</span>
          <div className="achievr-text-wrap">
            <div className="achievr-headline">Achievr — AI-Powered College Planning</div>
            <div className="achievr-blurb">Personalized college insights and application strategies, built by the Elevate STEM founding team.</div>
          </div>
        </div>
        <span className="achievr-arrow">Try it free →</span>
      </a>
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
            { val:"Sep 31",label:"Deadline (Closed)" },
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
          <p>Partner with Elevate STEM and put your brand in front of thousands of motivated students, educators, and innovators.</p>
          <div className="sponsors-impact">
            {[
              { num:"1k+",  label:"Members" },
              { num:"13M+", label:"Impressions" },
              { num:"160k+",label:"People Reached" },
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
        eyebrow="Support Our Mission"
        title="Donate to Elevate STEM"
        sub="Every dollar goes directly toward free workshops, student resources, competition prizes, and expanding STEM access."
      />
      <section className="section donate-page">
        <div className="donate-why reveal">
          <h3>Where Your Money Goes</h3>
          <div className="donate-why-list">
            {[
              "100% of funds support free student programs, workshops, and resources.",
              "Competition prizes that motivate students to pursue ambitious STEM projects.",
              "Humanitarian initiatives like the Solar Fridge Campaign reaching global communities.",
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
            { amt:"$10",  impact:"Covers one student's competition entry fee" },
            { amt:"$25",  impact:"Funds production of a free student resource guide" },
            { amt:"$50",  impact:"Sponsors a workshop seat for an underserved student" },
            { amt:"$100", impact:"Contributes to our Solar Fridge humanitarian initiative" },
          ].map(({ amt, impact }, i) => (
            <div key={amt} className="donate-tier" style={{ "--reveal-delay": `${i * 0.08}s` }}>
              <span className="donate-amt">{amt}</span>
              <span className="donate-impact-text">{impact}</span>
            </div>
          ))}
        </div>
        <div className="donate-cta-box reveal">
          <p>Donation portal coming soon. In the meantime, reach out to us directly on Discord.</p>
          <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Contact Us on Discord</a>
        </div>
      </section>
    </>
  );
}
