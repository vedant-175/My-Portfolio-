export const SECTION_CONFIG = [
  { id: 'hero', weight: 1.0, navOffset: 0.0 },
  { id: 'about', weight: 1.0, navOffset: 0.5 },
  { id: 'skills', weight: 1.0, navOffset: 0.5 },
  { id: 'projects', weight: 1.2, navOffset: 0.5 },
  { id: 'achievements', weight: 1.2, navOffset: 0.5 },
  { id: 'education', weight: 1.0, navOffset: 0.65 },
  { id: 'contact', weight: 1.0, navOffset: 0.85 },
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
      navTarget: currentStart + (length * (section.navOffset !== undefined ? section.navOffset : (isLast ? 0.85 : 0.5))),
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

  return ranges
}
