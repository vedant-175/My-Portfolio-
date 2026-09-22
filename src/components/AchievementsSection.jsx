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

    // Container and header fade in
    tl.fromTo(sectionRef.current, 
      { opacity: 0, y: 30, scale: 0.98 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
    )

    // Achievement cards stagger in
    tl.fromTo('.achievement-card-grid',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.2, stagger: 0.05, ease: 'power2.out' },
      "-=0.1"
    )

    // Hold all 3 cards fully visible for reading
    tl.to({}, { duration: 0.65 })

    // Fade out as leaving
    tl.to(sectionRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: 'power2.in'
    })

  }, { scope: sectionRef, dependencies: [range] })

  const achievements = [
    {
      title: "GirlScript Summer of Code",
      role: "GSSoC'26 Ambassador & Contributor",
      date: "May - August 2026",
      description: "Contributed to open-source codebases, resolving issues, optimizing performance, and collaborating closely with global maintainers.",
      icon: "🚀",
      tag: "Open Source"
    },
    {
      title: "Web-a-Thon 2.0",
      role: "Finalist (Top 15 among 100+ teams)",
      date: "February 2026",
      description: "Developed an innovative full-stack application under 48 hours, recognized for best technical execution and UX by industry judges.",
      icon: "🏆",
      tag: "Top 15"
    },
    {
      title: "Code-a-Haunt 2.0",
      role: "Finalist (Top 20 among 100+ teams)",
      date: "February 2025",
      description: "Built a complex algorithmic solution and full-stack prototype during a rigorous competitive hackathon environment.",
      icon: "👻",
      tag: "Top 20"
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      id="achievements" 
      className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-5 sm:mb-6 pointer-events-auto">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans text-[#3ee6a8] font-bold px-3.5 py-1 rounded-full bg-[#3ee6a8]/10 border border-[#3ee6a8]/20 backdrop-blur-md">
          Recognition & Honors
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white mt-2">
          Achievements
        </h2>
      </div>

      {/* 3-Card Grid displaying ALL 3 achievements simultaneously */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pointer-events-auto max-h-[78vh] overflow-y-auto sm:overflow-visible">
        {achievements.map((item, idx) => (
          <div 
            key={idx} 
            className="achievement-card-grid relative bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/20 p-5 sm:p-6 rounded-xl shadow-2xl flex flex-col justify-between hover:border-[#3ee6a8]/50 hover:shadow-[0_0_30px_rgba(62,230,168,0.15)] transition-all duration-300 group"
          >
            <div>
              {/* Top row with icon & badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#3ee6a8] uppercase bg-[#3ee6a8]/10 px-2 py-0.5 rounded border border-[#3ee6a8]/20">
                    0{idx + 1}
                  </span>
                  {item.tag && (
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-300 text-[9px] uppercase tracking-widest font-sans rounded">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Role */}
              <h3 className="text-lg sm:text-xl font-serif italic text-white tracking-wide mb-1 group-hover:text-[#3ee6a8] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-semibold text-[#3ee6a8] mb-2">
                {item.role}
              </p>

              {/* Description */}
              <p className="text-gray-300 text-xs sm:text-sm font-serif leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Date footer */}
            <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-gray-400 text-xs font-sans">
              <span>{item.date}</span>
              <span className="text-[#3ee6a8] text-xs">★</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
