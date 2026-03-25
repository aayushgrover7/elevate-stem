import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const STATS = [
  { k: "1k+",  v: "Member Network"      },
  { k: "13M+", v: "Impressions"         },
  { k: "160k+",v: "People Reached"      },
  { k: "15+",  v: "Workshops Hosted"    },
  { k: "100+", v: "Partnerships Built"  },
  { k: "$3k+", v: "Raised for Access"   },
];

const GUIDES = [
  { title:"Grant Writing Guide",       file:"/pdfs/Grant%20Writing%20Guide%20-%20Aspire%20STEM%20Resource.pdf",             blurb:"Templates and tips for strong funding applications." },
  { title:"Pathway To Do Research",    file:"/pdfs/Pathway%20To%20Do%20Research%20(2).pdf",                                 blurb:"Roadmap from topic → question → experiments → results." },
  { title:"Cold Email Template",       file:"/pdfs/Cold%20Email%20Template%20(3).pdf",                                      blurb:"A proven outreach message you can customize." },
  { title:"Curriculum Vitae Template", file:"/pdfs/Curriculum%20Vitae%20Template%20(4).pdf",                                blurb:"Student CV starter with sections and bullets." },
  { title:"Brag Sheet Template",       file:"/pdfs/ELEVATE%20STEM%20RESOURCE%20-%20Brag%20Sheet%20(1).pdf",                 blurb:"Give recommenders a clear snapshot fast." },
  { title:"How to Write a Research Paper", file:"/pdfs/How%20to%20Write%20a%20Research%20Paper%20-%20Elevate%20STEM%20Resource.pdf", blurb:"Intro → methods → results → discussion, step-by-step." },
  { title:"Science Fair Poster Template",  file:"/pdfs/Poster%20Template%20for%20Science%20Fair%20-%20ELEVATE%20STEM%20RESOURCE.pdf", blurb:"Design-ready poster layout for science fairs." },
  { title:"Quad Chart Template",           file:"/pdfs/QUAD%20CHART%20FOR%20SCIENCE%20FAIR%20-%20ELEVATE%20STEM%20RESOURCE%20(1).pdf", blurb:"One-page project overview used by researchers." },
  { title:"Literature Review Guide",       file:"/pdfs/Literature%20Review%20How-To-Do_%20(2).pdf",                          blurb:"How to find, synthesize, and cite prior research." },
];

const PARTNERS = [
  { name:"EduVisa",                   blurb:"501(c)(3) tutoring + college mentoring with 100+ tutors, AMAs, and volunteer hours.",                links:[{label:"Website",href:"https://myeduvisa.org/"},{label:"Discord",href:"https://discord.gg/9aFBhgf"}] },
  { name:"CompetifyHub",              blurb:"Free math resources shared to 9,000+ competitors per month in partnership with top orgs.",           links:[{label:"Website",href:"https://competifyhub.com"},{label:"Discord",href:"https://discord.gg/UAMTuU9d8Z"}] },
  { name:"APStudy",                   blurb:"AP course overviews, tips, and study materials with an active study community.",                     links:[{label:"Website",href:"https://apstudy.org/"},{label:"Discord",href:"https://discord.gg/XaxgdsZ4Ht"}] },
  { name:"B.O.O.S.T.",               blurb:"Workshops and competitions that ignite STEM interest; open staff and leadership roles available.",    links:[{label:"Apply",href:"https://forms.fillout.com/t/t88jtBBUHKus"},{label:"Discord",href:"https://discord.gg/W6RywdKAmh"}] },
  { name:"Visionary",                 blurb:"Networking and showcase hub for student founders and builders to share and grow projects.",           links:[{label:"Discord",href:"https://discord.gg/qGWFBPvjfC"}] },
  { name:"Infinity Squared Mathematics", blurb:"501(c)(3) with free competitions ($2,000+ prizes), lectures, and weekly challenges.",            links:[{label:"Website",href:"https://www.infinitysquaredmathematics.org/"},{label:"Discord",href:"https://discord.gg/dqjrMmNaS6"}] },
  { name:"StudyQuest",                blurb:"40+ AP guides, SAT prep, essay tips, AI passion project generator — a free academic hub.",           links:[{label:"Discord",href:"https://discord.gg/jXBfmU7QHU"}] },
  { name:"Lunar Community",           blurb:"501(c)(3) running math/physics Olympiads with $2,500+ prizes; partners include AoPS and Wolfram.",   links:[{label:"Website",href:"https://cuddly-part-971010.framer.app/"},{label:"Discord",href:"https://discord.gg/VQVXGAS8nk"}] },
  { name:"NeuraVia",                  blurb:"Global youth initiative building AI tools for early neuro diagnosis; $20K+ funded; recruiting.",    links:[{label:"Discord",href:"https://discord.gg/pvcAepJQBH"}] },
];

