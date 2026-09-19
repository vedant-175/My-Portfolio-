import { useFrame, useThree } from '@react-three/fiber'
import { useScrollStore } from '../store/useScrollStore'
import * as THREE from 'three'

export default function CameraRig() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const progress = useScrollStore.getState().globalProgress
    
    // The helix now extends along the Y-axis to -500. We start at y = 10, and go down to y = -490
    const startY = 10.0
    const endY = -490.0
    
    // Exact mapping (scrubbed by GSAP already)
    const targetY = THREE.MathUtils.lerp(startY, endY, progress)

    // Side-view camera offset - adapt for mobile portrait aspect ratio
    const isMobile = state.size.width < 768
    const desiredX = isMobile ? 16 : 12
    const desiredLookAtX = isMobile ? 0 : -3

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, 0.05)
    camera.position.z = 0
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1)
    
    // Look straight ahead at the helix's current Y level
    camera.lookAt(desiredLookAtX, targetY, 0)
  })
  
  return null
}
