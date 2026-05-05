"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import {
  ArrowRight, Download, Briefcase, Award, GraduationCap, Globe,
  Mail, Phone, ChevronDown, ExternalLink, Sparkles
} from "lucide-react";

/* ── Social SVG icons (lucide dropped these) ── */
const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
import resumeData from "@/data/resume.json";

/* ── Animated counter ── */
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(value);

  // Extract leading prefix (like $), trailing suffix (like %+, +, M+), and the core number
  const match = value.match(/^([^0-9]*)([0-9.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericStr = match ? match[2] : "";
  const suffix = match ? match[3] : "";
  const target = parseFloat(numericStr);
  const isAnimatable = match && !isNaN(target);

  useEffect(() => {
    if (!isInView || !isAnimatable) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const displayNum = target % 1 === 0 ? Math.floor(current).toString() : current.toFixed(1);
      setDisplay(`${prefix}${displayNum}${suffix}`);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, isAnimatable, target, prefix, suffix]);

  if (!isAnimatable) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{isInView ? display : `${prefix}0${suffix}`}</span>;
}

/* ── Stagger wrapper ── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Nav links ── */
const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Impact", href: "#impact" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-bold text-white mb-4 tracking-tighter"
        >
          SS<span className="text-blue-500">.</span>
        </motion.div>
        <motion.div className="w-48 h-[2px] bg-zinc-800 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </motion.div>
      </div>
    );
  }

  const featuredProjects = resumeData.projects.filter((p: any) => p.featured);
  const caseStudies = resumeData.projects.filter((p: any) => !p.featured);

  return (
    <main className="relative min-h-screen text-zinc-100 selection:bg-blue-500/30">
      <AnimatedBackground />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* ── Sticky Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold tracking-tighter">
            SS<span className="text-blue-500">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf" download className="text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors flex items-center gap-2">
              <Download size={14} /> Resume
            </a>
          </div>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-zinc-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {navOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
            </svg>
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-black/90 backdrop-blur-xl border-b border-zinc-800 px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setNavOpen(false)} className="block text-sm text-zinc-400 hover:text-white py-2">
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex-1">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded-full border border-blue-500/20">
                @ Entain · BetMGM
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-full border border-emerald-500/20">
                🚀 AI-First PM
              </span>
            </div>
            <h2 className="text-blue-500 font-mono mb-3 text-sm tracking-wider uppercase">Product Manager</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              {resumeData.basics.name.split(" ")[0]}<br />
              <span className="text-zinc-500">{resumeData.basics.name.split(" ")[1]}</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-2 font-medium italic">
              {resumeData.basics.tagline}
            </p>
            <p className="max-w-xl text-base text-zinc-500 mb-8 leading-relaxed">
              {resumeData.basics.summary}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#experience" className="px-8 py-4 bg-white text-black font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all rounded-lg">
                View Experience <ArrowRight size={18} />
              </a>
              <a href="/resume.pdf" download className="px-8 py-4 border border-zinc-700 font-bold flex items-center gap-2 hover:border-white transition-all rounded-lg">
                Resume <Download size={18} />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href={resumeData.basics.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                <LinkedinIcon size={20} />
              </a>
              <a href={resumeData.basics.social.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <GithubIcon size={20} />
              </a>
              <a href={`mailto:${resumeData.basics.email}`} className="text-zinc-500 hover:text-blue-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl shadow-blue-500/10">
              <img src={resumeData.basics.photo} alt={resumeData.basics.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">
              Open to opportunities
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── Metrics Section ── */}
      <section id="impact" className="py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-12">
            <Sparkles className="text-blue-500" />
            <h3 className="text-3xl font-bold">Impact at a Glance</h3>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {resumeData.metrics.map((metric: any, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-all text-center group"
              >
                <h5 className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  <AnimatedCounter value={metric.value} />
                </h5>
                <p className="text-blue-400 text-xs font-mono mb-2">{metric.label}</p>
                <p className="text-zinc-600 text-xs leading-relaxed">{metric.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Experience Section ── */}
      <section id="experience" className="py-20 px-6 md:px-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
            <Briefcase className="text-blue-500" />
            <h3 className="text-3xl font-bold">Career Journey</h3>
          </motion.div>
          <div className="space-y-12">
            {resumeData.experience.map((exp: any, i: number) => (
              <motion.div
                key={i}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group border-l-2 border-zinc-800 hover:border-blue-500/50 pl-8 relative transition-colors"
              >
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all" />
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-sm font-mono text-zinc-500">{exp.dates}</span>
                  <span className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full">{exp.industry}</span>
                </div>
                <h4 className="text-2xl font-bold mt-1 group-hover:text-blue-400 transition-colors">{exp.role}</h4>
                <p className="text-blue-400 font-medium mb-3">{exp.company} — {exp.location}</p>
                {exp.callouts && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.callouts.map((callout: string, ci: number) => (
                      <span key={ci} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs font-mono rounded-md border border-blue-500/20">
                        {callout}
                      </span>
                    ))}
                  </div>
                )}
                <ul className="space-y-2">
                  {exp.highlights.map((bullet: string, bi: number) => (
                    <li key={bi} className="text-zinc-400 text-sm leading-relaxed max-w-3xl flex gap-2">
                      <span className="text-blue-500 mt-1 shrink-0">▸</span> {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" className="py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
            <Award className="text-blue-500" />
            <h3 className="text-3xl font-bold">Selected Work</h3>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {featuredProjects.map((project: any, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="p-8 bg-zinc-950/60 border border-zinc-800 rounded-2xl hover:border-blue-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    {project.company}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{project.description}</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  <span className="text-blue-500 font-semibold">Impact:</span> {project.impact}
                </p>
                {project.metrics && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.map((m: string, mi: number) => (
                      <span key={mi} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, ti: number) => (
                    <span key={ti} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Case Studies */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <h4 className="text-xl font-bold text-zinc-300 mb-6">Case Studies & Research</h4>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((project: any, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="p-6 bg-zinc-950/40 border border-zinc-800/50 rounded-xl hover:border-purple-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold group-hover:text-purple-400 transition-colors">{project.title}</h4>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-purple-400 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <p className="text-purple-400 text-xs font-mono mb-3">{project.company}</p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, ti: number) => (
                    <span key={ti} className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs font-mono rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section id="skills" className="py-20 px-6 md:px-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-12">
            <Globe className="text-blue-500" />
            <h3 className="text-3xl font-bold">Tech Stack & Expertise</h3>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.skillCategories.map((cat: any, i: number) => (
              <motion.div key={i} variants={fadeUp} className="p-6 bg-zinc-950/40 border border-zinc-800/50 rounded-xl">
                <h4 className="text-sm font-mono text-blue-400 mb-4 uppercase tracking-wider">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill: string, si: number) => (
                    <span key={si} className="px-3 py-1.5 bg-zinc-900 text-xs font-mono text-zinc-300 border border-zinc-800 rounded-md hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Education & Certifications ── */}
      <section id="education" className="py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
            <div className="flex items-center gap-4 mb-8">
              <GraduationCap className="text-blue-500" />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            {resumeData.education.map((edu: any, i: number) => (
              <motion.div key={i} whileHover={{ x: 4 }} className="mb-6 p-6 border border-zinc-800 bg-zinc-950/40 rounded-xl hover:border-blue-500/30 transition-all">
                <h5 className="font-bold text-lg">{edu.degree}</h5>
                <p className="text-zinc-400">{edu.institution}</p>
                <p className="text-xs text-blue-500 mt-2 font-mono">{edu.dates} · {edu.location}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
            <div className="flex items-center gap-4 mb-8">
              <Award className="text-blue-500" />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>
            <div className="space-y-3 mb-8">
              {resumeData.certifications.map((cert: string, i: number) => (
                <motion.div key={i} whileHover={{ x: 4 }} className="flex items-center gap-3 p-4 border border-zinc-800 bg-zinc-950/40 rounded-xl hover:border-blue-500/30 transition-all">
                  <Award size={16} className="text-blue-500 shrink-0" />
                  <span className="text-zinc-300 text-sm">{cert}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Globe className="text-blue-500" />
              <h3 className="text-2xl font-bold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {resumeData.languages.map((lang: any, i: number) => (
                <span key={i} className="px-3 py-2 bg-zinc-900 text-sm text-zinc-300 border border-zinc-800 rounded-lg">
                  {lang.language} <span className="text-zinc-500 text-xs">· {lang.proficiency || lang.level}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="contact" className="py-24 px-6 md:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Talk</h3>
            <p className="text-xl text-zinc-400 mb-10">{resumeData.basics.ctaPitch}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href={`mailto:${resumeData.basics.email}`}
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Mail size={18} /> Get in Touch
              </a>
              <a href={resumeData.basics.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 border border-zinc-700 font-bold rounded-lg hover:border-blue-500 transition-all flex items-center gap-2">
                <LinkedinIcon size={18} /> LinkedIn
              </a>
            </div>
            <div className="flex justify-center gap-6 text-zinc-500 text-sm font-mono">
              <span className="flex items-center gap-2"><Mail size={14} /> {resumeData.basics.email}</span>
              <span className="flex items-center gap-2"><Phone size={14} /> {resumeData.basics.phone}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-zinc-900 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href={resumeData.basics.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-blue-400 transition-colors"><LinkedinIcon size={18} /></a>
          <a href={resumeData.basics.social.github} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors"><GithubIcon size={18} /></a>
          <a href={`mailto:${resumeData.basics.email}`} className="text-zinc-600 hover:text-blue-400 transition-colors"><Mail size={18} /></a>
        </div>
        <p className="text-zinc-600 text-xs font-mono">
