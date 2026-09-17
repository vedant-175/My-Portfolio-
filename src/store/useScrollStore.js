import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  globalProgress: 0,
  activeSection: 'hero',
  activeProjectIndex: 0,
  ranges: null,
  
  setGlobalProgress: (progress) => set({ globalProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  setActiveProjectIndex: (index) => set({ activeProjectIndex: index }),
  setRanges: (ranges) => set({ ranges }),
}))
