"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ArrowRight, Download, Briefcase, Award, GraduationCap, Globe } from "lucide-react";
import resumeData from "@/data/resume.json";

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-bold text-white mb-4 tracking-tighter"
        >
          SS<span className="text-blue-500">.</span>
        </motion.div>
        <motion.div className="w-48 h-[2px] bg-zinc-800 relative overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, repeat: 0 }}
            className="absolute top-0 left-0 h-full w-full bg-blue-500"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen text-zinc-100 selection:bg-blue-500/30">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-blue-500 font-mono mb-4">Product Manager</h2>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            {resumeData.basics.name.split(" ")[0]}<br />
            <span className="text-zinc-500">{resumeData.basics.name.split(" ")[1]}</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-400 mb-8 leading-relaxed">
            {resumeData.basics.summary}
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all">
              View Experience <ArrowRight size={18} />
            </button>
            <a href="/resume.pdf" download className="px-8 py-4 border border-zinc-800 font-bold flex items-center gap-2 hover:border-white transition-all">
              Resume <Download size={18} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 md:px-24 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-16">
          <Briefcase className="text-blue-500" />
          <h3 className="text-3xl font-bold italic">PROFESSIONAL ARC</h3>
        </div>
        <div className="space-y-12">
          {resumeData.experience.map((exp: any, i: number) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="group border-l-2 border-zinc-800 pl-8 relative"
            >
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 group-hover:scale-150 transition-transform" />
              <span className="text-sm font-mono text-zinc-500">{exp.dates}</span>
              <h4 className="text-2xl font-bold mt-1">{exp.role}</h4>
              <p className="text-blue-400 font-medium mb-4">{exp.company} — {exp.location}</p>
              <ul className="space-y-3">
                {exp.highlights.map((bullet: string, bi: number) => (
                  <li key={bi} className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
                    • {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact/Achievements Section */}
      <section className="py-24 px-6 md:px-24">
        <div className="flex items-center gap-4 mb-16">
          <Award className="text-blue-500" />
          <h3 className="text-3xl font-bold italic">KEY IMPACTS</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-colors">
            <h5 className="text-4xl font-bold text-white mb-2">100%</h5>
            <p className="text-zinc-500 text-sm">Regulatory alignment across jurisdictions in gaming products.</p>
          </div>
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-colors">
            <h5 className="text-4xl font-bold text-white mb-2">A/B</h5>
            <p className="text-zinc-500 text-sm">Testing driven measurable lift in user engagement and conversion rates.</p>
          </div>
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-colors">
            <h5 className="text-4xl font-bold text-white mb-2">AI</h5>
            <p className="text-zinc-500 text-sm">Leveraged Amazon Q to streamline SDLC and enhance collaboration.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 md:px-24 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-16">
          <Briefcase className="text-blue-500" />
          <h3 className="text-3xl font-bold italic">PROJECTS</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.projects.map((project: any, i: number) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 bg-zinc-950/60 border border-zinc-800 rounded-2xl hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h4>
                <span className={`text-xs font-mono px-2 py-1 rounded shrink-0 ml-2 ${project.type === "Professional" ? "bg-green-500/10 text-green-400" : "bg-purple-500/10 text-purple-400"}`}>
                  {project.type}
                </span>
              </div>
              <p className="text-blue-400 text-sm font-mono mb-4">{project.company}</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{project.description}</p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                <span className="text-blue-500 font-semibold">Impact:</span> {project.impact}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, ti: number) => (
                  <span key={ti} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education & Identity */}
      <section className="py-24 px-6 md:px-24 grid md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <GraduationCap className="text-blue-500" />
            <h3 className="text-2xl font-bold">EDUCATION</h3>
          </div>
          {resumeData.education.map((edu: any, i: number) => (
            <div key={i} className="mb-6 p-6 border border-zinc-900 bg-zinc-950/40">
              <h5 className="font-bold">{edu.degree}</h5>
              <p className="text-zinc-500">{edu.institution}</p>
              <p className="text-xs text-blue-500 mt-2 font-mono">{edu.dates}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Globe className="text-blue-500" />
            <h3 className="text-2xl font-bold">IDENTITY & SKILLS</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {resumeData.skills.map((skill: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-zinc-900 text-xs font-mono text-zinc-400 border border-zinc-800">
                {skill}
              </span>
            ))}
          </div>
          <div className="text-xs text-zinc-600 font-mono uppercase tracking-widest leading-loose">
            Nationality: {resumeData.basics.personal_details.nationality} | Place of Birth: {resumeData.basics.personal_details.place_of_birth}
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-bold mb-4">CERTIFICATIONS</h4>
            <div className="space-y-2">
              {resumeData.certifications.map((cert: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Award size={14} className="text-blue-500 shrink-0" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-900 text-center text-zinc-500 text-sm font-mono">
        {resumeData.basics.email} — {resumeData.basics.phone}
      </footer>
    </main>
  );
}
