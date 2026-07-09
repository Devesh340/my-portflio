import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, Download, ArrowRight, ArrowUp, Mail, Phone, MapPin,
  Github, Linkedin, Send, GraduationCap, Briefcase, Award, Code2, Database,
  Wrench, Users, Sparkles, ExternalLink, FileText, Cpu, Globe, Brain,
} from "lucide-react";
import avatar from "@/assets/devesh-avatar.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* -------------------------------------------------------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Web Developer",
  "Data Analyst",
  "AI Enthusiast",
  "CSE Student",
];

/* ------------------------------- utilities -------------------------------- */

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function useTyping(words: string[], speed = 90, pause = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = w.slice(0, text.length + 1);
          setText(next);
          if (next === w) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = w.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setI((n) => n + 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);
  return text;
}

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 text-center"
        >
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-cyan)]" />
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            {title.split(" ").map((w, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="gradient-text">{" " + w}</span>
              ) : i === 0 ? (
                <span key={i}>{w}</span>
              ) : (
                <span key={i}> {w}</span>
              ),
            )}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------- particles -------------------------------- */

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 3 + 1,
        d: Math.random() * 10 + 8,
        delay: Math.random() * 6,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white/40"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: d.d, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- data ----------------------------------- */

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Programming Languages",
    items: [
      { name: "Python", level: 55 },
      { name: "C", level: 55 },
    ],
  },
  {
    icon: Globe,
    title: "Web Technologies",
    items: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 78 },
      { name: "React", level: 72 },
      { name: "Node.js", level: 65 },
    ],
  },
  {
    icon: Database,
    title: "Database",
    items: [
      { name: "MySQL", level: 75 },
      { name: "MongoDB", level: 65 },
    ],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: [
      { name: "Git", level: 78 },
      { name: "GitHub", level: 80 },
      { name: "Power BI", level: 70 },
      { name: "VS Code", level: 92 },
    ],
  },
  {
    icon: Users,
    title: "Soft Skills",
    items: [
      { name: "Teamwork", level: 88 },
      { name: "Quick Learner", level: 92 },
      { name: "Problem Solving", level: 85 },
      { name: "Communication", level: 82 },
      { name: "Adaptability", level: 88 },
    ],
  },
] as const;

type Project = {
  title: string;
  description: string;
  tech: string[];
  category: "Web" | "AI" | "IoT";
  icon: typeof Cpu;
};

const PROJECTS: Project[] = [
  {
    title: "Smart Parking System",
    description:
      "Automated smart parking with conveyor belt automation, mobile app integration, CCTV monitoring, TPMS tracking, and real-time management.",
    tech: ["IoT", "Mobile App", "Automation", "Sensors"],
    category: "IoT",
    icon: Cpu,
  },
  {
    title: "Lecture-to-Notes AI",
    description:
      "AI-based web application that converts lecture content into structured, easy-to-review notes automatically.",
    tech: ["HTML", "CSS", "JavaScript", "Python", "AI"],
    category: "AI",
    icon: Brain,
  },
  {
    title: "Smart Water Bottle",
    description:
      "Smart water bottle integrated with a medical box for elderly care — improving hydration tracking and medication management.",
    tech: ["IoT", "Embedded Systems", "Healthcare"],
    category: "IoT",
    icon: Cpu,
  },
];

const PROJECT_FILTERS = ["All", "Web", "AI", "IoT"] as const;

/* --------------------------------- app ------------------------------------ */

