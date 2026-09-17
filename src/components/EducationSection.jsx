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

    // Prepare path for drawing
    const path = document.querySelector('.education-border-path')
    if (path) {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      
      tl.to(path, { strokeDashoffset: 0, duration: 1, ease: 'none' })
    }

    // Fade in content while border draws
    tl.fromTo('.education-content', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.5)

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

    // Hold it still so the user can read it (Reduced)
    tl.to({}, { duration: 0.5 })

    // Fade out everything at the end
    tl.to(sectionRef.current, { opacity: 0, duration: 0.2 })

  }, { scope: sectionRef, dependencies: [range] })

  return (
    <section ref={sectionRef} id="education" className="relative w-full h-screen flex items-center justify-center pointer-events-none px-6 overflow-hidden">
      
      {/* Floating Adjectives */}
      <div className="floating-adj-edu absolute top-[20%] left-[10%] font-serif italic text-white/10 text-3xl sm:text-5xl pointer-events-none z-0">Focus</div>
      <div className="floating-adj-edu absolute bottom-[20%] right-[5%] font-serif italic text-white/10 text-2xl sm:text-4xl pointer-events-none z-0">Iteration</div>
      
      <div className="max-w-3xl w-full relative pointer-events-auto group z-10">
        
        {/* SVG Border Sketch */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect 
            className="education-border-path"
            x="0" y="0" width="100%" height="100%" 
            rx="16" ry="16"
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            strokeOpacity="0.8"
          />
        </svg>

        {/* Content Card */}
        <div className="education-content relative z-10 bg-black/60 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-black uppercase tracking-widest text-white">
              Education
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-serif italic text-white tracking-wide">
              Lovely Professional University (LPU)
            </h3>
            <div className="text-[#3ee6a8] font-sans font-bold tracking-widest uppercase text-xs mb-4 mt-2">
              B.Tech in Computer Science and Engineering
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-400 text-sm font-sans mb-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>2024 - 2028</span>
              </div>
              <span className="hidden sm:block">|</span>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Punjab, India</span>
              </div>
            </div>
            
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/20 rounded-md self-start font-sans">
              <span className="text-gray-400 uppercase tracking-widest text-xs mr-2">CGPA</span>
              <span className="text-xl font-bold text-white">8.54</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
