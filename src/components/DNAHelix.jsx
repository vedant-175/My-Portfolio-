import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HELIX_RADIUS = 3.0
const HELIX_LENGTH = 500.0   // Extends deep into the Z-axis
const COILS = 30             // Number of full rotations over the length
const RUNGS_COUNT = 400      // Number of ladder rungs
const SPHERES_PER_STRAND = 800 // High density for the backbones

export default function DNAHelix() {
  const groupRef = useRef(null)
  
  // Backbone Strands (InstancedMesh)
  const strandMeshRef = useRef(null)
  
  // Rungs (InstancedMesh of thin cylinders)
  const rungMeshRef = useRef(null)
  
  const [strandMatrices, rungMatrices] = useMemo(() => {
    const totalSpheres = SPHERES_PER_STRAND * 2 // Two strands
    const sMatrices = new Float32Array(totalSpheres * 16)
    
    const dummy = new THREE.Object3D()
    
    // Generate Strands
    let sphereIndex = 0
    for (let s = 0; s < 2; s++) { // strand 1 and strand 2
      const phaseOffset = s * Math.PI // 180 degrees apart
      
      for (let i = 0; i < SPHERES_PER_STRAND; i++) {
        const t = i / (SPHERES_PER_STRAND - 1)
        const z = -t * HELIX_LENGTH // Go deep into -z
        const theta = t * Math.PI * 2 * COILS + phaseOffset
        
        const x = Math.cos(theta) * HELIX_RADIUS
        const y = Math.sin(theta) * HELIX_RADIUS
        
        dummy.position.set(x, y, z)
        
        // Vary size slightly for organic feel
        const scale = 0.8 + Math.random() * 0.4
        dummy.scale.set(scale, scale, scale)
        dummy.updateMatrix()
        
        dummy.matrix.toArray(sMatrices, sphereIndex * 16)
        sphereIndex++
      }
    }
    
    // Generate Rungs
    const rMatrices = new Float32Array(RUNGS_COUNT * 16)
    for (let i = 0; i < RUNGS_COUNT; i++) {
      const t = i / (RUNGS_COUNT - 1)
      const z = -t * HELIX_LENGTH
      const theta = t * Math.PI * 2 * COILS
      
      // Strand 1 pos
      const x1 = Math.cos(theta) * HELIX_RADIUS
      const y1 = Math.sin(theta) * HELIX_RADIUS
      
      // Strand 2 pos
      const x2 = Math.cos(theta + Math.PI) * HELIX_RADIUS
      const y2 = Math.sin(theta + Math.PI) * HELIX_RADIUS
      
      // Midpoint
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      
      dummy.position.set(midX, midY, z)
      
      // Cylinder needs to point from strand 1 to strand 2
      dummy.lookAt(x1, y1, z)
      dummy.rotateX(Math.PI / 2)
      
      dummy.scale.set(1, 1, 1) // Length is roughly 2 * HELIX_RADIUS
      dummy.updateMatrix()
      dummy.matrix.toArray(rMatrices, i * 16)
    }
    
    return [sMatrices, rMatrices]
  }, [])
  
  React.useEffect(() => {
    if (strandMeshRef.current) {
      strandMeshRef.current.instanceMatrix.array.set(strandMatrices)
      strandMeshRef.current.instanceMatrix.needsUpdate = true
    }
    if (rungMeshRef.current) {
      rungMeshRef.current.instanceMatrix.array.set(rungMatrices)
      rungMeshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [strandMatrices, rungMatrices])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow constant rotation around Z-axis
      groupRef.current.rotation.z -= delta * 0.2
    }
  })

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.15, 8, 8), [])
  const cylGeo = useMemo(() => new THREE.CylinderGeometry(0.02, 0.02, HELIX_RADIUS * 2, 6), [])

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]}>
      {/* DNA Backbone */}
      <instancedMesh
        ref={strandMeshRef}
        args={[sphereGeo, null, SPHERES_PER_STRAND * 2]}
      >
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.1}
        />
      </instancedMesh>

      {/* DNA Rungs */}
      <instancedMesh
        ref={rungMeshRef}
        args={[cylGeo, null, RUNGS_COUNT]}
      >
        <meshStandardMaterial 
          color="#888888"
          emissive="#aaaaaa"
          emissiveIntensity={0.4}
          roughness={0.4}
          transparent={true}
          opacity={0.6}
        />
      </instancedMesh>
    </group>
  )
}
