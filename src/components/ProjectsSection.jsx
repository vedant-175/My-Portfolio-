import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollStore } from '../store/useScrollStore'

export default function ProjectsSection() {
  const sectionRef = useRef(null)

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.projects

  useGSAP(() => {
    if (!range) return
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.animStart, 
        end: range.animEnd,
        scrub: true,
      }
    })

    // Container fades and slides up cleanly
    tl.fromTo(sectionRef.current, 
      { opacity: 0, y: 30, scale: 0.98 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
    )

    // Corner brackets draw in
    tl.to('.project-brackets > div', {
      width: 20,
      height: 20,
      duration: 0.15,
      ease: 'power2.out'
    }, "-=0.1")

    // Hold both cards fully visible for reading
    tl.to({}, { duration: 0.65 })

    // Exit before next section
    tl.to(sectionRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: 'power2.in'
    })

  }, { scope: sectionRef, dependencies: [range] })

  const projects = [
    {
      title: 'Smart Internship Portal',
      description: 'A centralized internship platform connecting students and recruiters, with an AI-powered ATS resume scoring engine.',
      status: 'LIVE',
      tagline: 'Connect & Hire',
      link: 'https://internship-portal-experimental.vercel.app/',
      features: [
        'Role-based auth (Student/Recruiter)',
        'Internship posting & application tracking',
        'Resume uploads & ATS scoring',
        'AI recommendations & profile analysis'
      ],
      stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Groq API']
    },
    {
      title: 'AI Resume Builder',
      description: 'An AI-powered resume creation platform for generating and customizing professional, job-winning resumes.',
      status: 'LIVE',
      tagline: 'Craft your career',
      link: 'https://ai-resume-builder-backend-czwm.onrender.com/',
      features: [
        'AI-generated summaries & tailored skills',
        'Real-time interactive live preview',
        'Customizable professional templates',
        'One-click high-res PDF export'
      ],
      stack: ['React', 'Node.js', 'Express', 'Groq API', 'TailwindCSS']
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Header */}
      <div className="text-center mb-4 sm:mb-6 pointer-events-auto">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans text-[#3ee6a8] font-bold px-3.5 py-1 rounded-full bg-[#3ee6a8]/10 border border-[#3ee6a8]/20 backdrop-blur-md">
          Featured Work
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white mt-2">
          Projects
        </h2>
      </div>

      {/* 2-Column Grid displaying BOTH projects simultaneously */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pointer-events-auto max-h-[78vh] overflow-y-auto sm:overflow-visible">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="project-card relative bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/20 p-5 sm:p-6 rounded-xl shadow-2xl flex flex-col justify-between hover:border-[#3ee6a8]/50 transition-all duration-300 group"
          >
            {/* Corner Brackets */}
            <div className="project-brackets absolute inset-0 pointer-events-none mix-blend-screen rounded-xl overflow-hidden">
              <div className="absolute top-0 left-0 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 border-b border-r border-white/40"></div>
            </div>

            <div>
              {/* Browser Dots & Live Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1.5 opacity-60">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#3ee6a8]/10 border border-[#3ee6a8]/30 rounded text-[9px] font-sans font-bold tracking-widest text-[#3ee6a8] uppercase">
                    {project.status}
                  </span>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-[#3ee6a8]/20 border border-white/10 hover:border-[#3ee6a8]/50 rounded text-xs font-sans text-gray-300 hover:text-[#3ee6a8] transition-all"
                      title="Open Live App"
                    >
                      <span>Visit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Tagline & Title as Clickable Link */}
              <div className="mb-2">
                {project.link ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 group/title text-xl sm:text-2xl font-serif text-white hover:text-[#3ee6a8] transition-colors cursor-pointer pointer-events-auto"
                  >
                    <span>{project.title}</span>
                    <span className="text-sm font-sans text-[#3ee6a8] opacity-75 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all">↗</span>
                  </a>
                ) : (
                  <h3 className="text-xl sm:text-2xl font-serif text-white">
                    {project.title}
                  </h3>
                )}
                <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mt-0.5 font-semibold">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-300 font-serif italic text-xs sm:text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Key Features */}
              <div className="mb-4">
                <h4 className="text-[10px] font-sans uppercase tracking-widest text-gray-400 font-bold mb-2">
                  Key Capabilities
                </h4>
                <ul className="space-y-1 text-xs text-gray-300 font-sans">
                  {project.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <span className="text-[#3ee6a8] text-xs">▹</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack & Direct Action Button */}
            <div className="pt-3 border-t border-white/10 relative z-10">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.stack.map((tech, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-sans text-gray-300 uppercase tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white/5 hover:bg-[#3ee6a8] text-gray-300 hover:text-black border border-white/10 hover:border-[#3ee6a8] rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer group/btn"
                >
                  <span>Launch {project.title}</span>
                  <span className="text-sm group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">↗</span>
                </a>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
