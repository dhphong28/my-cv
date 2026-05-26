import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, Play, Code2, Film, ChevronDown } from 'lucide-react';

function LinkedInMark({ size = 20, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-[3px] border border-current font-sans font-bold leading-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.48 }}
    >
      in
    </span>
  );
}

function getModeFromUrl() {
  if (typeof window === 'undefined') return 'developer';

  const urlMode = new URLSearchParams(window.location.search).get('mode');
  return urlMode === 'editor' ? 'editor' : 'developer';
}

export default function Portfolio() {
  const [mode, setMode] = useState(getModeFromUrl); // 'developer' | 'editor'
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setMode(getModeFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isDev = mode === 'developer';

  const handleModeChange = (nextMode) => (event) => {
    event.preventDefault();
    setMode(nextMode);

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('mode', nextMode);
    window.history.pushState({}, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden"
      style={{
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        cursor: 'none',
      }}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: cursorPos.x - (isHovering ? 24 : 6),
          y: cursorPos.y - (isHovering ? 24 : 6),
          scale: isHovering ? 1 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.3 }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-300 ${isHovering ? 'w-12 h-12' : 'w-3 h-3'
            }`}
        />
      </motion.div>

      {/* Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-sm bg-white/70 border-b border-black/5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase font-medium"
        >
          DHP / Portfolio — 2026
        </motion.div>

        {/* Mode Toggle */}
        <div
          className="relative flex items-center gap-1 border border-black rounded-full p-1"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="absolute top-1 bottom-1 bg-black rounded-full"
            initial={false}
            animate={{
              left: isDev ? '4px' : '50%',
              right: isDev ? '50%' : '4px',
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
          <a
            href="?mode=developer"
            onClick={handleModeChange('developer')}
            aria-current={isDev ? 'page' : undefined}
            className={`relative z-10 px-5 py-2 text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 flex items-center gap-2 ${isDev ? 'text-white' : 'text-black'
              }`}
          >
            <Code2 size={12} />
            Dev
          </a>
          <a
            href="?mode=editor"
            onClick={handleModeChange('editor')}
            aria-current={!isDev ? 'page' : undefined}
            className={`relative z-10 px-5 py-2 text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 flex items-center gap-2 ${!isDev ? 'text-white' : 'text-black'
              }`}
          >
            <Film size={12} />
            Editor
          </a>
        </div>

        <div className="text-xs tracking-[0.3em] uppercase font-medium hidden md:block">
          Ho Chi Minh City
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 pb-20">
        {/* Decorative line numbers */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 text-[10px] tracking-widest text-black/30 font-mono">
          {['001', '002', '003', '004', '005'].map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xs tracking-[0.4em] uppercase mb-8 text-black/60"
            >
              {isDev ? '— Salesforce Developer' : '— Video Editor & Creative'}
            </motion.div>

            <h1
              className="font-serif leading-[0.85] tracking-tight mb-8"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3.5rem, 12vw, 11rem)',
                fontWeight: 300,
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block italic"
              >
                Do Hoai
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block font-normal"
              >
                Phong<span className="text-black/30">.</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-xl text-base md:text-lg leading-relaxed text-black/70 mb-12"
            >
              {isDev
                ? 'A Salesforce Developer with 3+ years architecting custom solutions in Apex, LWC, and Visualforce. I turn complex business processes into clean, scalable systems.'
                : 'A creative Video Editor with 2 years of experience producing promotional, explainer, and recap content. I transform raw footage into stories that move people.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#work"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full text-sm tracking-wider uppercase hover:bg-black/80 transition-all"
              >
                Selected Work
                <ArrowUpRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </a>
              <a
                href="#contact"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="inline-flex items-center gap-3 px-6 py-3 border border-black/20 rounded-full text-sm tracking-wider uppercase hover:border-black transition-all"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 right-8 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-black/40"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>

        {/* Big decorative letter */}
        <div
          className="absolute right-0 bottom-0 pointer-events-none select-none opacity-[0.04]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(20rem, 50vw, 50rem)',
            lineHeight: 0.8,
            fontWeight: 900,
            transform: 'translate(15%, 15%)',
          }}
        >
          {isDev ? 'D' : 'V'}
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-black overflow-hidden py-6 bg-black text-white">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {(isDev
                ? ['Apex', 'LWC', 'SOQL', 'Visualforce', 'REST API', 'Integration', 'Automation', 'Salesforce']
                : ['Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Audition', 'Storytelling', 'Motion Graphics', 'Color']
              ).map((skill, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className="text-3xl md:text-5xl tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif", fontStyle: idx % 2 ? 'italic' : 'normal', fontWeight: 300 }}
                  >
                    {skill}
                  </span>
                  <span className="text-3xl md:text-5xl">✦</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ABOUT */}
      <section className="px-8 md:px-16 py-32 grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-3 sticky top-32">
          <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-2">§ 01</div>
          <h2
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
          >
            About
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-2xl md:text-4xl leading-tight mb-12"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                {isDev ? (
                  <>
                    I build Salesforce solutions that <em className="italic">actually scale</em>. From Apex triggers to LWC interfaces, I bridge complex requirements with clean, maintainable code.
                  </>
                ) : (
                  <>
                    I turn raw footage into <em className="italic">stories that resonate</em>. From promo videos to recaps, every frame is crafted with intention and rhythm.
                  </>
                )}
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 text-sm">
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Experience</div>
                  <div className="text-2xl" style={{ fontFamily: "'Fraunces', serif" }}>
                    {isDev ? '3+' : '2+'} <span className="text-base text-black/60">years</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Based In</div>
                  <div className="text-2xl" style={{ fontFamily: "'Fraunces', serif" }}>
                    Saigon
                  </div>
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Education</div>
                  <div className="text-sm leading-relaxed">
                    B.Eng. Software Engineering<br />
                    HCMC University of Foreign Languages – IT
                  </div>
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Languages</div>
                  <div className="text-sm leading-relaxed">
                    Vietnamese (Native)<br />
                    English ({isDev ? 'Proficient' : 'Conversational'})
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-t border-black/10 px-8 md:px-16 py-32">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-3">
            <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-2">§ 02</div>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}>
              Capabilities
            </h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-px bg-black/10"
          >
            {(isDev
              ? [
                { title: 'Apex Development', desc: 'Triggers, Batch Apex, Asynchronous processing, Test Coverage.' },
                { title: 'Lightning Web Components', desc: 'Reusable components, reactive patterns, Excel-like grids.' },
                { title: 'SOQL & Data Modeling', desc: 'Optimized queries, custom objects, field-level architecture.' },
                { title: 'REST API Integration', desc: 'Callouts, JSON parsing, OAuth, Webhooks (Teams, Google Chat).' },
                { title: 'Visualforce', desc: 'Legacy interface support and custom controllers.' },
                { title: 'Process Automation', desc: 'Flow Builder, Process Builder, business workflow design.' },
              ]
              : [
                { title: 'Video Production', desc: 'Adobe Premiere Pro & After Effects — full editing pipeline.' },
                { title: 'Motion Graphics', desc: 'Dynamic typography, kinetic text, animated overlays.' },
                { title: 'Graphic Design', desc: 'Adobe Photoshop & Illustrator for thumbnails and assets.' },
                { title: 'Audio Post-Production', desc: 'Adobe Audition — mixing, syncing, restoration.' },
                { title: 'Creative Direction', desc: 'Stage choreography, event design, performance arts.' },
                { title: 'Content Strategy', desc: 'Long-form to short-form repurposing for TikTok/Reels.' },
              ]
            ).map((skill, idx) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="bg-white p-8 md:p-12 hover:bg-black hover:text-white transition-colors duration-500 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs tracking-widest font-mono text-black/40 group-hover:text-white/40">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3
                  className="text-2xl md:text-3xl mb-3"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
                >
                  {skill.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* PROJECTS */}
      <section id="work" className="border-t border-black/10 px-8 md:px-16 py-32">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-2">§ 03</div>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}>
              Selected Work
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg md:text-xl leading-relaxed text-black/70" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}>
              {isDev
                ? 'A selection of integrations, UI rebuilds, and platform migrations delivered across enterprise Salesforce environments.'
                : 'A reel of promotional, educational, and ceremonial videos produced for community events and freelance clients.'}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-px bg-black/10"
          >
            {(isDev
              ? [
                { year: '2025', title: 'BORAM', tag: 'Platform Migration', desc: 'Re-engineered a legacy business system onto Salesforce. Designed user-centric LWC interfaces, developed Apex controllers, and optimized the data model to preserve functional integrity while modernizing UX.', stack: ['LWC', 'Apex', 'Data Model'] },
                { year: '2025', title: 'MISO', tag: 'Booking Portal', desc: 'Transformed high-fidelity Figma designs into a fully functional, responsive booking interface. Built reusable LWC components for time scheduling, address selection, and validation — integrated with existing Apex APIs.', stack: ['LWC', 'Figma', 'Apex APIs'] },
                { year: '2024', title: 'NICE D&B', tag: 'Business Intelligence', desc: 'Provided instant financial insights inside Salesforce record pages. Built asynchronous integration with Apex + LWC, using Chart.js to render interactive Bar and Line charts from raw XML/JSON.', stack: ['Apex', 'LWC', 'Chart.js'] },
                { year: '2023', title: 'Chatter Notification Integration', tag: 'Integration', desc: 'Bridged Salesforce Chatter with Microsoft Teams and Google Chat via Apex Triggers + HTTP Callouts. Engineered secure JSON payloads for real-time delivery, centralizing notifications in users\' active workspaces.', stack: ['Apex Triggers', 'Webhooks', 'REST API'] },
              ]
              : [
                {
                  year: '2024',
                  title: 'Summer Camp Promotional Video',
                  tag: 'Promotional',
                  desc: 'High-energy promo showcasing camp facilities and activities. Integrated clear CTA graphics and registration tutorials, resulting in a significant increase in sign-ups.',
                  stack: ['Premiere Pro', 'After Effects', 'Motion Graphics'],
                  url: 'https://youtu.be/6W8wniO22UM?si=gqSFKRmIvJxw6OcJ',
                },
                {
                  year: '2023',
                  title: '"What to Pack for Camp" ',
                  tag: 'Informational',
                  desc: 'Creative series guiding participants through camp prep. 2023 featured an interactive "Mystery Box" game;',
                  stack: ['Premiere Pro', 'Gamification', 'Series Design'],
                  url: 'https://youtu.be/oS1KGJrHpfA?si=Ih1XOuGmFIFBHWhW',
                },
                {
                  year: '2023',
                  title: '"Religious Terminology" Explainer',
                  tag: 'Educational',
                  desc: 'Educational piece clarifying complex religious and cultural terms through engaging storytelling. Combined historical research with modern visual transitions to make academic content accessible.',
                  stack: ['Research', 'Storytelling', 'Editing'],
                  url: 'https://youtu.be/OoVqYA64Bqg?si=JbI3702kNBc1CD5K',
                },
                {
                  year: '2023',
                  title: 'Summer Camp Recap',
                  tag: 'Cinematic Recap',
                  desc: 'Cinematic recap blending dynamic action shots with reflective moments. Music and visuals synchronized to evoke camaraderie and spiritual growth.',
                  stack: ['Premiere Pro', 'Sound Design', 'Color'],
                  url: 'https://youtu.be/geGen08duAQ?si=NdpPQjxQ_3_vbwYF',
                },
                {
                  year: '2026',
                  title: 'Medical Short-Form (Freelance)',
                  tag: 'Short-Form / Social',
                  desc: 'Repurposed long-form medical livestreams into engaging TikTok/Reels/Shorts. Dynamic typography and motion graphics made complex health topics accessible.',
                  stack: ['Premiere Pro', 'After Effects', 'TikTok / Reels'],
                  url: '',
                },
              ]
            ).map((project, idx) => {
              const ProjectCard = project.url ? motion.a : motion.article;

              return (
                <ProjectCard
                  key={project.title}
                  {...(project.url
                    ? {
                      href: project.url,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': `Open ${project.title} on YouTube`,
                    }
                    : {})}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`bg-white group relative block overflow-hidden ${project.url ? 'cursor-pointer' : 'cursor-default'
                    }`}
                >
                  <div className="grid md:grid-cols-12 gap-6 px-2 md:px-8 py-10 items-baseline relative z-10 transition-colors duration-700 group-hover:text-white">
                    <div className="md:col-span-1 text-xs tracking-widest font-mono text-black/40 group-hover:text-white/60 transition-colors duration-700">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-xs tracking-[0.2em] uppercase text-black/40 group-hover:text-white/60 transition-colors duration-700 mb-1">
                        {project.year}
                      </div>
                      <div className="text-xs tracking-[0.2em] uppercase text-black/60 group-hover:text-white transition-colors duration-700">
                        {project.tag}
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <h3
                        className="text-3xl md:text-5xl mb-3 leading-none"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-md">
                        {project.desc}
                      </p>
                    </div>
                    <div className="md:col-span-3 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1 border border-current rounded-full opacity-70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {/* <div className="md:col-span-1 flex justify-end">
                    <motion.div
                      className="w-12 h-12 rounded-full border border-current flex items-center justify-center"
                      whileHover={{ rotate: 45 }}
                    >
                      {isDev ? <ArrowUpRight size={18} /> : <Play size={16} className="ml-0.5" />}
                    </motion.div>
                  </div> */}
                    <div className="md:col-span-1 flex justify-end">
                      {!isDev && (
                        <motion.div
                          className="w-12 h-12 rounded-full border border-current flex items-center justify-center"
                          whileHover={{ rotate: 45 }}
                        >
                          <Play size={16} className="ml-0.5" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  {/* Hover Black overlay */}
                  <div className="absolute inset-0 bg-black -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />
                </ProjectCard>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className="border-t border-black/10 px-8 md:px-16 py-32 bg-black text-white">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <div className="text-xs tracking-[0.3em] uppercase text-white/40 mb-2">§ 04</div>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}>
              Experience
            </h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-px"
          >
            {(isDev
              ? [
                { period: '05/2022 — Present', role: 'Salesforce Developer', company: 'DAEU Nextier GDC Vietnam', desc: 'Designed and implemented advanced Salesforce solutions using Apex, LWC, and Visualforce. Built integrations with Microsoft Teams and Google Chat via REST API and Webhooks. Created Excel-like grid components in LWC to improve data entry efficiency.' },
                { period: '2021', role: 'Salesforce Developer Intern', company: 'Capgemini', desc: 'Gained hands-on experience developing custom Salesforce applications using Apex and Visualforce.' },
              ]
              : [
                { period: '05/2022 — Present', role: 'Media Producer & Creative Lead', company: 'Hanh Thong Tay Church', desc: 'Full-cycle video production: promotional, educational, interview, and recap content. Orchestrated large-scale seasonal shows (Mid-Autumn Festival, Christmas) from scriptwriting to stage coordination. Served as lead choreographer and dancer.' },
                { period: '01/2026 — 02/2026', role: 'Freelance Video Editor', company: 'Private Medical Professional', desc: 'Repurposed long-form medical livestreams into engaging short-form videos (TikTok / Reels / Shorts). Applied dynamic typography and motion graphics to make complex health topics accessible.' },
              ]
            ).map((exp, idx) => (
              <motion.div
                key={exp.role + idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="grid md:grid-cols-12 gap-6 py-10 border-t border-white/10 items-baseline"
              >
                <div className="md:col-span-3 text-xs tracking-[0.2em] uppercase text-white/50 font-mono">
                  {exp.period}
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl md:text-2xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}>
                    {exp.role}
                  </h3>
                  <div className="text-sm text-white/60 mt-1 italic">{exp.company}</div>
                </div>
                <div className="md:col-span-6 text-sm leading-relaxed text-white/70">
                  {exp.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CERTIFICATIONS */}
      <section className="border-t border-black/10 px-8 md:px-16 py-32">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-3">
            <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-2">§ 05</div>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}>
              Certifications
            </h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(isDev
              ? [
                'Salesforce Certified Platform Developer I',
                'Salesforce Certified Administrator',
                'Salesforce Certified Platform App Builder',
                'Salesforce Certified Sales Cloud Consultant',
              ]
              : [
                'Adobe Premiere Pro Video Editing Course — Keyframe Multimedia School (Apr 2023)',
              ]
            ).map((cert, idx) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="p-8 border border-black/15 rounded-sm hover:bg-black hover:text-white transition-colors duration-500 group"
              >
                <div className="text-xs tracking-widest font-mono text-black/40 group-hover:text-white/60 mb-6">
                  CERT / {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="text-lg leading-snug" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}>
                  {cert}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-black/10 px-8 md:px-16 py-40 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-12 pointer-events-none select-none opacity-[0.06]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(15rem, 35vw, 35rem)',
            lineHeight: 0.8,
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          hello.
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">§ 06 — Let's Talk</div>
          <h2
            className="leading-[0.9] mb-12"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 300,
            }}
          >
            Have a project<br />
            <em className="italic">in mind?</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
            <a
              href="mailto:phong.28do@gmail.com"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group flex items-start gap-4 p-6 border border-black/15 rounded-sm hover:bg-black hover:text-white transition-colors duration-500"
            >
              <Mail size={20} className="mt-1 flex-shrink-0" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-black/40 group-hover:text-white/60 mb-2">Email</div>
                <div className="text-base">phong.28do@gmail.com</div>
              </div>
              <ArrowUpRight size={18} className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="tel:+84898982811"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group flex items-start gap-4 p-6 border border-black/15 rounded-sm hover:bg-black hover:text-white transition-colors duration-500"
            >
              <Phone size={20} className="mt-1 flex-shrink-0" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-black/40 group-hover:text-white/60 mb-2">Phone</div>
                <div className="text-base">+84 898 982 811</div>
              </div>
              <ArrowUpRight size={18} className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://linkedin.com/in/phongdo28/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group flex items-start gap-4 p-6 border border-black/15 rounded-sm hover:bg-black hover:text-white transition-colors duration-500"
            >
              <LinkedInMark size={20} className="mt-1 flex-shrink-0" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-black/40 group-hover:text-white/60 mb-2">LinkedIn</div>
                <div className="text-base">linkedin.com/in/phongdo28/</div>
              </div>
              <ArrowUpRight size={18} className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <div className="flex items-start gap-4 p-6 border border-black/15 rounded-sm">
              <MapPin size={20} className="mt-1 flex-shrink-0" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Location</div>
                <div className="text-base">Go Vap District<br />Ho Chi Minh City, VN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-8 md:px-16 py-8 flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.2em] uppercase text-black/50">
        <div>© 2026 Do Hoai Phong</div>
        <div className="font-mono">Designed & built with intent.</div>
        <div>
          {isDev ? 'Currently / Salesforce Developer' : 'Currently / Video Editor'}
        </div>
      </footer>

      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter+Tight:wght@300;400;500;600&display=swap');
        * { cursor: none; }
        a, button { cursor: none; }
        @media (max-width: 768px) {
          * { cursor: auto !important; }
        }
      `}</style>
    </div>
  );
}