const TEAM = [
  {
    name: "Neelesh Sathish",
    role: "CEO & Founder",
    init: "NS",
    color: "var(--green)",
    bio:  "Neelesh co-founded Elevate STEM with a mission to democratize access to STEM education and research for students everywhere. Under his leadership, Elevate STEM has grown to a 1,000+ member network generating over 13 million impressions and reaching 160,000+ people worldwide.",
  },
  {
    name: "Aayush Grover",
    role: "CTO & Founder",
    init: "AG",
    color: "var(--blue)",
    bio:  "Aayush co-founded Elevate STEM and leads all technical development for the organization, including building Achievr — a college insights and planning platform — and the digital infrastructure that supports Elevate STEM's global community and outreach.",
  },
];

const DISCORD = "https://discord.gg/ymrERFS4Et";
const YOUTUBE  = "https://www.youtube.com/@ElevateSTEM_1";
const ACHIEVR  = "https://app--achievr-a62a84f5.base44.app/";

/* ─────────────────────────────────────────
   UTILITIES
───────────────────────────────────────── */

function useReveal(threshold = 0.18) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
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
  const dur=1400, t0=performance.now();
  (function step(t){ const k=Math.min(1,(t-t0)/dur); const e=1-Math.pow(1-k,3); setter(toText(Math.floor(total*e))); if(k<1)requestAnimationFrame(step); else setter(toText(total)); })(t0);
}

/* ─────────────────────────────────────────
   LAYOUT
───────────────────────────────────────── */

