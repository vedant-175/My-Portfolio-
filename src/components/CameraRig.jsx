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

    // Side-view camera offset
    // X = 12 units to the right
    // Z = 0 (vertically aligned with helix)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 12, 0.05)
    camera.position.z = 0
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1)
    
    // Look straight ahead at the helix's current Y level, but slightly left (-3)
    // so the helix remains on the right side of the viewport.
    camera.lookAt(-3, targetY, 0)
  })
  
  return null
}
