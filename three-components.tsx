"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

// Optimized Orbital Particles
function OrbitingParticles() {
  const ref = useRef<THREE.Points>(null!)
  const [sphere] = useMemo(() => {
    const sphere = new Float32Array(1500 * 3) // Reduced from 3000 for performance
    for (let i = 0; i < 1500; i++) {
      const i3 = i * 3
      const radius = Math.random() * 12 + 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      sphere[i3] = radius * Math.sin(phi) * Math.cos(theta)
      sphere[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      sphere[i3 + 2] = radius * Math.cos(phi)
    }
    return [sphere]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#3b82f6" size={0.04} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
    </Points>
  )
}

// Optimized Floating Codes
function FloatingCodes() {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3
    }
  })

  const codes = useMemo(() => {
    const temp = []
    for (let i = 0; i < 20; i++) {
      // Reduced from 30
      temp.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.15 + 0.1,
      })
    }
    return temp
  }, [])

  return (
    <group ref={meshRef}>
      {codes.map((code, index) => (
        <mesh
          key={index}
          position={code.position as [number, number, number]}
          rotation={code.rotation as [number, number, number]}
          scale={code.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={index % 4 === 0 ? "#3b82f6" : index % 4 === 1 ? "#8b5cf6" : index % 4 === 2 ? "#06b6d4" : "#10b981"}
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

// Optimized Orbit Rings
function OrbitRings() {
  const ringRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.02
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <group ref={ringRef}>
      {[8, 12, 16].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.1, radius + 0.1, 32]} />
          <meshBasicMaterial
            color={index === 0 ? "#3b82f6" : index === 1 ? "#8b5cf6" : "#06b6d4"}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main Three.js component
export default function ThreeComponents() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ background: "transparent" }}>
      <OrbitingParticles />
      <FloatingCodes />
      <OrbitRings />
    </Canvas>
  )
}
