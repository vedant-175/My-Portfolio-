import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from '../utils/SplitText'
import { useScrollStore } from '../store/useScrollStore'

export default function HeroSection() {
  const sectionRef = useRef(null)

  const scrollTo = (id) => {
    const range = useScrollStore.getState().ranges[id]
    if (range) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: range.navTarget,
        ease: 'power3.inOut'
      })
    }
  }

  const fonts = ['font-sans', 'font-serif', 'font-mono', 'font-oswald', 'font-abril', 'font-cinzel']
  const [fontIndex, setFontIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          intervalRef.current = setInterval(() => {
            gsap.to('.hero-title', {
              opacity: 0.3,
              duration: 0.02,
              onComplete: () => {
                setFontIndex((prev) => (prev + 1) % fonts.length)
                gsap.to('.hero-title', { opacity: 1, duration: 0.05 })
              }
            })
          }, 500)
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      },
      { threshold: 0.1 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      observer.disconnect()
    }
  }, [])

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.hero

  useGSAP(() => {
    if (!range) return
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.start, // Start immediately on load
        end: range.end,
        scrub: true,
      }
    })

    // Entry animation (happens on initial load, not scrubbed)
    // Wait, the prompt says "Every section gets its own GSAP ScrollTrigger timeline scoped to its z-range, scrub: true"
    // Since Hero is at the very top (z-range start), we can animate it IN immediately on load, and scrub it OUT as we scroll down.
    
    // Initial Load Timeline
    const introTl = gsap.timeline()
    
    // Avatar pop in
    introTl.fromTo('.hero-avatar',
      { opacity: 0, scale: 0.5, y: -20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.7)' },
      0
    )

    // Letters fly in from random 3D offsets
    introTl.fromTo('.hero-title .split-char', 
      { 
        opacity: 0, 
        z: () => gsap.utils.random(-400, 400),
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-200, 200),
        rotationX: () => gsap.utils.random(-180, 180),
        rotationY: () => gsap.utils.random(-180, 180)
      },
      {
        opacity: 1,
        z: 0, x: 0, y: 0,
        rotationX: 0, rotationY: 0,
        duration: 1.5,
        stagger: 0.03,
        ease: 'power3.out'
      },
      0.2
    )

    // Tagline slide up with perspective tilt
    introTl.fromTo('.hero-tagline',
      { opacity: 0, y: 50, rotationX: -45, transformPerspective: 500 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    
    introTl.fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )

    // CTA buttons scale with elastic ease
    introTl.fromTo('.hero-cta',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'elastic.out(1, 0.5)' },
      "-=0.5"
    )

    // Scrub out timeline as we scroll down
    tl.to(sectionRef.current, {
      opacity: 0,
      z: -200, // Move back into the helix
      rotationZ: 5, // Slight twist reacting to helix
      ease: 'none'
    })

  }, { scope: sectionRef, dependencies: [range] })

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none perspective-[1000px]">
      <div className="text-center z-10 flex flex-col items-center mt-[-2vh] sm:mt-[-4vh] max-w-4xl px-4 sm:px-6 w-full" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Profile Picture Avatar */}
        <div className="hero-avatar mb-4 sm:mb-5 relative group pointer-events-auto">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-tr from-[#3ee6a8] via-white/50 to-[#3ee6a8]/30 shadow-[0_0_30px_rgba(62,230,168,0.3)] transition-transform duration-500 group-hover:scale-105">
            <img 
              src="/profile.jpg" 
              alt="Vedant Shrivastava" 
              className="w-full h-full object-cover object-[center_15%] rounded-full"
            />
          </div>
        </div>

        <h1 className={`hero-title text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight sm:leading-none tracking-tighter text-white uppercase select-none pointer-events-none mb-3 sm:mb-4 px-2 sm:whitespace-nowrap ${fonts[fontIndex]}`}>
          <SplitText text="Vedant Shrivastava" type="chars" />
        </h1>
        
        <div className="mt-4 sm:mt-8 flex flex-col items-center gap-4 sm:gap-6 w-full" id="hero-reveal">
          <div className="hero-sub text-xs sm:text-sm md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 uppercase pointer-events-auto flex flex-wrap justify-center items-center gap-1 sm:gap-2 px-2 text-center">
            <span>Computer Science & Engineering</span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span>Full-Stack Developer</span>
          </div>
          
          <p className="hero-tagline font-serif italic text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl pointer-events-auto px-4 text-center leading-relaxed">
            Computer Science Engineering student focused on building practical software products, full-stack web applications, and AI-powered experiences.
          </p>
          
          <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-6 pointer-events-auto w-full sm:w-auto px-6 sm:px-0 max-w-xs sm:max-w-none">
            <button 
              onClick={() => scrollTo('projects')}
              className="hero-cta w-full sm:w-auto px-7 py-3 bg-white text-black font-semibold tracking-wider uppercase text-xs sm:text-sm rounded-full hover:bg-gray-200 transition-colors text-center"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="hero-cta w-full sm:w-auto px-7 py-3 bg-transparent border border-gray-600 text-white font-semibold tracking-wider uppercase text-xs sm:text-sm rounded-full hover:border-white transition-colors text-center"
            >
              Contact Me
            </button>
          </div>
        </div>
        
      </div>
      
      {/* Scroll hint */}
      <div className="absolute bottom-6 sm:bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
        <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>
    </section>
  )
}
