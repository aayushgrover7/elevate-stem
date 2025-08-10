import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

/* ---------- Shared UI ---------- */
function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

function ComingSoon({ label = "Coming soon" }) {
  return (
    <div className="sponsor-placeholder">{label}</div>
  );
}

function Counter({ target, className }) {
  const [val, setVal] = useState("0");
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !ran.current) {
        ran.current = true;
        animateCount(target, setVal);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <div ref={ref} className={className}>{val}</div>;
}

function animateCount(raw, setter) {
  const { total, toText } = parsePretty(raw);
  const dur = 1200, t0 = performance.now();
  function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - k, 3);
    setter(toText(Math.floor(total * e)));
    if (k < 1) requestAnimationFrame(step);
    else setter(toText(total));
  }
  requestAnimationFrame(step);
}
function parsePretty(raw) {
  const plus = /\+$/.test(raw);
  const currency = raw.trim().startsWith("$") ? "$" : "";
  const s = raw.replace("$","").replace("+","").trim();
  const unit = /[kKmM]$/.test(s) ? s.slice(-1).toLowerCase() : "";
  const mult = unit === "k" ? 1_000 : unit === "m" ? 1_000_000 : 1;
  const num = parseFloat(unit ? s.slice(0,-1) : s);
  const total = Number.isFinite(num) ? Math.round(num * mult) : 0;
  function toText(n) {
    if (mult === 1_000_000) return `${currency}${(n/1_000_000).toFixed(n>=10_000_000?0:1)}M${plus?"+" : ""}`;
    if (mult === 1_000)     return `${currency}${(n/1_000).toFixed(n>=10_000?0:1)}K${plus?"+" : ""}`;
    return `${currency}${n.toLocaleString()}${plus?"+" : ""}`;
  }
  return { total, toText };
}

/* ---------- PDFs (working ones) ---------- */
const GUIDES = [
  {
    title: "Grant Writing Guide – Aspire STEM",
    file: "/pdfs/Grant%20Writing%20Guide%20-%20Aspire%20STEM%20Resource.pdf",
    blurb: "Templates and tips for strong funding apps.",
  },
  {
    title: "Pathway To Do Research",
    file: "/pdfs/Pathway%20To%20Do%20Research%20(2).pdf",
    blurb: "Roadmap from topic → question → experiments → results.",
  },
  {
    title: "Cold Email Template",
    file: "/pdfs/Cold%20Email%20Template%20(3).pdf",
    blurb: "A proven outreach message you can customize.",
  },
  {
    title: "Curriculum Vitae Template",
    file: "/pdfs/Curriculum%20Vitae%20Template%20(4).pdf",
    blurb: "Student CV starter—sections and bullets.",
  },
  {
    title: "Brag Sheet Template",
    file: "/pdfs/ELEVATE%20STEM%20RESOURCE%20-%20Brag%20Sheet%20(1).pdf",
    blurb: "Give recommenders a clear snapshot fast.",
  },
  {
    title: "How to Write a Research Paper",
    file: "/pdfs/How%20to%20Write%20a%20Research%20Paper%20-%20Elevate%20STEM%20Resource.pdf",
    blurb: "Intro → methods → results → discussion, step-by-step.",
  },
];

