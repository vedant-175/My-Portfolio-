import React, { useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useScrollStore } from '../store/useScrollStore'
import { computeSectionRanges } from '../config/scrollConfig'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Nav() {
  const activeSection = useScrollStore((state) => state.activeSection)
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ]

  const scrollTo = (id) => {
    setIsOpen(false)
    const store = useScrollStore.getState()
    
    // 1. Immediately switch active section so Education renders immediately
    store.setIsNavigating(true)
    store.setActiveSection(id)

    // 2. Resolve ranges safely with fallback so it never errors
    let ranges = store.ranges
    if (!ranges) {
      const scrollEl = document.scrollingElement || document.documentElement
      const totalHeight = scrollEl ? scrollEl.scrollHeight - window.innerHeight : window.innerHeight * 4
      ranges = computeSectionRanges(totalHeight)
      store.setRanges(ranges)
    }

    const targetRange = ranges?.[id]
    if (targetRange) {
      gsap.killTweensOf(window)
      gsap.to(window, {
        duration: 0.85,
        scrollTo: targetRange.navTarget,
        ease: 'power2.inOut',
        onComplete: () => {
          setTimeout(() => {
            store.setIsNavigating(false)
            store.setActiveSection(id)
            ScrollTrigger.refresh()
          }, 50)
        }
      })
    } else {
      store.setIsNavigating(false)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-6 py-4 sm:py-6 pointer-events-auto backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#3ee6a8] group-hover:shadow-[0_0_10px_#3ee6a8] transition-all shrink-0">
            <img src="/profile.jpg" alt="Vedant" className="w-full h-full object-cover object-[center_15%]" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wider uppercase">Vedant Shrivastava</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-1 group"
              data-cursor-hover
            >
              <span className="text-xs uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">
                {item.label}
              </span>
              <div
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  activeSection === item.id || (activeSection === 'hero' && item.id === 'hero')
                    ? 'bg-[#3ee6a8] scale-100'
                    : 'bg-transparent scale-0 group-hover:bg-gray-500 group-hover:scale-100'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`} />
          <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1'}`} />
          <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>

        <div className="hidden md:flex w-16 justify-end">
          {/* Placeholder for theme/lang toggle */}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/85 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-auto md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-col items-center gap-6 p-6 w-full max-w-xs text-center" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-lg uppercase tracking-[0.2em] font-sans font-bold transition-all py-2 w-full ${
                  activeSection === item.id 
                    ? 'text-[#3ee6a8] scale-110' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
