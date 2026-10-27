import { useEffect, useState } from 'react';

const links = {
  github: 'https://github.com/ThushanDev',
  linkedin: 'https://www.linkedin.com/in/thushan-gamage-3a5b23334/',
  email: 'mailto:stgamage5012@gmail.com',
  phone: 'tel:+94703565012',
  resume: '/resume.pdf',
};

const projects = [
  {
    number: '01',
    title: 'Node.js CI/CD Pipeline',
    category: 'DEVOPS · CLOUD · AUTOMATION',
    description:
      'A production-minded delivery pipeline that builds, tests, scans, and ships a Node.js app to AWS EC2 with Docker and GitHub Actions.',
    tags: ['GitHub Actions', 'Docker', 'AWS EC2'],
    visual: 'pipeline',
    link: 'https://github.com/ThushanDev/nodejs-cicd-ec2-github-actions',
    linkLabel: 'View repository',
  },
  {
    number: '02',
    title: 'EduFix',
    category: 'ANDROID · EDUCATION',
    description:
      'An Android learning app built in Java, refined across multiple releases with improved navigation, reusable adapters, and a cleaner student experience.',
    tags: ['Java', 'Android SDK', 'Gradle'],
    visual: 'edufix',
    link: 'https://github.com/ThushanDev/EduFix',
    linkLabel: 'Explore on GitHub',
  },
  {
    number: '03',
    title: 'FarmEase',
    category: 'PRODUCT DESIGN · AGRICULTURE',
    description:
      'A mobile product concept that helps farmers monitor crops, manage farm activities, and access useful agricultural insights.',
    tags: ['Figma', 'UI/UX', 'Mobile design'],
    visual: 'farm',
    link: null,
    linkLabel: '',
  },
  {
    number: '04',
    title: 'Parcel Delivery System',
    category: 'JAVA · ALGORITHMS',
    description:
      'A dispatch planner using a weighted road graph, Dijkstra’s shortest path, and a priority queue to match urgent parcels with available vehicles.',
    tags: ['Dijkstra', 'Graphs', 'Max heap'],
    visual: 'parcel',
    link: links.github,
    linkLabel: 'More projects',
  },
  {
    number: '05',
    title: 'Bill Sync',
    category: 'PRODUCT DESIGN · FINTECH',
    description:
      'A personal finance app concept for tracking income, expenses, and budgets through clear visual summaries and everyday-friendly flows.',
    tags: ['Figma', 'UI/UX', 'Fintech'],
    visual: 'billsync',
    link: null,
    linkLabel: '',
  },
  {
    number: '06',
    title: 'Student Management System',
    category: 'JAVA · OBJECT-ORIENTED DESIGN',
    description:
      'A Java class hierarchy for undergraduate and postgraduate records, with specialized grading, inheritance, and weighted research scoring.',
    tags: ['Java', 'OOP', 'Inheritance'],
    visual: 'student',
    link: links.github,
    linkLabel: 'More projects',
  },
  {
    number: '07',
    title: 'Digital Wallet',
    category: 'JAVA · OBJECT-ORIENTED DESIGN',
    description:
      'A Java wallet and currency converter with interface-based design, transaction modelling, and structured multi-currency conversion.',
    tags: ['Java', 'OOP', 'JSON'],
    visual: 'wallet',
    link: links.github,
    linkLabel: 'More projects',
  },
];

const capabilities = [
  {
    number: '01',
    title: 'Web development',
    description: 'PHP, MySQL, REST APIs, responsive interfaces, and Node.js fundamentals.',
    icon: '</>',
  },
  {
    number: '02',
    title: 'Mobile applications',
    description:
      'Android development with Java, Android SDK, Gradle, and lifecycle-aware patterns.',
    icon: '◫',
  },
  {
    number: '03',
    title: 'DevOps & cloud',
    description: 'Docker, CI/CD pipelines, GitHub Actions, AWS EC2, Linux, and SSH.',
    icon: '⌘',
  },
  {
    number: '04',
    title: 'Security foundations',
    description:
      'Ethical hacking, penetration testing, vulnerability assessment, and network security.',
    icon: '↗',
  },
];

