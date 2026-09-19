import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const requestRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Real mouse position
  const mouse = useRef({ x: 0, y: 0 })
  // Eased position for the ring
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
      
      // Update dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // Handle hover states for links/buttons
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('[data-cursor-hover]')) {
        setIsHovering(true)
      }
    }
    const handleMouseOut = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('[data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    const render = () => {
      // Lerp ring position
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }
      
      requestRef.current = requestAnimationFrame(render)
    }
    requestRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <div className="hidden md:block">
      {/* Dot */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[#3ee6a8] rounded-full pointer-events-none z-[100] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      
      {/* Ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border border-[#3ee6a8]/50 rounded-full pointer-events-none z-[99] transition-all duration-200 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${isHovering ? 'scale-150 border-[#3ee6a8] bg-[#3ee6a8]/10' : 'scale-100'}`}
        style={{ willChange: 'transform, transform' }}
      />
    </div>
  )
}
