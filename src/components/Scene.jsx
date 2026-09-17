import React from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import DNAHelix from './DNAHelix'
import Starfield from './Starfield'
import CameraRig from './CameraRig'

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 1000 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Subtle ambient light */}
        <ambientLight intensity={0.2} />
        
        <Starfield count={1000} />
        <DNAHelix />
        <CameraRig />
        
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