const skills = [
  ['Languages', 'PHP', 'Java', 'JavaScript', 'Python', 'Kotlin', 'Bash', 'SQL'],
  ['Web', 'MySQL', 'REST APIs', 'HTML5', 'CSS3', 'Node.js', 'Responsive design'],
  ['Cloud & delivery', 'Docker', 'Docker Compose', 'GitHub Actions', 'AWS EC2', 'Nginx', 'Linux'],
  ['Tools', 'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Figma', 'Photoshop'],
];

function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? '↗' : '→'}
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const sections = ['work', 'capabilities', 'about', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Thushan Gamage, home">
        TG<span>.</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <nav
        id="main-navigation"
        className={menuOpen ? 'main-navigation is-open' : 'main-navigation'}
        aria-label="Main navigation"
      >
        <a className={activeSection === 'work' ? 'is-active' : ''} href="#work" onClick={closeMenu}>
          Work
        </a>
        <a
          className={activeSection === 'capabilities' ? 'is-active' : ''}
          href="#capabilities"
          onClick={closeMenu}
        >
          Capabilities
        </a>
        <a
          className={activeSection === 'about' ? 'is-active' : ''}
          href="#about"
          onClick={closeMenu}
        >
          About
        </a>
        <a
          className={activeSection === 'contact' ? 'is-active' : ''}
          href="#contact"
          onClick={closeMenu}
        >
          Contact
        </a>
      </nav>
      <a className="header-cta" href={links.linkedin} target="_blank" rel="noreferrer">
        Let’s connect <Arrow diagonal />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> SOFTWARE ENGINEERING · PRODUCT · DEVOPS
        </p>
        <h1>
          Building for
          <br />
          the <em>real world.</em>
        </h1>
        <p className="hero-summary">
          I’m Thushan, a software engineering undergraduate exploring how thoughtful design,
          dependable code, and cloud delivery come together to make useful products.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore selected work <Arrow />
          </a>
          <a className="button button-quiet" href={links.email}>
            Get in touch <Arrow diagonal />
          </a>
          <a className="button button-quiet" href={links.resume} target="_blank" rel="noreferrer">
            View résumé <Arrow diagonal />
          </a>
        </div>
        <div className="hero-footnote">
          <span>Software Engineering · OUSL</span>
          <span>DESIGN · DEVELOP · DELIVER</span>
        </div>
      </div>
      <div className="hero-portrait-wrap" aria-label="Portrait of Thushan Gamage">
        <div className="portrait-glow" />
        <div className="portrait-frame">
          <img src="/images/thushan-gamage.webp" alt="Thushan Gamage" fetchPriority="high" />
          <div className="portrait-caption">
            <span>THUSHAN GAMAGE</span>
            <span>BUILDING WITH PURPOSE</span>
          </div>
        </div>
        <div className="orbit-note">
          <span>✳</span> DESIGN · DEVELOP · DELIVER
        </div>
        <div className="floating-stamp">
          <span>OPEN TO</span>
          <b>
            new
            <br />
            ideas
          </b>
        </div>
      </div>
      <a className="scroll-cue" href="#work">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </a>
    </section>
  );
}

function ProofStrip() {
  const proof = [
    ['07', 'selected projects'],
    ['2+', 'EduFix releases'],
    ['2024', 'engineering student'],
  ];
  return (
    <section className="proof-strip section-wrap" aria-label="Portfolio highlights">
      <p className="proof-intro">
        LEARNING BY MAKING
        <br />
        AND MAKING IT BETTER
      </p>
      <div className="proof-items">
        {proof.map(([value, label], index) => (
          <div className="proof-item reveal" key={label}>
            <span className="proof-number" data-index={`0${index + 1}`}>
              {value}
            </span>
            <span className="proof-label">{label}</span>
          </div>
        ))}
      </div>
      <span className="proof-school">OUSL · SRI LANKA</span>
    </section>
  );
}