function Portfolio() {
  const { theme, toggle } = useTheme();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const typed = useTyping(ROLES);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      let current = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 120) current = n.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-transparent"
                style={{
                  borderTopColor: "var(--brand-indigo)",
                  borderRightColor: "var(--brand-cyan)",
                  borderBottomColor: "var(--brand-purple)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-sm font-medium text-muted-foreground">Loading portfolio…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 gradient-bg origin-left"
        style={{ scaleX: progress }}
      />

      {/* Nav */}
      <Nav active={active} menu={menu} setMenu={setMenu} theme={theme} toggle={toggle} />

      {/* Hero */}
      <Hero typed={typed} />

      {/* About */}
      <Section id="about" eyebrow="Who I Am" title="About Me" subtitle="A quick introduction to my background and interests.">
        <About />
      </Section>

      {/* Education */}
      <Section id="education" eyebrow="Academics" title="Education Journey">
        <Education />
      </Section>

      {/* Skills */}
      <Section id="skills" eyebrow="Toolbox" title="Technical Skills" subtitle="Languages, frameworks and tools I work with.">
        <Skills />
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="Featured Work" title="Selected Projects" subtitle="A few things I've built recently.">
        <Projects />
      </Section>

      {/* Experience */}
      <Section id="experience" eyebrow="Career" title="Work Experience">
        <Experience />
      </Section>

      {/* Certifications */}
      <Section id="certifications" eyebrow="Achievements" title="Certifications">
        <Certifications />
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Say Hello" title="Get In Touch" subtitle="Have an opportunity or just want to chat? My inbox is open.">
        <Contact />
      </Section>

      <Footer />

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full gradient-bg text-white shadow-lg shadow-black/30 transition-transform hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------- nav ----------------------------------- */

function Nav({
  active, menu, setMenu, theme, toggle,
}: {
  active: string; menu: boolean; setMenu: (v: boolean) => void;
  theme: "dark" | "light"; toggle: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-3 max-w-7xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-bg font-display text-sm font-bold text-white">DK</span>
            <span className="hidden font-display text-base font-semibold sm:block">Devesh<span className="gradient-text">.</span></span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span layoutId="nav-active" className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full gradient-bg" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="/resume.pdf"
              className="hidden items-center gap-2 rounded-lg gradient-bg px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-border lg:hidden"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
            >
              {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 rounded-2xl p-3 lg:hidden"
            >
              <div className="grid grid-cols-2 gap-1">
                {NAV.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setMenu(false)}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      active === n.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {n.label}
                  </a>
                ))}
              </div>
              <a
                href="/resume.pdf"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg gradient-bg px-4 py-2 text-sm font-medium text-white"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* --------------------------------- hero ----------------------------------- */

function Hero({ typed }: { typed: string }) {
  const floatIcons = [
    { label: "HTML", top: "10%", left: "6%" },
    { label: "CSS", top: "70%", left: "10%" },
    { label: "JS", top: "20%", left: "88%" },
    { label: "Py", top: "72%", left: "86%" },
    { label: "AI", top: "45%", left: "94%" },
    { label: "⚛", top: "8%", left: "50%" },
  ];
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* animated blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[color:var(--brand-indigo)] opacity-30 blur-3xl animate-blob" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[color:var(--brand-purple)] opacity-25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[color:var(--brand-cyan)] opacity-25 blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
      </div>
      <Particles />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--brand-cyan)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--brand-cyan)]" />
            </span>
            Available for internships & collaborations
          </span>
          <p className="mt-6 text-lg text-muted-foreground">Hello, I'm</p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            Devesh <span className="gradient-text">K</span>
          </h1>
          <p className="mt-3 text-lg font-medium text-foreground/90">
            Computer Science Engineering Student
          </p>
          <p className="mt-2 h-7 text-base text-muted-foreground sm:text-lg">
            <span className="gradient-text font-semibold">{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-foreground animate-blink" />
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            A passionate CSE student with a strong interest in Web Development, Data
            Analysis, and Artificial Intelligence. I enjoy building websites, exploring
            new technologies, and solving real-world problems through software.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--brand-indigo)]/30 transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors hover:text-[color:var(--brand-cyan)]"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { label: "CGPA", val: 7.59, dec: 2, suffix: "" },
              { label: "Projects", val: 3, dec: 0, suffix: "+" },
              { label: "Internships", val: 2, dec: 0, suffix: "" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <div className="font-display text-2xl font-bold gradient-text">
                  <Counter to={s.val} decimals={s.dec} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-72 sm:w-80 lg:w-[24rem]"
        >
          <div className="absolute inset-0 rounded-full gradient-bg blur-2xl opacity-40" />
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/10 glow-ring animate-float">
            <img
              src={avatar}
              alt="Devesh K portrait"
              width={768}
              height={768}
              className="h-full w-full object-cover"
            />
          </div>

          {floatIcons.map((f, i) => (
            <motion.div
              key={f.label}
              className="glass absolute grid h-12 w-12 place-items-center rounded-xl font-display text-sm font-bold gradient-text"
              style={{ top: f.top, left: f.left }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              {f.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- about ---------------------------------- */

function About() {
  const info = [
    { k: "Name", v: "Devesh K" },
    { k: "Location", v: "Cuddalore, Tamil Nadu" },
    { k: "Email", v: "deveshkrishnan2007@gmail.com" },
    { k: "Phone", v: "+91 6369540458" },
    { k: "Degree", v: "Bachelor of Engineering" },
    { k: "Specialization", v: "Computer Science Engineering" },
    { k: "CGPA", v: "7.59 / 10" },
    { k: "Focus", v: "Web · Data · AI" },
  ];
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-2xl p-8">
        <h3 className="font-display text-2xl font-semibold">
          A little <span className="gradient-text">about my journey</span>
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          I am currently pursuing my Bachelor of Engineering in Computer Science
          Engineering at <span className="text-foreground">SNS Institutions, Coimbatore</span>.
          I'm passionate about building responsive websites and exploring Artificial
          Intelligence, Data Analytics, and Full Stack Development.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          I enjoy solving technical challenges and constantly improving my skills
          through internships, projects and certifications — turning ideas into
          production-ready software.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Curious", "Detail-oriented", "Team player", "Fast learner"].map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
        {info.map((i) => (
          <div key={i.k} className="glass rounded-xl p-4 transition-transform hover:-translate-y-1">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{i.k}</div>
            <div className="mt-1 truncate text-sm font-medium">{i.v}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------- education -------------------------------- */

function Education() {
  const items = [
    {
      title: "Bachelor of Engineering",
      place: "SNS Institutions, Coimbatore",
      sub: "Computer Science Engineering",
      period: "2024 – 2028",
      score: "CGPA 7.59 / 10",
    },
    {
      title: "Higher Secondary (12th)",
      place: "St Joseph's School, Cuddalore",
      sub: "HSC — Science",
      period: "2023 – 2024",
      score: "74%",
    },
    {
      title: "Secondary (10th)",
      place: "St Joseph's School, Cuddalore",
      sub: "SSLC",
      period: "2021 – 2022",
      score: "68%",
    },
  ];
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-2 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />
      <div className="space-y-8">
        {items.map((e, i) => (
          <motion.div
            key={e.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`relative grid grid-cols-[2rem_1fr] gap-4 sm:grid-cols-2 sm:gap-8 ${
              i % 2 ? "sm:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative sm:text-right">
              <div className="glass inline-block rounded-xl p-5">
                <div className="flex items-center gap-2 sm:justify-end">
                  <GraduationCap className="h-4 w-4 text-[color:var(--brand-cyan)]" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{e.period}</span>
                </div>
                <h4 className="mt-2 font-display text-lg font-semibold">{e.title}</h4>
                <p className="text-sm text-muted-foreground">{e.place}</p>
                <p className="text-sm text-foreground/80">{e.sub}</p>
                <div className="mt-3 inline-flex rounded-full gradient-bg px-3 py-1 text-xs font-semibold text-white">
                  {e.score}
                </div>
              </div>
            </div>
            <div className="hidden sm:block" />
            <span className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full gradient-bg sm:left-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- skills --------------------------------- */

function Skills() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {SKILL_GROUPS.map((g, gi) => {
        const Icon = g.icon;
        return (
          <motion.div
            key={g.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: gi * 0.05 }}
            className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h4 className="font-display text-lg font-semibold">{g.title}</h4>
            </div>
            <div className="space-y-4">
              {g.items.map((it) => (
                <SkillBar key={it.name} name={it.name} level={it.level} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-foreground/90">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full gradient-bg"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* -------------------------------- projects -------------------------------- */

function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const shown = PROJECTS.filter((p) => filter === "All" || p.category === filter);
  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === f
                ? "gradient-bg text-white shadow-lg shadow-[color:var(--brand-indigo)]/30"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1.5"
              >
                <div className="absolute inset-x-0 top-0 h-1 gradient-bg opacity-70" />
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl gradient-bg text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {p.category}
                  </span>
                </div>
                <h4 className="font-display text-xl font-semibold">{p.title}</h4>
                <p className="mt-2 min-h-[5.5rem] text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Case study</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[color:var(--brand-cyan)]" />
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------- experience ------------------------------- */

function Experience() {
  const items = [
    {
      role: "Python Programming Intern",
      company: "InternPE",
      period: "July 2025",
      points: [
        "Completed Python Programming Internship.",
        "Worked on practical Python concepts and mini projects.",
        "Improved logical thinking and coding skills.",
      ],
    },
    {
      role: "Power BI Intern",
      company: "Mindful AI",
      period: "December 2025",
      points: [
        "Completed hands-on training in Power BI Desktop.",
        "Created interactive dashboards from real datasets.",
        "Worked with data cleaning, modeling and visualization.",
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((x, i) => (
        <motion.div
          key={x.role}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="glass rounded-2xl p-7"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl gradient-bg text-white">
              <Briefcase className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-display text-lg font-semibold">{x.company}</h4>
              <p className="text-sm text-muted-foreground">{x.role}</p>
            </div>
            <span className="ml-auto rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {x.period}
            </span>
          </div>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {x.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full gradient-bg" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

/* ----------------------------- certifications ----------------------------- */

function Certifications() {
  const items = [
    { title: "Microsoft Azure AI Fundamentals", issuer: "Microsoft", tag: "AI-900" },
    { title: "Python Programming Internship", issuer: "InternPE", tag: "2025" },
    { title: "Power BI Internship", issuer: "Mindful AI", tag: "2025" },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((c, i) => (
        <motion.div
          key={c.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="glass group relative overflow-hidden rounded-2xl p-6"
        >
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full gradient-bg opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl gradient-bg text-white">
              <Award className="h-5 w-5" />
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {c.tag}
            </span>
          </div>
          <h4 className="mt-4 font-display text-lg font-semibold">{c.title}</h4>
          <p className="text-sm text-muted-foreground">Issued by {c.issuer}</p>
          <div className="mt-5 flex items-center gap-2 text-sm text-[color:var(--brand-cyan)]">
            <FileText className="h-4 w-4" /> Verified certificate
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------- contact --------------------------------- */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!form.name.trim() || form.name.length > 100) return setErr("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.email.length > 255)
      return setErr("Please enter a valid email.");
    if (!form.subject.trim() || form.subject.length > 150) return setErr("Please add a subject.");
    if (!form.message.trim() || form.message.length > 1500) return setErr("Please write a message.");
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  const cards = [
    { icon: Mail, label: "Email", value: "deveshkrishnan2007@gmail.com", href: "mailto:deveshkrishnan2007@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 6369540458", href: "tel:+916369540458" },
    { icon: MapPin, label: "Location", value: "Cuddalore, Tamil Nadu", href: "#" },
    { icon: Linkedin, label: "LinkedIn", value: "devesh-krishnan-off", href: "https://www.linkedin.com/in/devesh-krishnan-off" },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass group flex flex-col gap-3 rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="mt-0.5 break-all text-sm font-medium group-hover:text-[color:var(--brand-cyan)]">
                  {c.value}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <form onSubmit={submit} className="glass rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" />
        </div>
        <div className="mt-4">
          <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} placeholder="What's this about?" />
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            maxLength={1500}
            placeholder="Write your message…"
            className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-cyan)] focus:ring-2 focus:ring-[color:var(--brand-cyan)]/30"
          />
        </div>

        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        {sent && <p className="mt-3 text-sm text-[color:var(--brand-cyan)]">Thanks! Your message has been queued.</p>}

        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-bg px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:w-auto"
        >
          Send Message <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={255}
        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-cyan)] focus:ring-2 focus:ring-[color:var(--brand-cyan)]/30"
      />
    </div>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-bg font-display text-sm font-bold text-white">DK</span>
          <div>
            <div className="font-display text-sm font-semibold">Devesh K</div>
            <div className="text-xs text-muted-foreground">© 2026 · Made with ❤️ using React & Tailwind CSS</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: Linkedin, href: "https://www.linkedin.com/in/devesh-krishnan-off", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/", label: "GitHub" },
            { icon: Mail, href: "mailto:deveshkrishnan2007@gmail.com", label: "Email" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="glass grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:text-[color:var(--brand-cyan)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
