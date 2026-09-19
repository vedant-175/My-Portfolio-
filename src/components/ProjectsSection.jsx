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
    // We don't pin anymore, we just map animation to exact pixel range!
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.animStart, 
        end: range.animEnd,
        scrub: true,
      }
    })
    // 1. Initial State for all slots
    gsap.set('.project-slot', { opacity: 0, scale: 0.95, y: 50, z: -100 })
    gsap.set('.project-brackets > div', { width: 0, height: 0 })
    
    // Card sequence logic
    const slots = gsap.utils.toArray('.project-slot')
    
    slots.forEach((slot, i) => {
      // a. Card frame corner-brackets draw in first
      tl.to(slot.querySelectorAll('.project-brackets > div'), {
        width: 24,
        height: 24,
        duration: 0.5,
        ease: 'power2.out'
      })
      
      // b. Card content fades/slides up into frame
      tl.to(slot, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        z: 0,
        duration: 1, 
        ease: 'power2.out' 
      }, "-=0.3")
      
      // c. Hold for reading (Reduced by 50%)
      tl.to({}, { duration: 0.8 })
      
      // d. Card exits - recede + fade out (now applies to all cards, including the last)
      tl.to(slot, {
        opacity: 0,
        scale: 0.9,
        z: -200,
        duration: 1,
        ease: 'power2.in'
      })
    })

    // Add extra buffer at the end of the timeline
    tl.to({}, { duration: 0.5 })

  }, { scope: sectionRef, dependencies: [range] })

  const projects = [
    {
      title: 'Smart Internship Portal',
      description: 'A centralized internship platform connecting students and recruiters, with an AI-powered ATS resume scoring engine.',
      status: 'LIVE',
      tagline: 'Connect & Hire',
      link: 'https://internship-portal-experimental.vercel.app/',
      features: [
        'Role-based auth',
        'Internship posting & application tracking',
        'Resume uploads',
        'AI-powered recommendations/profile analysis'
      ],
      stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Groq API']
    },
    {
      title: 'AI Resume Builder',
      description: 'An AI-powered resume creation platform for generating and customizing professional resumes.',
      status: 'LIVE',
      tagline: 'Craft your career',
      link: 'https://ai-resume-builder-backend-czwm.onrender.com/',
      features: [
        'AI-generated summaries & skills',
        'Live preview',
        'Customizable templates',
        'PDF export'
      ],
      stack: ['React', 'Node.js', 'Express', 'Groq API']
    }
  ]

  return (
    <section ref={sectionRef} id="projects" className="relative w-full h-screen flex items-center justify-center pointer-events-none px-4 sm:px-6 md:px-[10%] perspective-[1000px]">
      <div className="relative w-full h-[520px] sm:h-[600px] pointer-events-auto" style={{ transformStyle: 'preserve-3d' }}>
        {projects.map((project, idx) => (
          <div key={idx} className={`project-slot absolute inset-y-0 ${idx % 2 === 0 ? 'sm:left-[5%]' : 'sm:right-[5%] sm:left-auto'} left-0 right-0 mx-auto sm:mx-0 w-[92vw] sm:w-full max-w-lg flex flex-col justify-center gap-3 sm:gap-6`}>
            
            <div className="project-card relative bg-[#0a0a0a] backdrop-blur-xl border border-white/5 p-5 sm:p-8 shadow-2xl flex flex-col">
              
              {/* Corner Brackets */}
              <div className="project-brackets absolute inset-0 pointer-events-none mix-blend-screen">
                <div className="absolute top-0 left-0 border-t border-l border-white/40"></div>
                <div className="absolute top-0 right-0 border-t border-r border-white/40"></div>
                <div className="absolute bottom-0 left-0 border-b border-l border-white/40"></div>
                <div className="absolute bottom-0 right-0 border-b border-r border-white/40"></div>
              </div>

              {/* Browser Chrome Mockup */}
              <div className="flex gap-2 mb-4 sm:mb-8 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>

              {/* Large Display Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-3 sm:mb-4">
                {project.tagline}
              </h3>
              
              {/* Status Label & Live Link */}
              <div className="flex items-center justify-between mb-4 sm:mb-8">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/5 border border-white/10 rounded text-[9px] sm:text-[10px] font-sans font-bold tracking-widest text-[#3ee6a8] uppercase">
                  {project.status}
                </span>
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/5 hover:bg-[#3ee6a8]/20 border border-white/10 hover:border-[#3ee6a8]/50 rounded text-xs font-sans text-gray-300 hover:text-[#3ee6a8] transition-all group/btn"
                  >
                    <span>Visit Project</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
              
              {/* Italic Display Serif Title with Link */}
              {project.link ? (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-serif italic text-gray-400 hover:text-white mb-4 sm:mb-8 border-l border-white/10 hover:border-[#3ee6a8] pl-3 sm:pl-4 transition-colors"
                >
                  <span>{project.title}</span>
                  <span className="text-xs font-sans not-italic text-[#3ee6a8] opacity-70 group-hover/title:opacity-100 transition-opacity">↗</span>
                </a>
              ) : (
                <h4 className="text-lg sm:text-xl md:text-2xl font-serif italic text-gray-400 mb-4 sm:mb-8 border-l border-white/10 pl-3 sm:pl-4">
                  {project.title}
                </h4>
              )}
              
              <div className="mb-4 sm:mb-8 hidden sm:block">
                <h5 className="text-[10px] font-sans uppercase tracking-widest text-gray-500 font-bold mb-3">Key Features</h5>
                <ul className="list-disc list-inside text-sm text-gray-300 font-serif space-y-2">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-gray-500 font-bold mb-2 sm:mb-3">Tech Stack</h5>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.stack.map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded text-[9px] sm:text-[10px] font-sans text-gray-300 uppercase tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description below card frame */}
            <p className="project-desc text-gray-400 font-serif italic text-xs sm:text-base md:text-lg px-2">
              {project.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  )
}