function ProjectVisual({ type, number }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      {type === 'pipeline' && (
        <div className="pipeline-art">
          <span>COMMIT</span>
          <i>→</i>
          <span>BUILD</span>
          <i>→</i>
          <span>SHIP</span>
          <b>✓</b>
        </div>
      )}
      {type === 'edufix' && (
        <div className="phone-art">
          <small>EduFix</small>
          <b>
            Learn
            <br />
            something
            <br />
            <em>new.</em>
          </b>
          <span>Continue learning&nbsp; ↗</span>
        </div>
      )}
      {type === 'farm' && (
        <div className="farm-art">
          <span className="sun" />
          <span className="field field-one" />
          <span className="field field-two" />
          <b>
            grow
            <br />
            with care
          </b>
        </div>
      )}
      {type === 'parcel' && (
        <div className="route-art">
          <span className="route-point point-a">A</span>
          <span className="route-line" />
          <span className="route-point point-b">B</span>
          <b>
            Shortest path
            <br />
            found <em>↗</em>
          </b>
        </div>
      )}
      {type === 'billsync' && (
        <div className="finance-art">
          <small>MONTHLY OVERVIEW</small>
          <b>INCOME · EXPENSES</b>
          <span className="chart-line">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>PLAN&nbsp;&nbsp; TRACK&nbsp;&nbsp; REVIEW</span>
        </div>
      )}
      {type === 'wallet' && (
        <div className="wallet-art">
          <span>WALLET / 01</span>
          <b>
            Digital
            <br />
            wallet
          </b>
          <i>ACCOUNT · CURRENCY · BALANCE</i>
        </div>
      )}
      {type === 'student' && (
        <div className="student-art">
          <span>STUDENT RECORD</span>
          <b>
            Undergraduate
            <br />
            <em>Postgraduate</em>
          </b>
          <i>GRADING · RESEARCH SCORING</i>
        </div>
      )}
      <span className="visual-index">{number} / 07</span>
      <span className="visual-cross">✳</span>
    </div>
  );
}

