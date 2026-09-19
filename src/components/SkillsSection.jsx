import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollStore } from '../store/useScrollStore'

export default function SkillsSection() {
  const sectionRef = useRef(null)

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.skills

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
    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
    
    // Chips fade and scale in cleanly
    const chips = gsap.utils.toArray('.skill-chip')
    tl.fromTo(chips, 
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.02, ease: 'back.out(1.5)' }
    )
    
    // Floating adjectives fade in
    tl.fromTo('.floating-adj-skills', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)

    // Independent drift animation for adjectives
    gsap.to('.floating-adj-skills', {
      y: '-=20',
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
    
    tl.to({}, { duration: 0.3 })

    // Container fade out
    tl.to(sectionRef.current, { opacity: 0, duration: 0.2 })

  }, { scope: sectionRef, dependencies: [range] })

  const skillCategories = [
    { title: 'Languages', skills: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript'] },
    { title: 'Frontend', skills: ['React.js', 'Next.js', 'JavaScript', 'TypeScript'] },
    { title: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs'] },
    { title: 'Databases', skills: ['MongoDB', 'PostgreSQL'] },
    { title: 'Tools', skills: ['Git'] },
    { title: 'Soft Skills', skills: ['Problem Solving', 'Teamwork', 'Adaptability', 'Leadership', 'Communication'] }
  ]

  return (
    <section ref={sectionRef} id="skills" className="relative w-full h-screen flex items-center justify-center pointer-events-none px-4 sm:px-6 overflow-hidden">
      
      {/* Floating Adjectives */}
      <div className="floating-adj-skills absolute top-[15%] left-[5%] font-serif italic text-white/5 sm:text-white/10 text-2xl sm:text-5xl pointer-events-none z-0 hidden sm:block">Structure</div>
      <div className="floating-adj-skills absolute bottom-[15%] left-[45%] font-serif italic text-white/5 sm:text-white/10 text-2xl sm:text-4xl pointer-events-none z-0 hidden sm:block">Clarity</div>
      
      <div className="max-w-4xl w-full pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-8 md:p-12 z-10 mx-auto max-h-[85vh] overflow-y-auto sm:overflow-visible">
        <h2 className="text-2xl sm:text-4xl font-sans font-black uppercase tracking-widest text-white mb-4 sm:mb-8 text-center sm:text-left">
          Skills
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-2 sm:gap-3">
              <h3 className="text-xs sm:text-sm font-sans uppercase tracking-widest text-gray-400 font-semibold">{category.title}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 perspective-1000">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="skill-chip font-sans inline-block px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs sm:text-sm text-gray-200 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