/* ---------- Curated Partners ---------- */
const PARTNERS = [
  {
    name: "EduVisa",
    blurb:
      "501(c)(3) tutoring + college mentoring community with 100+ tutors, AMAs, and volunteer hours.",
    links: [
      { label: "Website", href: "https://myeduvisa.org/" },
      { label: "Discord", href: "https://discord.gg/9aFBhgf" },
    ],
  },
  {
    name: "CompetifyHub",
    blurb:
      "Creates free math resources with partner orgs; problems shared to 9,000+ competitors per month.",
    links: [
      { label: "Website", href: "https://competifyhub.com" },
      { label: "Form", href: "https://forms.gle/mXAfRkaPYtPcP4wM8" },
      { label: "Discord", href: "https://discord.gg/UAMTuU9d8Z" },
    ],
  },
  {
    name: "APStudy",
    blurb:
      "AP course overviews, tips, and study materials; active study community.",
    links: [
      { label: "Website", href: "https://apstudy.org/" },
      { label: "Discord", href: "https://discord.gg/XaxgdsZ4Ht" },
    ],
  },
  {
    name: "B.O.O.S.T.",
    blurb:
      "Workshops + competitions that ignite interest in STEM; open staff and leadership roles.",
    links: [
      { label: "Apply", href: "https://forms.fillout.com/t/t88jtBBUHKus" },
      { label: "Discord", href: "https://discord.gg/W6RywdKAmh" },
      { label: "Linktree", href: "https://linktr.ee/boostnpo" },
    ],
  },
  {
    name: "Visionary",
    blurb:
      "Networking + showcase hub for student founders and builders; share and grow your projects.",
    links: [{ label: "Discord", href: "https://discord.gg/qGWFBPvjfC" }],
  },
  {
    name: "Infinity Squared Mathematics",
    blurb:
      "501(c)(3) with free competitions ($2000+ prizes), lectures, and weekly challenges.",
    links: [
      { label: "Website", href: "https://www.infinitysquaredmathematics.org/" },
      { label: "Discord", href: "https://discord.gg/dqjrMmNaS6" },
    ],
  },
  {
    name: "StudyQuest",
    blurb:
      "40+ AP guides, SAT prep, essay tips, AI passion project generator—free academic hub.",
    links: [{ label: "Discord", href: "https://discord.gg/jXBfmU7QHU" }],
  },
  {
    name: "Lunar Community",
    blurb:
      "501(c)(3) running math/physics Olympiads with $2500+ prizes; partners include AoPS, Wolfram.",
    links: [
      { label: "Website", href: "https://cuddly-part-971010.framer.app/" },
      { label: "Discord", href: "https://discord.gg/VQVXGAS8nk" },
    ],
  },
  {
    name: "NeuraVia",
    blurb:
      "Global youth initiative building AI tools for early neuro diagnosis; funded 20K+; recruiting.",
    links: [{ label: "Discord", href: "https://discord.gg/pvcAepJQBH" }], // <- was “Server”, now “Discord”
  },
];

