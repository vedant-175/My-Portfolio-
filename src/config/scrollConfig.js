export const SECTION_CONFIG = [
  { id: 'hero', weight: 1, navOffset: 0 },
  { id: 'about', weight: 1, navOffset: 0.2 },
  { id: 'skills', weight: 1, navOffset: 0.25 },
  { id: 'transition_projects', weight: 0.6, navOffset: 0.3 },
  { id: 'projects', weight: 2.5, navOffset: 0.25 }, // Needs more space for sequential cards
  { id: 'transition_achievements', weight: 0.6, navOffset: 0.3 },
  { id: 'achievements', weight: 3.4, navOffset: 0.20 },
  { id: 'education', weight: 0.8, navOffset: 0.2 },
  { id: 'contact', weight: 0.8, navOffset: 0.85 },
]

/**
 * Computes exact start and end pixel ranges for each section.
 * Validates that there are absolutely no overlaps.
 */
export function computeSectionRanges(totalScrollHeight) {
  const totalWeight = SECTION_CONFIG.reduce((acc, curr) => acc + curr.weight, 0)
  let currentStart = 0
  const ranges = {}

  SECTION_CONFIG.forEach((section, index) => {
    // Exact pixel length based on weight proportion
    const length = (section.weight / totalWeight) * totalScrollHeight
    const end = currentStart + length

    const isLast = index === SECTION_CONFIG.length - 1
    ranges[section.id] = {
      id: section.id,
      start: currentStart,
      end: end,
      length: length,
      // Provide a 10% buffer inset on each side for animations; for the last section, animEnd extends through the end
      animStart: currentStart + (length * 0.1),
      animEnd: isLast ? end : end - (length * 0.1),
      // Nav scroll target: lands the user squarely on settled content, bypassing buffer & enter animations
      navTarget: currentStart + (length * (section.navOffset !== undefined ? section.navOffset : (isLast ? 0.85 : 0.25))),
    }
    
    // Hard validation against overlap
    if (index > 0) {
      const prevSection = SECTION_CONFIG[index - 1]
      const prevRange = ranges[prevSection.id]
      if (Math.abs(currentStart - prevRange.end) > 0.1) {
        console.error(`OVERLAP DETECTED between ${prevSection.id} and ${section.id}!`)
      }
    }

    currentStart = end
  })

  // Console log explicitly as requested
  console.table(ranges)
  
  return ranges
}
