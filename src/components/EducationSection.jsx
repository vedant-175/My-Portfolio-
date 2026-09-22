import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollStore } from '../store/useScrollStore'

export default function EducationSection() {
  const sectionRef = useRef(null)

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.education

  useGSAP(() => {
    if (!range) return
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.animStart, 
        end: range.animEnd,
        scrub: true,
      }
    })

    // Entire section fades and slides up smoothly - always guaranteed visible
    tl.fromTo(sectionRef.current, 
      { opacity: 0, y: 25, scale: 0.98 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
    )

    // Floating adjectives fade in
    tl.fromTo('.floating-adj-edu', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)

    // Independent drift animation for adjectives
    gsap.to('.floating-adj-edu', {
      y: '-=15',
      x: '-=10',
      duration: 3 + Math.random(),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.5,
        from: 'random'
      }
    })

    // Hold content fully visible and readable for the vast majority of the section
    tl.to({}, { duration: 0.65 })

    // Fade out cleanly as user leaves
    tl.to(sectionRef.current, { opacity: 0, y: -20, duration: 0.15, ease: 'power2.in' })

  }, { scope: sectionRef, dependencies: [range] })

  return (
    <section 
      ref={sectionRef} 
      id="education" 
      className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 overflow-hidden"
    >
      {/* Floating Adjectives */}
      <div className="floating-adj-edu absolute top-[20%] left-[10%] font-serif italic text-white/5 sm:text-white/10 text-2xl sm:text-5xl pointer-events-none z-0 hidden sm:block">Focus</div>
      <div className="floating-adj-edu absolute bottom-[20%] right-[5%] font-serif italic text-white/5 sm:text-white/10 text-2xl sm:text-4xl pointer-events-none z-0 hidden sm:block">Iteration</div>
      
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-6 pointer-events-auto">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans text-[#3ee6a8] font-bold px-3.5 py-1 rounded-full bg-[#3ee6a8]/10 border border-[#3ee6a8]/20 backdrop-blur-md">
          Academic Background
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white mt-2">
          Education
        </h2>
      </div>

      {/* Content Card */}
      <div className="max-w-2xl w-full relative pointer-events-auto group z-10 mx-auto">
        <div className="education-content relative z-10 bg-[#0a0a0a]/85 backdrop-blur-xl rounded-2xl p-6 sm:p-10 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20 group-hover:border-[#3ee6a8]/50 transition-all duration-300">
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3ee6a8] shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif italic text-white tracking-wide">
                Lovely Professional University (LPU)
              </h3>
              <div className="text-[#3ee6a8] font-sans font-bold tracking-widest uppercase text-xs mt-1">
                B.Tech in Computer Science and Engineering
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-300 text-sm font-sans pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#3ee6a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>2024 – 2028</span>
              </div>
              <span className="hidden sm:block text-gray-600">|</span>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#3ee6a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Punjab, India</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/5 border border-white/20 rounded-lg font-sans">
                <span className="text-gray-400 uppercase tracking-widest text-xs font-semibold">CGPA</span>
                <span className="text-xl font-bold text-white">8.54</span>
              </div>
              <span className="text-xs text-gray-400 font-sans">Strong foundations in Data Structures, Algorithms, Full-Stack Development & AI</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