function Projects() {
  return (
    <section className="work-section section-wrap" id="work">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2>
            Ideas made
            <br />
            <em>real and useful.</em>
          </h2>
        </div>
        <p className="section-intro">
          A mix of software projects and product concepts — each one a chance to solve a problem and
          learn by building.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            className={`project-card reveal ${index === 0 ? 'project-featured' : ''}`}
            key={project.number}
          >
            <ProjectVisual type={project.visual} number={project.number} />
            <div className="project-copy">
              <div className="project-title-line">
                <p className="project-category">{project.category}</p>
                <span>{project.number}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.link && (
                <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
                  {project.linkLabel} <Arrow diagonal />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="more-work reveal">
        <span>More code, experiments, and learning in public.</span>
        <a href={links.github} target="_blank" rel="noreferrer">
          Visit my GitHub <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="capabilities-section section-wrap" id="capabilities">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">WHAT I BRING</p>
          <h2>
            Curiosity across
            <br />
            <em>the whole stack.</em>
          </h2>
        </div>
        <p className="section-intro">
          I enjoy moving between product thinking and implementation — from shaping an interface to
          getting an app ready to ship.
        </p>
      </div>
      <div className="capability-grid">
        {capabilities.map((item) => (
          <article className="capability-card reveal" key={item.number}>
            <div className="capability-top">
              <span>{item.number}</span>
              <b>{item.icon}</b>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <i className="capability-line" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    [
      '01',
      'Understand',
      'Start with the goal, the people using it, and the problem worth solving.',
    ],
    ['02', 'Shape', 'Break the idea into a clear design, manageable tasks, and the right tools.'],
    ['03', 'Build', 'Develop in small steps, keep the structure clean, and learn as I go.'],
    ['04', 'Verify', 'Check the experience, catch issues early, and refine the important details.'],
    ['05', 'Ship', 'Package the work clearly and make it ready for people to use.'],
  ];
  return (
    <section className="process-section section-wrap">
      <div className="process-heading reveal">
        <p className="eyebrow">A THOUGHTFUL WAY OF WORKING</p>
        <h2>
          From first sketch
          <br />
          to <em>the final detail.</em>
        </h2>
        <p>Good work comes from paying attention at every step.</p>
      </div>
      <div className="process-list">
        {steps.map(([number, title, copy]) => (
          <article className="process-step reveal" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
            <Arrow diagonal />
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-wrap" id="about">
      <div className="about-top reveal">
        <div>
          <p className="eyebrow">A LITTLE ABOUT ME</p>
          <h2>
            Grounded in
            <br />
            <em>learning by doing.</em>
          </h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I’m a Software Engineering undergraduate at the Open University of Sri Lanka, drawn to
            useful products and the craft behind them.
          </p>
          <p>
            My experience spans PHP and MySQL web applications, Android development, UI/UX concepts,
            and cloud delivery with Docker, GitHub Actions, and AWS EC2. I’m building strong
            foundations in software design, DevOps, and practical security.
          </p>
          <p>
            Outside project work, I contribute to engineering student communities, help coordinate
            events, and create visual materials for local community initiatives.
          </p>
        </div>
      </div>
      <div className="about-facts reveal">
        <div>
          <span>EDUCATION</span>
          <b>Bachelor of Software Engineering (Honours)</b>
          <small>The Open University of Sri Lanka · 2024—Present</small>
        </div>
        <div>
          <span>BASED IN</span>
          <b>Nawala, Sri Lanka</b>
          <small>Open to software &amp; DevOps opportunities</small>
        </div>
        <div>
          <span>LANGUAGES</span>
          <b>Sinhala · English</b>
          <small>Native · Professional</small>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills-section section-wrap">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">TOOLS I WORK WITH</p>
          <h2>
            Built on solid
            <br />
            <em>foundations.</em>
          </h2>
        </div>
        <p className="section-intro">
          A growing toolkit shaped by coursework, hands-on projects, and a habit of learning
          something new with every build.
        </p>
      </div>
      <div className="skill-groups">
        {skills.map(([label, ...items]) => (
          <div className="skill-row reveal" key={label}>
            <h3>{label}</h3>
            <div className="tag-list">
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="credentials reveal">
        <div>
          <p className="eyebrow">CURRENTLY LEARNING &amp; CERTIFIED IN</p>
          <div className="credential-list">
            <span>Ethical Hacking Fundamentals</span>
            <span>Docker Containerisation</span>
            <span>Web Design for Beginners</span>
            <span>Operating Systems Basics</span>
          </div>
        </div>
        <span className="credential-mark">✳</span>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="leadership-section section-wrap">
      <div className="leadership-intro reveal">
        <p className="eyebrow">BEYOND THE SCREEN</p>
        <h2>
          Good things happen
          <br />
          when we <em>build together.</em>
        </h2>
      </div>
      <div className="leadership-list">
        <article className="leadership-item reveal">
          <span>2026</span>
          <div>
            <h3>Assistant Editor · IESL Student Chapter</h3>
            <p>
              Support communications and editorial content for the engineering student community at
              OUSL.
            </p>
          </div>
          <Arrow diagonal />
        </article>
        <article className="leadership-item reveal">
          <span>2024—NOW</span>
          <div>
            <h3>Committee Member · Mechatronics Engineering Society</h3>
            <p>Contribute to technical events, workshops, and peer learning at OUSL.</p>
          </div>
          <Arrow diagonal />
        </article>
        <article className="leadership-item reveal">
          <span>2022—NOW</span>
          <div>
            <h3>Volunteer Graphic Designer</h3>
            <p>Create visual materials for community events serving more than 100 participants.</p>
          </div>
          <Arrow diagonal />
        </article>
        <article className="leadership-item reveal">
          <span>2025</span>
          <div>
            <h3>Organizing Committee · IEEE Jamboree</h3>
            <p>
              Helped coordinate logistics and event operations across teams of members and
              volunteers.
            </p>
          </div>
          <Arrow diagonal />
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact-section section-wrap" id="contact">
      <div className="contact-top reveal">
        <p className="eyebrow">
          <span className="status-dot" /> AVAILABLE FOR SOFTWARE &amp; DEVOPS OPPORTUNITIES
        </p>
        <h2>
          Have an idea?
          <br />
          <em>Let’s make it happen.</em>
        </h2>
        <a className="button button-primary contact-button" href={links.email}>
          Start a conversation <Arrow diagonal />
        </a>
      </div>
      <div className="contact-details reveal">
        <a href={links.email}>stgamage5012@gmail.com</a>
        <a href={links.phone}>+94 703 565 012</a>
        <div>
          <a href={links.resume} target="_blank" rel="noreferrer">
            Résumé <Arrow diagonal />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <a className="wordmark" href="#top">
          TG<span>.</span>
        </a>
        <span>Designed with care · Built with React</span>
        <span>© {new Date().getFullYear()} Thushan Gamage</span>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <div className="ticker" aria-label="Web development, mobile apps, cloud and DevOps">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <span key={index}>
                WEB DEVELOPMENT <i>✳</i> MOBILE APPS <i>✳</i> CLOUD &amp; DEVOPS <i>✳</i> PRODUCT
                THINKING <i>✳</i>
              </span>
            ))}
          </div>
        </div>
        <Projects />
        <Capabilities />
        <Process />
        <About />
        <Skills />
        <Leadership />
      </main>
      <Contact />
    </>
  );
}