/* ---------- App ---------- */
export default function App() {
  const discord = "https://discord.gg/ymrERFS4Et";
  const youtube = "https://www.youtube.com/@ElevateSTEM_1";
  const achievr = "https://app--achievr-a62a84f5.base44.app/";

  return (
    <div>
      <Header discord={discord} youtube={youtube} />
      <Routes>
        <Route path="/" element={<Home youtube={youtube} achievr={achievr} />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/leadership" element={<Page title="Leadership Team"><ComingSoon /></Page>} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/youtube" element={<Page title="YouTube"><YouTubeBlock channel={youtube} /></Page>} />
        <Route path="/donate" element={<Page title="Donate"><ComingSoon /></Page>} />
      </Routes>
      <Footer />
    </div>
  );
}

/* ---------- Layout ---------- */
function Header({ discord, youtube }) {
  return (
    <header className="nav">
      <div className="logo">
        Elevate{" "}
        <span className="logo-stem">
          <span className="grad">S</span><span className="grad">T</span>
          <span className="grad">E</span><span className="grad">M</span>
        </span>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/competitions">Competitions</Link>
        <Link to="/leadership">Leadership Team</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/sponsors">Sponsors</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/donate">Donate</Link>
        <a href={youtube} target="_blank" rel="noreferrer">YouTube</a>
        <a className="btn-sm" href={discord} target="_blank" rel="noreferrer">Discord</a>
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Elevate STEM</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/sponsors">Sponsors</Link>
        <Link to="/donate">Donate</Link>
      </div>
    </footer>
  );
}

/* ---------- Pages ---------- */
function Home({ youtube, achievr }) {
  useEffect(() => {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>e.isIntersecting && e.target.classList.add("revealed"));
    },{threshold:.3});
    document.querySelectorAll(".reveal, .stat").forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  }, []);

  return (
    <>
      <Hero />

      <section className="stats-wrap">
        <div className="stats">
          {[
            { k:"1k+", v:"Member network" },
            { k:"13M+", v:"Impressions" },
            { k:"160k+", v:"People reached" },
            { k:"15+", v:"Workshops" },
            { k:"100+", v:"Partnerships" },
            { k:"$3k+", v:"Raised for access" },
          ].map(({k,v})=>(
            <div key={v} className="stat reveal">
              <Counter target={k} className="stat-k" />
              <div className="stat-v">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <Section title="About Elevate STEM">
        <div className="about-center">
          <p className="mission">Changing Lives Through STEM, One Step At A Time.</p>
          <p className="about">
            Elevate STEM is a youth-led organization empowering students to discover, build, and share
            real projects with real impact. We’ve grown a 1,000+ member network that’s generated over
            13 million impressions and reached 160,000+ people. We’ve organized 15+ hands-on workshops,
            built 100+ partnerships, and raised $3,000+ to expand access to STEM. Volunteers helped the
            Solar Fridge Campaign deliver 300+ units that preserve vaccines in remote clinics, and we’ve
            collaborated with top universities to bring admissions officers and opportunities directly to students.
          </p>
          <div className="cta">
            <Link className="btn" to="/competitions">View Competitions</Link>
            <a className="btn-outline" href={youtube} target="_blank" rel="noreferrer">Watch on YouTube</a>
          </div>
        </div>
      </Section>

      <Section title="Explore">
        <div className="tiles reveal">
          <Link className="tile" to="/competitions">Competitions</Link>
          <Link className="tile" to="/leadership">Leadership Team</Link>
          <Link className="tile" to="/partners">Partners</Link>
          <Link className="tile" to="/sponsors">Sponsors</Link>
          <Link className="tile" to="/resources">Resources</Link>
          <Link className="tile" to="/donate">Donate</Link>
        </div>
      </Section>

      <Section title="Resources">
        <p className="muted center mb16">
          Download ready-to-use guides and templates for research, internships, grants, and competitions.
        </p>
        <ResourceGrid items={GUIDES.slice(0,6)} />
        <div className="browse-wrap">
          <Link className="btn-outline" to="/resources">Browse all resources</Link>
        </div>
      </Section>

      <Section>
        <a className="achievr" href={achievr} target="_blank" rel="noreferrer">
          <div className="achievr-badge">New</div>
          <div className="achievr-text">
            <strong>Achievr:</strong> college insights & planning for students — try it now
          </div>
          <span className="achievr-cta">Open</span>
        </a>
      </Section>
    </>
  );
}

function Competitions() {
  return (
    <Section>
      <h2 className="page-title">The STEMvision 2025</h2>
      <div className="page-body">
        <p><strong>Organizer:</strong> Elevate STEM</p>
        <p><strong>Max Team Size:</strong> 4 participants</p>
        <p><strong>Entry Fee:</strong> $10 per person</p>

        <h3>About the Competition</h3>
        <p>
          The Elevate STEM 2025 STEM Project Competition invites students to showcase creativity,
          problem-solving, and technical expertise across science, technology, engineering, and mathematics.
          Participants may work individually or in teams of up to four. Projects are judged on creativity,
          innovation, technical skill, research, impact, and presentation. Submissions are due by
          <strong> September 31, 2025</strong>, and top teams receive cash prizes.
        </p>

        <h3>Scoring Scale</h3>
        <p><em>1 = Excellent | 2 = Very Good | 3 = Good | 4 = Fair | 5 = Needs Improvement | 6 = Poor</em></p>

        <div className="table">
          <div className="row head"><div>Category</div><div>Criteria</div><div>Weight</div></div>
          <div className="row"><div>Creativity & Originality</div><div>Fresh, unique approach; not derivative</div><div>20%</div></div>
          <div className="row"><div>Innovation & Practicality</div><div>New methods/tech; real-world potential</div><div>20%</div></div>
          <div className="row"><div>Technical Skill & Execution</div><div>Accuracy; depth; appropriate tools</div><div>25%</div></div>
          <div className="row"><div>Research & Documentation</div><div>Background research, citations, clarity</div><div>15%</div></div>
          <div className="row"><div>Impact & Contribution</div><div>Relevance; problem-solving potential</div><div>15%</div></div>
          <div className="row"><div>Presentation & Communication</div><div>Clear, engaging presentation and Q&A</div><div>5%</div></div>
        </div>

        <h3>How Scoring Works</h3>
        <p>Judges assign a score from 1 (excellent) to 6 (poor) for each category. Convert to points:</p>
        <pre className="code">(7 – Score) ÷ 6 × Category Weight = Category Points</pre>
        <p>Example: Creativity score of 2 (20% weight) → (7–2)=5 → 5/6≈0.833 → 0.833×20 = <strong>16.67 points</strong>.</p>
        <p>Add all category points for a total out of 100. If tied, the <strong>Impact & Contribution</strong> score decides the winner.</p>

        <h3>Cash Prizes</h3>
        <ul>
          <li>1st Place: $100</li>
          <li>2nd Place: $75</li>
          <li>3rd Place: $50</li>
        </ul>

        <h3>Judging Notes</h3>
        <ul>
          <li><strong>1 (Excellent):</strong> Exceeds expectations; exceptional quality.</li>
          <li><strong>3 (Good):</strong> Meets most expectations with some room for improvement.</li>
          <li><strong>6 (Poor):</strong> Fails to meet core criteria.</li>
        </ul>
        <p>Judges must provide short written feedback for each category.</p>

        <a className="btn mt12" href="https://forms.gle/Z2ZMXycnbTcL5NxNA" target="_blank" rel="noreferrer">
          Submit your project
        </a>
      </div>
    </Section>
  );
}

function Partners() {
  return (
    <Section>
      <h2 className="page-title">Partners</h2>
      <p className="muted center mb16">We collaborate with organizations that actually move the needle for students.</p>
      <div className="partners-grid">
        {PARTNERS.map(p=>(
          <div key={p.name} className="partner-card">
            <div className="partner-name">{p.name}</div>
            <div className="partner-blurb">{p.blurb}</div>
            <div className="partner-actions">
              {p.links.map(l=>(
                <a key={l.href} className="pill" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Sponsors() {
  return (
    <Section>
      <h2 className="page-title">Thank you to our sponsors</h2>
      <p className="muted center">We’ll showcase sponsor logos and tiers here. Interested in supporting? Reach out!</p>
      <ComingSoon label="Sponsor logos coming soon" />
    </Section>
  );
}

function ResourcesPage() {
  return (
    <Section>
      <h2 className="page-title">Resources</h2>
      <p className="muted center mb16">Curated PDFs to help you research, apply, and present—free to download.</p>
      <ResourceGrid items={GUIDES} />
      <div className="browse-wrap">
        <Link className="btn-outline" to="/">Back to Home</Link>
      </div>
    </Section>
  );
}

function ResourceGrid({ items }) {
  return (
    <div className="guides-grid">
      {items.map(g=>{
        const filename = g.file.split("/").pop() || "guide.pdf";
        return (
          <div key={g.file} className="guide-card">
            <div className="guide-title">{g.title}</div>
            <div className="guide-blurb">{g.blurb}</div>
            <div className="guide-actions">
              <a className="pill" href={g.file} download={filename}>Download</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Blocks ---------- */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          Elevate{" "}
          <span className="stem">
            <span className="grad">S</span><span className="grad">T</span>
            <span className="grad">E</span><span className="grad">M</span>
          </span>
        </h1>
        <p className="sub">Changing Lives Through STEM, One Step At A Time</p>
        <div className="cta">
          <Link className="btn" to="/competitions">View Competitions</Link>
          <Link className="btn-outline" to="/donate">Donate</Link>
        </div>
      </div>
      <div className="bg-glow" />
    </section>
  );
}
function Page({ title, children }) {
  return (
    <Section>
      <h2 className="page-title">{title}</h2>
      <div className="page-body">{children}</div>
    </Section>
  );
}
function YouTubeBlock({ channel }) {
  const exampleId = "dQw4w9WgXcQ"; // swap with your video id later
  return (
    <>
      <p className="muted">Channel: <a href={channel} target="_blank" rel="noreferrer">{channel}</a></p>
      <div className="video">
        <iframe
          src={`https://www.youtube.com/embed/${exampleId}`}
          title="Elevate STEM"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </>
  );
}