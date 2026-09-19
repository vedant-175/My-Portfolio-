import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from '../utils/SplitText'
import { useScrollStore } from '../store/useScrollStore'

export default function AboutSection() {
  const sectionRef = useRef(null)

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.about

  useGSAP(() => {
    if (!range) return
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.animStart, 
        end: range.animEnd,
        scrub: true,
      }
    })

    // Container fades in/out quickly so it's fully visible
    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 })
    
    // Quick fade in for words
    tl.fromTo('.about-paragraph .split-word',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.2, stagger: 0.01, ease: 'power2.out' }
    )
    
    // Floating adjectives fade in
    tl.fromTo('.floating-adj', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)

    // Independent drift animation for adjectives
    gsap.to('.floating-adj', {
      y: '+=15',
      x: '+=10',
      duration: 3 + Math.random(),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.5,
        from: 'random'
      }
    })
    
    // Hold it fully visible
    tl.to({}, { duration: 0.6 })

    // Container fades out as it leaves
    tl.to(sectionRef.current, { opacity: 0, duration: 0.1 })

  }, { scope: sectionRef, dependencies: [range] })

  const paragraphText = "I am a Computer Science Engineering student currently pursuing my B.Tech degree. My focus is entirely on building robust, practical software products and scalable full-stack web applications. By blending solid engineering principles with modern frameworks like React and Node.js, I create experiences that are both technically sound and highly engaging."

  return (
    <section ref={sectionRef} id="about" className="relative w-full h-screen flex items-center justify-center pointer-events-none px-6 overflow-hidden">
      
      {/* Floating Adjectives */}
      <div className="floating-adj absolute top-[20%] left-[40%] font-serif italic text-white/5 sm:text-white/10 text-2xl sm:text-4xl pointer-events-none z-0 hidden sm:block">Precision</div>
      <div className="floating-adj absolute bottom-[20%] left-[15%] font-serif italic text-white/5 sm:text-white/10 text-3xl sm:text-5xl pointer-events-none z-0 hidden sm:block">Curiosity</div>
      
      <div className="max-w-3xl w-full pointer-events-auto bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-8 md:p-10 z-10 md:mr-auto md:ml-[8%] shadow-[0_0_30px_rgba(255,255,255,0.08)] flex flex-col sm:flex-row gap-5 sm:gap-8 items-center max-h-[85vh] overflow-y-auto sm:overflow-visible">
        <div className="shrink-0 relative group">
          <div className="w-24 h-32 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border border-white/30 shadow-[0_0_25px_rgba(62,230,168,0.2)] bg-black/60">
            <img 
              src="/profile.jpg" 
              alt="Vedant Shrivastava" 
              className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/90 border border-[#3ee6a8]/50 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#3ee6a8] shadow-lg backdrop-blur-md uppercase whitespace-nowrap">
            Engineer
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-3xl font-sans font-black uppercase tracking-widest text-white mb-3 sm:mb-4 flex items-center justify-center sm:justify-start gap-3">
            <span>About</span>
            <div className="hidden sm:block h-[1px] flex-1 bg-white/10" />
          </h2>
          <p className="about-paragraph text-xs sm:text-base md:text-lg text-gray-300 leading-relaxed font-serif italic">
            <SplitText text={paragraphText} type="words" />
          </p>
        </div>
      </div>
    </section>
  )
}