function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc]);

  return (
    <header className="nav">
      <Link to="/" className="logo-link">
        <span className="logo-word">Elevate</span>{" "}
        <span className="logo-stem">
          <span className="grad">S</span>
          <span className="grad">T</span>
          <span className="grad">E</span>
          <span className="grad">M</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="desk-nav">
        <Link to="/">Home</Link>
        <Link to="/competitions">Competitions</Link>
        <Link to="/leadership">Leadership</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/sponsors">Sponsors</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/donate">Donate</Link>
        <a href={YOUTUBE} target="_blank" rel="noreferrer">YouTube</a>
        <a className="nav-pill" href={DISCORD} target="_blank" rel="noreferrer">Join Discord</a>
      </nav>

      {/* Hamburger */}
      <button className={`hamburger${open?" open":""}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${open?" open":""}`}>
        <Link to="/">Home</Link>
        <Link to="/competitions">Competitions</Link>
        <Link to="/leadership">Leadership</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/sponsors">Sponsors</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/donate">Donate</Link>
        <a href={YOUTUBE} target="_blank" rel="noreferrer">YouTube</a>
        <a className="nav-pill" href={DISCORD} target="_blank" rel="noreferrer">Join Discord</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="footer-logo">
          Elevate <span className="logo-stem"><span className="grad">S</span><span className="grad">T</span><span className="grad">E</span><span className="grad">M</span></span>
        </div>
        <p className="footer-mission">Changing Lives Through STEM, One Step At A Time.</p>
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
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Elevate STEM Foundation. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */

export default function App() {
  return (
    <div className="app-wrap">
      <Header />
      <main>
        <Routes>
          <Route path="/"            element={<Home />} />
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

/* ─────────────────────────────────────────
   HOME
───────────────────────────────────────── */

function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutSection />
      <ImpactSection />
      <ProgramsSection />
      <ResourcesPreview />
      <AchevrStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      {/* Animated orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-inner">
        <div className="hero-badge reveal">Youth-Led STEM Nonprofit</div>
        <h1 className="hero-title reveal">
          Elevate{" "}
          <span className="stem-letters">
            <span className="grad">S</span>
            <span className="grad">T</span>
            <span className="grad">E</span>
            <span className="grad">M</span>
          </span>
        </h1>
        <p className="hero-sub reveal">
          Changing Lives Through STEM, One Step At A Time
        </p>
        <p className="hero-desc reveal">
          A youth-led organization empowering students to discover, build, and share real projects
          with real impact — across 1,000+ members, 160,000+ people reached, and 13 million+ impressions.
        </p>
        <div className="hero-cta reveal">
          <Link className="btn-primary" to="/competitions">View Competitions</Link>
          <Link className="btn-ghost"   to="/leadership">Meet the Team</Link>
          <a    className="btn-ghost"   href={DISCORD} target="_blank" rel="noreferrer">Join Discord</a>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        {STATS.map(({ k, v }) => (
          <div key={v} className="stat-item reveal">
            <div className="stat-number"><Counter target={k} /></div>
            <div className="stat-label">{v}</div>
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
        <div className="about-text reveal">
          <div className="section-eyebrow">Our Mission</div>
          <h2 className="section-title">Built by Students, For Students</h2>
          <p>
            Elevate STEM is a 100% student-run nonprofit organization dedicated to democratizing access to
            STEM education, research opportunities, and college pathways. We believe every student —
            regardless of background or resources — deserves the tools to pursue their passions in science,
            technology, engineering, and mathematics.
          </p>
          <p>
            Since our founding, we've built a 1,000+ member network that generates over 13 million impressions,
            organized 15+ hands-on workshops, forged 100+ institutional partnerships, and raised $3,000+ to
            expand STEM access. We've collaborated with top universities to bring admissions officers and
            real opportunities directly to students.
          </p>
          <div className="about-ctas">
            <Link className="btn-primary" to="/competitions">View Competitions</Link>
            <a className="btn-secondary" href={YOUTUBE} target="_blank" rel="noreferrer">Watch on YouTube</a>
          </div>
        </div>

        <div className="about-highlights reveal">
          {[
            { icon:"🔬", title:"Research Resources",  desc:"9 free downloadable guides covering everything from grant writing to science fair poster templates." },
            { icon:"🏆", title:"STEMvision Competition", desc:"Annual STEM project competition with cash prizes open to students nationwide." },
            { icon:"🤝", title:"100+ Partnerships",    desc:"Collaborative network of nonprofits, academic institutions, and student organizations." },
            { icon:"💡", title:"Achievr Platform",     desc:"AI-powered college insights and planning tool built by our own founding team." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="highlight-card">
              <span className="highlight-icon">{icon}</span>
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

function ImpactSection() {
  return (
    <section className="section impact-section">
      <div className="section-header reveal">
        <div className="section-eyebrow">Real-World Impact</div>
        <h2 className="section-title">From Ideas to Global Action</h2>
        <p className="section-sub">Our initiatives go beyond the classroom — creating tangible change in communities around the world.</p>
      </div>
      <div className="impact-grid">
        {[
          {
            icon: "❄️",
            title: "Solar Fridge Campaign",
            stat: "300+ Units",
            desc: "Elevate STEM volunteers helped deliver 300+ solar-powered refrigeration units to remote clinics to preserve life-saving vaccines in underserved communities.",
            tag: "Humanitarian",
          },
          {
            icon: "🎓",
            title: "University Collaborations",
            stat: "Top Universities",
            desc: "We've partnered with top universities to host admissions officers, connect students with research labs, and provide direct pathways to higher education.",
            tag: "Education",
          },
          {
            icon: "🌐",
            title: "Global Community",
            stat: "160K+ Reached",
            desc: "Our Discord server, YouTube channel, and workshop series have collectively reached 160,000+ students, parents, and educators across the globe.",
            tag: "Community",
          },
        ].map(({ icon, title, stat, desc, tag }) => (
          <div key={title} className="impact-card reveal">
            <div className="impact-tag">{tag}</div>
            <div className="impact-icon">{icon}</div>
            <div className="impact-stat">{stat}</div>
            <h3 className="impact-title">{title}</h3>
            <p className="impact-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section className="section programs-section">
      <div className="section-header reveal">
        <div className="section-eyebrow">What We Do</div>
        <h2 className="section-title">Programs & Initiatives</h2>
      </div>
      <div className="programs-grid">
        {[
          { icon:"🏅", title:"Competitions",   desc:"The STEMvision competition invites students to showcase creativity and technical skill for cash prizes.",  to:"/competitions",        cta:"Learn More" },
          { icon:"📚", title:"Free Resources", desc:"Nine curated PDF guides covering research, grant writing, CV templates, cold emailing, and more.",          to:"/resources",           cta:"Download Guides" },
          { icon:"🎬", title:"YouTube",        desc:"Educational videos, workshop recordings, and STEM career content on our growing YouTube channel.",          href:YOUTUBE,              cta:"Watch Now" },
          { icon:"🤖", title:"Achievr",        desc:"Our AI-powered college planning tool that gives students personalized insights and application strategies.", href:ACHIEVR,              cta:"Try Achievr" },
          { icon:"🤝", title:"Partnerships",   desc:"We collaborate with 100+ nonprofits, academic orgs, and community groups to amplify student impact.",       to:"/partners",            cta:"View Partners" },
          { icon:"💬", title:"Community",      desc:"A 1,000+ member Discord community for students to connect, collaborate, and grow together.",                href:DISCORD,              cta:"Join Discord" },
        ].map(({ icon, title, desc, to, href, cta }) => (
          <div key={title} className="program-card reveal">
            <div className="program-icon">{icon}</div>
            <h3 className="program-title">{title}</h3>
            <p className="program-desc">{desc}</p>
            {to
              ? <Link  className="program-cta" to={to}>{cta} →</Link>
              : <a     className="program-cta" href={href} target="_blank" rel="noreferrer">{cta} →</a>
            }
          </div>
        ))}
      </div>
    </section>
  );
}

function ResourcesPreview() {
  return (
    <section className="section resources-preview">
      <div className="section-header reveal">
        <div className="section-eyebrow">Free Downloads</div>
        <h2 className="section-title">Student Resources</h2>
        <p className="section-sub">Ready-to-use guides and templates — no sign-up required.</p>
      </div>
      <div className="resources-grid">
        {GUIDES.slice(0, 6).map((g) => (
          <ResourceCard key={g.file} guide={g} />
        ))}
      </div>
      <div className="browse-wrap reveal">
        <Link className="btn-secondary" to="/resources">Browse All {GUIDES.length} Resources →</Link>
      </div>
    </section>
  );
}

function ResourceCard({ guide: g }) {
  const filename = g.file.split("/").pop() || "guide.pdf";
  return (
    <div className="resource-card reveal">
      <div className="resource-icon">📄</div>
      <div className="resource-title">{g.title}</div>
      <div className="resource-blurb">{g.blurb}</div>
      <a className="resource-btn" href={g.file} download={filename}>Download PDF</a>
    </div>
  );
}

function AchevrStrip() {
  return (
    <section className="section achievr-section reveal">
      <a className="achievr-strip" href={ACHIEVR} target="_blank" rel="noreferrer">
        <div className="achievr-left">
          <span className="achievr-badge">New</span>
          <div>
            <div className="achievr-headline">Achievr — AI College Planning</div>
            <div className="achievr-blurb">Personalized college insights and application strategies built by the Elevate STEM team.</div>
          </div>
        </div>
        <span className="achievr-arrow">Try it free →</span>
      </a>
    </section>
  );
}

/* ─────────────────────────────────────────
   LEADERSHIP
───────────────────────────────────────── */

function Leadership() {
  useReveal();
  return (
    <section className="section leadership-page">
      <div className="section-header reveal">
        <div className="section-eyebrow">Our Team</div>
        <h2 className="section-title">Leadership Team</h2>
        <p className="section-sub">
          Elevate STEM is founded and led by passionate students committed to expanding STEM access for the next generation.
        </p>
      </div>

      <div className="team-grid">
        {TEAM.map((m) => (
          <div key={m.name} className="team-card reveal">
            <div className="team-avatar" style={{ background: `linear-gradient(135deg, ${m.color}22, ${m.color}44)`, borderColor: `${m.color}55` }}>
              <span className="team-initials" style={{ color: m.color }}>{m.init}</span>
            </div>
            <div className="team-name">{m.name}</div>
            <div className="team-role" style={{ color: m.color }}>{m.role}</div>
            <p className="team-bio">{m.bio}</p>
          </div>
        ))}
      </div>

      <div className="leadership-mission reveal">
        <div className="lm-inner">
          <h3>Join the Movement</h3>
          <p>
            Elevate STEM is always growing. If you're a student passionate about STEM and want to make a real impact,
            join our Discord community to get involved.
          </p>
          <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Join Our Discord</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   COMPETITIONS
───────────────────────────────────────── */

function Competitions() {
  useReveal();
  return (
    <section className="section competitions-page">
      <div className="section-header reveal">
        <div className="section-eyebrow">Annual Competition</div>
        <h2 className="section-title">The STEMvision 2025</h2>
        <p className="section-sub">Organized by Elevate STEM · Open to all students</p>
      </div>

      <div className="comp-hero reveal">
        <div className="comp-stat"><span>$225+</span><div>Total Prize Pool</div></div>
        <div className="comp-divider" />
        <div className="comp-stat"><span>4</span><div>Max Team Size</div></div>
        <div className="comp-divider" />
        <div className="comp-stat"><span>$10</span><div>Entry Per Person</div></div>
        <div className="comp-divider" />
        <div className="comp-stat"><span>Sep 31</span><div>Submission Deadline</div></div>
      </div>

      <div className="comp-body">
        <div className="comp-about reveal">
          <h3>About the Competition</h3>
          <p>
            The STEMvision 2025 STEM Project Competition invites students to showcase creativity,
            problem-solving, and technical expertise across science, technology, engineering, and mathematics.
            Participants may work individually or in teams of up to four. Projects are judged on creativity,
            innovation, technical skill, research quality, real-world impact, and presentation.
          </p>

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

          <a className="btn-primary" href="https://forms.gle/Z2ZMXycnbTcL5NxNA" target="_blank" rel="noreferrer">
            Submit Your Project →
          </a>
        </div>

        <div className="comp-rubric reveal">
          <h3>Scoring Rubric</h3>
          <p className="comp-note">Scores run 1 (Excellent) → 6 (Poor). Formula: <code>(7 – Score) ÷ 6 × Weight</code></p>
          <table className="rubric-table">
            <thead>
              <tr><th>Category</th><th>Weight</th></tr>
            </thead>
            <tbody>
              {[
                ["Creativity & Originality",           "20%"],
                ["Innovation & Practicality",           "20%"],
                ["Technical Skill & Execution",         "25%"],
                ["Research & Documentation",            "15%"],
                ["Impact & Contribution",               "15%"],
                ["Presentation & Communication",        "5%"],
              ].map(([cat, wt]) => (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td className="weight-cell">{wt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="comp-note">Tiebreaker: Impact &amp; Contribution score decides the winner. Judges provide written feedback for every category.</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PARTNERS
───────────────────────────────────────── */

function Partners() {
  useReveal();
  return (
    <section className="section partners-page">
      <div className="section-header reveal">
        <div className="section-eyebrow">Our Network</div>
        <h2 className="section-title">Partner Organizations</h2>
        <p className="section-sub">We collaborate with organizations that actually move the needle for students.</p>
      </div>
      <div className="partners-grid">
        {PARTNERS.map((p) => (
          <div key={p.name} className="partner-card reveal">
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
  );
}

/* ─────────────────────────────────────────
   SPONSORS
───────────────────────────────────────── */

function Sponsors() {
  useReveal();
  return (
    <section className="section sponsors-page">
      <div className="section-header reveal">
        <div className="section-eyebrow">Support Us</div>
        <h2 className="section-title">Our Sponsors</h2>
        <p className="section-sub">Our sponsors make it possible to run free programs, competitions, and resources for students everywhere.</p>
      </div>
      <div className="sponsors-placeholder reveal">
        <div className="sp-icon">🌟</div>
        <div className="sp-text">Sponsor logos coming soon</div>
        <p className="sp-sub">Interested in supporting Elevate STEM? We'd love to partner with you.</p>
        <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Get in Touch</a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   RESOURCES PAGE
───────────────────────────────────────── */

function ResourcesPage() {
  useReveal();
  return (
    <section className="section resources-full">
      <div className="section-header reveal">
        <div className="section-eyebrow">Free Downloads</div>
        <h2 className="section-title">Student Resources</h2>
        <p className="section-sub">Curated PDFs to help you research, apply, and present — completely free, no sign-up required.</p>
      </div>
      <div className="resources-grid">
        {GUIDES.map((g) => <ResourceCard key={g.file} guide={g} />)}
      </div>
      <div className="browse-wrap reveal">
        <Link className="btn-secondary" to="/">← Back to Home</Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DONATE
───────────────────────────────────────── */

function Donate() {
  useReveal();
  return (
    <section className="section donate-page">
      <div className="section-header reveal">
        <div className="section-eyebrow">Support Our Mission</div>
        <h2 className="section-title">Donate to Elevate STEM</h2>
        <p className="section-sub">
          Every dollar goes directly toward free workshops, student resources, competition prizes, and expanding STEM access.
        </p>
      </div>
      <div className="donate-content reveal">
        <div className="donate-impact">
          {[
            { amt:"$10",  impact:"Covers one student's competition entry fee" },
            { amt:"$25",  impact:"Funds production of a free student resource guide" },
            { amt:"$50",  impact:"Sponsors a workshop seat for an underserved student" },
            { amt:"$100", impact:"Contributes to our Solar Fridge humanitarian initiative" },
          ].map(({ amt, impact }) => (
            <div key={amt} className="donate-tier">
              <span className="donate-amt">{amt}</span>
              <span className="donate-impact-text">{impact}</span>
            </div>
          ))}
        </div>
        <div className="donate-cta-box">
          <div className="donate-placeholder">💛</div>
          <p>Donation portal coming soon. In the meantime, reach out to us directly on Discord.</p>
          <a className="btn-primary" href={DISCORD} target="_blank" rel="noreferrer">Contact Us on Discord</a>
        </div>
      </div>
    </section>
  );
}
