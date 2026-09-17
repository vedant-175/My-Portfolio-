import React, { useRef } from 'react'
import Scene from './components/Scene'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import SkillsSection from './components/SkillsSection'
import TransitionProjectsSection from './components/TransitionProjectsSection'
import TransitionAchievementsSection from './components/TransitionAchievementsSection'
import AchievementsSection from './components/AchievementsSection'
import EducationSection from './components/EducationSection'
import { useScrollTriggers } from './hooks/useScrollTriggers'
import { useScrollStore } from './store/useScrollStore'

function App() {
  const containerRef = useRef(null)
  
  // Set up global scroll triggers for the HTML overlay
  useScrollTriggers(containerRef)
  
  const activeSection = useScrollStore(state => state.activeSection)

  return (
    <div className="relative w-full overflow-x-hidden bg-black text-white">
      {/* Fixed Fullscreen 3D Canvas (z-0) */}
      <Scene />

      {/* HTML Overlay Container - tall enough to scroll */}
      <div ref={containerRef} className="relative z-10 w-full h-[1400vh] pointer-events-none">
        
        {/* Fixed UI */}
        <Nav />
        <CustomCursor />
        
        {/* Fixed Viewport Container for Sections */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Only render active section */}
          {activeSection === 'hero' && <HeroSection />}
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'skills' && <SkillsSection />}
          {activeSection === 'transition_projects' && <TransitionProjectsSection />}
          {activeSection === 'projects' && <ProjectsSection />}
          {activeSection === 'transition_achievements' && <TransitionAchievementsSection />}
          {activeSection === 'achievements' && <AchievementsSection />}
          {activeSection === 'education' && <EducationSection />}
          {activeSection === 'contact' && <ContactSection />}
        </div>
      </div>
    </div>
  )
}

export default App
