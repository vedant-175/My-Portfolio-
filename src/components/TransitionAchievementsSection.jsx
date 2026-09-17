import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollStore } from '../store/useScrollStore'

export default function TransitionAchievementsSection() {
  const sectionRef = useRef(null)

  const ranges = useScrollStore(state => state.ranges)
  const range = ranges?.transition_achievements

  useGSAP(() => {
    if (!range) return
    const tl = gsap.timeline({
      scrollTrigger: {
        start: range.animStart, 
        end: range.animEnd,
        scrub: true,
      }
    })

    // Container / Heading fade in and scale down slightly to normal
    tl.fromTo(sectionRef.current, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    )
    
    // Hold briefly
    tl.to({}, { duration: 0.4 })

    // Exit before cards enter (recedes away)
    tl.to(sectionRef.current, 
      { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' }
    )

  }, { scope: sectionRef, dependencies: [range] })

  return (
    <section ref={sectionRef} id="transition_achievements" className="relative w-full h-screen flex items-center justify-center pointer-events-none px-6 text-center z-10">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white pointer-events-auto drop-shadow-2xl">
        What I Have Achieved
      </h2>
    </section>
  )
}
