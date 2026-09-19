import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollStore } from '../store/useScrollStore'

export default function ContactSection() {
  const sectionRef = useRef(null)
  const emailRef = useRef(null)

  const handleText = "vedant@dev"
  const emailAddress = "vedantshrivastava175@gmail.com"
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.contact

  useGSAP(() => {
    if (!range) return
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.animStart, 
        end: range.animEnd,
        scrub: true,
      }
    })

    // Container fade in and scale gently to 1
    tl.fromTo(sectionRef.current, 
      { opacity: 0, y: 30, scale: 0.96 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
    )

    // Hacker text scramble for "vedant@dev"
    const scrambleObj = { progress: 0 }
    tl.to(scrambleObj, {
      progress: 1,
      duration: 0.5,
      ease: 'none',
      onUpdate: () => {
        if (!emailRef.current) return
        const p = scrambleObj.progress
        const revealCount = Math.floor(p * handleText.length)
        
        let currentText = ""
        for (let i = 0; i < handleText.length; i++) {
          if (i < revealCount) {
            currentText += handleText[i]
          } else {
            currentText += chars[Math.floor(Math.random() * chars.length)]
          }
        }
        emailRef.current.innerText = currentText
      }
    }, "-=0.1")

    // Social links stagger bounce
    tl.fromTo('.social-link', 
      { opacity: 0, y: 30, scale: 0.8 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(1.7)' },
      "-=0.2"
    )

    // Hold at end: keep the card fully displayed and visible until the end of scrolling (no fade-out)
    tl.to({}, { duration: 0.2 })

  }, { scope: sectionRef, dependencies: [range] })

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6"
    >
      {/* Contact Card with luminous border and ambient outer glow */}
      <div className="max-w-2xl w-full pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 sm:p-8 md:p-12 text-center shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 max-h-[85vh] overflow-y-auto sm:overflow-visible">
        <div className="inline-block px-3 py-1 bg-[#3ee6a8]/10 border border-[#3ee6a8]/30 rounded-full text-[10px] sm:text-[11px] font-sans font-bold tracking-widest text-[#3ee6a8] uppercase mb-3 sm:mb-4">
          Get In Touch
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-white mb-3 sm:mb-6">
          Let's Build Something Together
        </h2>
        
        <p className="text-gray-300 font-serif leading-relaxed mb-4 sm:mb-8 max-w-lg mx-auto text-xs sm:text-base md:text-lg">
          Currently open for new opportunities, collaborations, and discussions. Feel free to reach out directly or connect on social platforms!
        </p>

        {/* Scrambled handle animation - non-clickable */}
        <div className="inline-block mb-6 sm:mb-10 select-none pointer-events-none">
          <div 
            ref={emailRef}
            className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-wider"
          >
            {handleText}
          </div>
        </div>

        {/* Social Links Row */}
        <div className="flex justify-center items-center gap-4 sm:gap-6">
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/vedant-shrivastava175/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="social-link w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-300 hover:text-[#3ee6a8] hover:bg-white/10 hover:border-[#3ee6a8] hover:shadow-[0_0_20px_rgba(62,230,168,0.3)] hover:-translate-y-1 transition-all duration-300 pointer-events-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/vedant-175"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="social-link w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-300 hover:text-[#3ee6a8] hover:bg-white/10 hover:border-[#3ee6a8] hover:shadow-[0_0_20px_rgba(62,230,168,0.3)] hover:-translate-y-1 transition-all duration-300 pointer-events-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>

          {/* Direct Email */}
          <a 
            href={`mailto:${emailAddress}`}
            aria-label="Direct Email"
            title={emailAddress}
            className="social-link w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-300 hover:text-[#3ee6a8] hover:bg-white/10 hover:border-[#3ee6a8] hover:shadow-[0_0_20px_rgba(62,230,168,0.3)] hover:-translate-y-1 transition-all duration-300 pointer-events-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      {/* Clean Bottom Footer */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center pointer-events-none px-4">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 uppercase">
          © 2026 <span className="mx-1.5 sm:mx-2">·</span> Built with curiosity <span className="mx-1.5 sm:mx-2">·</span> Vedant Shrivastava
        </p>
      </div>
    </section>
  )
}
