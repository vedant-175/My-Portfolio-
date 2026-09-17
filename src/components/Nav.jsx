import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from '../store/useScrollStore'

export default function Nav() {
  const activeSection = useScrollStore((state) => state.activeSection)

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
    const range = useScrollStore.getState().ranges[id]
    if (range) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: range.navTarget,
        ease: 'power3.inOut'
      })
      setTimeout(() => ScrollTrigger.refresh(), 50)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 pointer-events-auto backdrop-blur-md bg-black/10">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
        <div className="w-7 h-7 rounded-full overflow-hidden border border-[#3ee6a8] group-hover:shadow-[0_0_10px_#3ee6a8] transition-all shrink-0">
          <img src="/profile.jpg" alt="Vedant" className="w-full h-full object-cover object-[center_15%]" />
        </div>
        <span className="font-bold text-sm tracking-wider uppercase">Vedant Shrivastava</span>
      </div>

      <div className="flex items-center gap-8">
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

      <div className="w-16 flex justify-end">
        {/* Placeholder for theme/lang toggle */}
      </div>
    </nav>
  )
}
