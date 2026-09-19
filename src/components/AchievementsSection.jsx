import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollStore } from '../store/useScrollStore'

export default function AchievementsSection() {
  const sectionRef = useRef(null)

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.achievements

  useGSAP(() => {
    if (!range) return
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.animStart, 
        end: range.animEnd,
        scrub: true,
      }
    })

    // Container fade in
    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)

    // Floating adjectives fade in
    tl.fromTo('.floating-adj-ach', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)

    // Header fade in
    tl.fromTo('.achievements-header', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.2 }, 0)

    // Independent drift animation for adjectives
    gsap.to('.floating-adj-ach', {
      y: '+=20',
      x: '-=10',
      duration: 3.5 + Math.random(),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.5,
        from: 'random'
      }
    })

    const slots = gsap.utils.toArray('.achievement-slot')
    const cards = gsap.utils.toArray('.achievement-card')

    // Initial State: all cards hidden and offset slightly below resting position
    gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.95 })
    gsap.set(slots, { pointerEvents: 'none' })

    const totalCards = cards.length

    cards.forEach((card, i) => {
      const slot = slots[i]
      const step = 1.0
      const start = 0.1 + i * step
      const enterEnd = start + 0.25
      const holdEnd = start + 0.75
      const exitEnd = start + 1.0

      // Enable pointer events on active slot
      tl.set(slot, { pointerEvents: 'auto' }, start)

      // Enter tween: slide and fade up to TRUE vertical center (resting position y: 0)
      tl.fromTo(card, 
        { autoAlpha: 0, y: 40, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' },
        start
      )

      // Hold at true vertical center for comfortable reading
      tl.to({}, { duration: 0.5 }, enterEnd)

      // Exit tween: slide up and fade out before next card enters
      tl.to(card, 
        { autoAlpha: 0, y: -30, scale: 0.95, duration: 0.25, ease: 'power2.in' },
        holdEnd
      )

      // Disable pointer events on exited slot
      tl.set(slot, { pointerEvents: 'none' }, exitEnd)
    })

    // Container fade out at end of section
    const exitStartTime = 0.1 + totalCards * 1.0
    tl.to(sectionRef.current, { opacity: 0, duration: 0.2 }, exitStartTime)
    tl.to({}, { duration: 0.1 }, exitStartTime + 0.2)

  }, { scope: sectionRef, dependencies: [range] })

  const achievements = [
    {
      title: "GirlScript Summer of Code",
      role: "GSSoC'26 Ambassador & Contributor",
      date: "May - August 2026",
      description: "Contributed to numerous open-source projects, resolving critical issues, optimizing performance, and collaborating closely with global maintainers.",
      icon: "🚀"
    },
    {
      title: "Web-a-Thon 2.0",
      role: "Finalist (Top 15 among 100+ teams)",
      date: "February 2026",
      description: "Developed an innovative full-stack application under 48 hours, recognized for best technical execution and user experience by industry judges.",
      icon: "🏆",
      highlight: true
    },
    {
      title: "Code-a-Haunt 2.0",
      role: "Finalist (Top 20 among 100+ teams)",
      date: "February 2025",
      description: "Built a complex algorithmic solution and web application during a rigorous hackathon, showcasing rapid prototyping skills.",
      icon: "👻"
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      id="achievements" 
      className="relative w-full h-screen pointer-events-none overflow-hidden"
    >
      {/* Floating Adjectives */}
      <div className="floating-adj-ach absolute top-[20%] left-[6%] font-serif italic text-white/10 text-4xl sm:text-6xl pointer-events-none z-0 select-none">
        Rigor
      </div>
      <div className="floating-adj-ach absolute bottom-[15%] right-[8%] font-serif italic text-white/10 text-3xl sm:text-5xl pointer-events-none z-0 select-none">
        Depth
      </div>
      
      {/* Subtle Section Header positioned cleanly below the navbar, out of card flow */}
      <div className="achievements-header absolute top-16 sm:top-24 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans text-[#3ee6a8] font-bold px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#3ee6a8]/10 border border-[#3ee6a8]/20 backdrop-blur-md">
          Achievements
        </span>
      </div>

      {/* 
        Viewport Content Area: Strictly bounded below the top navbar (64px - 80px).
        Every child slot fills this exact area with flex centering, guaranteeing that
        each card's vertical midpoint equals:
        center-y = navbarHeight + (viewportHeight - navbarHeight) / 2
      */}
      <div className="absolute top-[64px] sm:top-[80px] bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        {achievements.map((item, idx) => (
          <div 
            key={idx} 
            className="achievement-slot absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none"
          >
            <div 
              className="achievement-card w-full max-w-2xl pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 max-h-[80vh] overflow-y-auto sm:overflow-visible"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl sm:text-4xl shrink-0 shadow-inner">
                {item.icon}
              </div>

              <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#3ee6a8] uppercase bg-[#3ee6a8]/10 px-2 py-0.5 rounded border border-[#3ee6a8]/20">
                    0{idx + 1} / 0{achievements.length}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white tracking-wide">
                    {item.title}
                  </h3>
                  {item.tag && (
                    <span className="px-2 py-0.5 bg-[#3ee6a8]/20 border border-[#3ee6a8]/50 text-[#3ee6a8] text-[9px] sm:text-[10px] uppercase tracking-widest font-sans rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-base font-serif italic mb-2 sm:mb-3">
                  <span className="text-[#3ee6a8]">{item.role}</span>
                  <span className="text-gray-600 hidden sm:inline">|</span>
                  <span className="text-gray-400 text-xs sm:text-sm font-sans">{item.date}</span>
                </div>

                {item.description && (
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base font-serif leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
