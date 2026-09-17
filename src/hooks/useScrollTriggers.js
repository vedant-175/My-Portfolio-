import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useScrollStore } from '../store/useScrollStore'
import { computeSectionRanges } from '../config/scrollConfig'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export function useScrollTriggers(containerRef) {
  useGSAP(() => {
    const setGlobalProgress = useScrollStore.getState().setGlobalProgress
    const setRanges = useScrollStore.getState().setRanges

    if (!containerRef.current) return

    // Calculate ranges based on container scrollHeight minus viewport
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight
    const ranges = computeSectionRanges(totalHeight)
    setRanges(ranges)

    // Global Progress Scrub and Active Section Tracker
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        setGlobalProgress(self.progress)
        
        const currentY = self.scroll()
        const entries = Object.entries(ranges)
        let foundSection = entries[0]?.[0] || 'hero'
        
        for (let i = 0; i < entries.length; i++) {
          const [id, range] = entries[i]
          if (i === entries.length - 1) {
            // Last section: stays active for all positions from its start through the very bottom and beyond
            if (currentY >= range.start) {
              foundSection = id
              break
            }
          } else if (currentY >= range.start && currentY < range.end) {
            foundSection = id
            break
          }
        }
        
        const currentActive = useScrollStore.getState().activeSection
        if (currentActive !== foundSection) {
          useScrollStore.getState().setActiveSection(foundSection)
        }
      },
    })
    
    // Optional: Re-calculate on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
      const newTotalHeight = containerRef.current.scrollHeight - window.innerHeight
      const newRanges = computeSectionRanges(newTotalHeight)
      setRanges(newRanges)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)

  }, { scope: containerRef })
}
