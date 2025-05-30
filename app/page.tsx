"use client"

import {
  Clock,
  Code,
  Trophy,
  Users,
  Zap,
  Target,
  Rocket,
  Globe,
  Award,
  Mail,
  Phone,
  ExternalLink,
  MessageCircle,
  Instagram,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

// Loading Screen Component
function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 40) // 2 seconds total (100 / 2.5 = 40ms intervals)

      return () => clearInterval(interval)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Globe className="h-16 w-16 text-blue-400 mx-auto animate-spin" />
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 font-mono">
          HackOrbit
        </h1>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-blue-300 font-mono text-sm">
          <span className="text-blue-400">{">"}</span> Initializing Orbital Systems... {progress}%
        </p>
      </div>
    </div>
  )
}

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

// Social Media Icons Component
function SocialIcon({ platform }: { platform: "discord" | "instagram" | "whatsapp" }) {
  const icons = {
    discord: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    instagram: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072c-4.358.2-6.78 2.618-6.98 6.98c-.059 1.281-.073 1.689-.073 4.948c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98c1.281.058 1.689.072 4.948.072c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98c-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162c0 3.403 2.759 6.163 6.162 6.163c3.403 0 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
      </svg>
    ),
  }

  return icons[platform]
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2024-12-31T23:59:59").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "1s" }}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-red-400 mb-2 font-mono animate-pulse">REGISTRATION CLOSES IN</h3>
        <p className="text-red-200/80 font-mono text-sm">
          <span className="text-red-400">{">"}</span> SECURE YOUR SPOT BEFORE TIME RUNS OUT!
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {[
          { value: timeLeft.days, label: "DAYS", color: "red" },
          { value: timeLeft.hours, label: "HOURS", color: "orange" },
          { value: timeLeft.minutes, label: "MINUTES", color: "yellow" },
          { value: timeLeft.seconds, label: "SECONDS", color: "green" },
        ].map((item, index) => (
          <div
            key={item.label}
            className={`group relative p-6 bg-${item.color}-500/10 rounded-2xl border border-${item.color}-500/30 backdrop-blur-sm hover:bg-${item.color}-500/20 transition-all duration-500 hover:scale-110 hover:rotate-1 cursor-pointer animate-slide-up`}
            style={{ animationDelay: `${1 + index * 0.1}s` }}
          >
            <div
              className={`absolute inset-0 rounded-2xl bg-${item.color}-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}
            ></div>
            <Clock
              className={`w-6 h-6 text-${item.color}-400 mb-2 mx-auto transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12`}
            />
            <div
              className={`text-3xl font-bold text-${item.color}-400 font-mono transition-all duration-300 group-hover:scale-110 animate-pulse`}
            >
              {String(item.value).padStart(2, "0")}
            </div>
            <div className={`text-${item.color}-200/60 font-mono text-sm`}>{item.label}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button
          size="lg"
          className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold text-lg px-10 py-4 border-0 shadow-2xl shadow-red-500/30 transition-all duration-500 hover:scale-110 hover:shadow-red-500/50 overflow-hidden animate-bounce"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <Rocket className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-45" />
          REGISTER NOW - LIMITED TIME!
        </Button>
      </div>
    </div>
  )
}

export default function HackOrbitLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Loading timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isLoading])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <div
        className={`min-h-screen bg-black relative overflow-hidden transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* Enhanced Mouse Cursor Effect */}
        <div
          className="fixed w-6 h-6 bg-blue-400/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          }}
        />

        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/30"></div>

        {/* Three.js Orbital Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ background: "transparent" }}>
            <OrbitingParticles />
            <FloatingCodes />
            <OrbitRings />
          </Canvas>
        </div>

        {/* Enhanced Floating Orbs with Mouse Interaction */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
            style={{
              transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
              top: "10%",
              left: "10%",
            }}
          ></div>
          <div
            className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
              top: "60%",
              right: "10%",
              animationDelay: "1s",
            }}
          ></div>
          <div
            className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
            style={{
              transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
              bottom: "20%",
              left: "50%",
              animationDelay: "2s",
            }}
          ></div>
        </div>

        {/* Enhanced Grid Pattern with Scroll Effect */}
        <div
          className="fixed inset-0 opacity-10 transition-transform duration-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translateY(${scrollY * 0.5}px) translateX(${mousePosition.x * 0.01}px)`,
          }}
        ></div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-xl z-50 border-b border-blue-500/20 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3 group">
                <div className="relative group-hover:animate-bounce">
                  <Globe className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                  HackOrbit
                </span>
              </div>
              <div className="hidden md:flex space-x-8">
                {["ABOUT", "THEMES", "TIMELINE", "PRIZES", "SPONSORS"].map((item, index) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative text-blue-300/80 hover:text-blue-300 transition-all duration-300 font-mono group animate-slide-down"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                ))}
              </div>
              <Button className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 overflow-hidden group animate-slide-down">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Rocket className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                REGISTER NOW
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <Globe className="w-4 h-4 mr-2 animate-spin" />
                NATIONAL LEVEL ONLINE HACKATHON
              </Badge>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-mono">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  HackOrbit
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-blue-200 mb-4 font-mono">Get into the orbit of innovation.</p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="relative max-w-4xl mx-auto mb-8">
                <p className="text-lg text-blue-100/90 font-mono leading-relaxed mb-4">
                  <span className="text-blue-400">{">"}</span> CENTRAL INDIA'S ULTIMATE CODE BATTLE
                </p>
                <p className="text-base text-cyan-200/80 font-mono">
                  National Level Online Hackathon by <span className="text-cyan-400 font-bold">DLG Group</span> and{" "}
                  <span className="text-blue-400 font-bold">Madhav Institute of Technology & Science, Gwalior</span>
                </p>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl opacity-50"></div>
              </div>
            </div>

            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold text-lg px-10 py-4 border-0 shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:scale-110 hover:shadow-blue-500/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Rocket className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-45" />
                JOIN THE ORBIT
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 text-lg px-10 py-4 font-mono backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <ExternalLink className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                VIEW DETAILS
              </Button>
            </div>

            <div
              className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
              style={{ animationDelay: "0.8s" }}
            >
              {[
                { number: "₹100", label: "REGISTRATION", color: "blue", icon: Users },
                { number: "₹7K+", label: "PRIZE POOL", color: "purple", icon: Trophy },
                { number: "4", label: "MAX TEAM SIZE", color: "cyan", icon: Users },
                { number: "NATIONAL", label: "LEVEL", color: "green", icon: Globe },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group relative p-6 bg-${stat.color}-500/10 rounded-2xl border border-${stat.color}-500/30 backdrop-blur-sm hover:bg-${stat.color}-500/20 transition-all duration-500 hover:scale-110 hover:rotate-1 cursor-pointer animate-slide-up`}
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-${stat.color}-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}
                  ></div>
                  <stat.icon
                    className={`w-6 h-6 text-${stat.color}-400 mb-2 mx-auto transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12`}
                  />
                  <div
                    className={`text-2xl font-bold text-${stat.color}-400 font-mono transition-all duration-300 group-hover:scale-110`}
                  >
                    {stat.number}
                  </div>
                  <div className={`text-${stat.color}-200/60 font-mono text-sm`}>{stat.label}</div>
                </div>
              ))}
            </div>

            <CountdownTimer />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-3xl"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                ABOUT HACKORBIT
              </h2>
              <p className="text-xl text-blue-100/80 max-w-3xl mx-auto font-mono">
                <span className="text-blue-400">{">"}</span> ENTER THE ORBIT OF INNOVATION AND CODE YOUR WAY TO VICTORY
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <Card className="group relative bg-black/40 border-blue-500/30 backdrop-blur-xl hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div className="relative mb-4">
                    <Code className="h-12 w-12 text-blue-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardTitle className="text-blue-300 font-mono text-xl group-hover:text-blue-200 transition-colors duration-300">
                    ABOUT DLG GROUP
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-blue-100/80 font-mono space-y-2">
                    <p>
                      <span className="text-blue-400">{">"}</span> Digital Learning Group (DLG) is a premier tech
                      community
                    </p>
                    <p>
                      <span className="text-blue-400">{">"}</span> Fostering innovation and open-source development
                    </p>
                    <p>
                      <span className="text-blue-400">{">"}</span> Empowering students with cutting-edge technology
                      skills
                    </p>
                    <p>
                      <span className="text-blue-400">{">"}</span> Building the next generation of tech leaders
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              <Card className="group relative bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div className="relative mb-4">
                    <Award className="h-12 w-12 text-purple-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardTitle className="text-purple-300 font-mono text-xl group-hover:text-purple-200 transition-colors duration-300">
                    ABOUT MITS GWALIOR
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-purple-100/80 font-mono space-y-2">
                    <p>
                      <span className="text-purple-400">{">"}</span> Madhav Institute of Technology & Science, Gwalior
                    </p>
                    <p>
                      <span className="text-purple-400">{">"}</span> Premier engineering institution in Central India
                    </p>
                    <p>
                      <span className="text-purple-400">{">"}</span> Excellence in technical education since decades
                    </p>
                    <p>
                      <span className="text-purple-400">{">"}</span> Nurturing innovation and research culture
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-cyan-400 mb-6 font-mono">EVENT OVERVIEW</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Platform", value: "Devfolio / Unstop", icon: Globe },
                  { label: "Participation", value: "National Level", icon: Target },
                  { label: "Team Size", value: "Max 4 members", icon: Users },
                  { label: "Registration", value: "₹100 per team", icon: Trophy },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="group p-6 bg-cyan-500/10 rounded-xl border border-cyan-500/30 backdrop-blur-sm hover:bg-cyan-500/20 transition-all duration-300 hover:scale-105"
                  >
                    <item.icon className="w-8 h-8 text-cyan-400 mb-3 mx-auto transition-transform duration-300 group-hover:scale-110" />
                    <h4 className="text-cyan-300 font-mono font-semibold mb-2">{item.label}</h4>
                    <p className="text-cyan-100/80 font-mono text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Themes Section */}
        <section id="themes" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                HACKATHON THEMES
              </h2>
              <p className="text-xl text-purple-100/80 font-mono">
                <span className="text-purple-400">{">"}</span> CHOOSE YOUR MISSION AND BUILD THE FUTURE
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI & MACHINE LEARNING",
                  desc: "Build intelligent systems that learn and adapt",
                  icon: Zap,
                  color: "blue",
                },
                {
                  title: "WEB3 & BLOCKCHAIN",
                  desc: "Create decentralized solutions for tomorrow",
                  icon: Globe,
                  color: "purple",
                },
                {
                  title: "FINTECH INNOVATION",
                  desc: "Revolutionize financial technology",
                  icon: Trophy,
                  color: "green",
                },
                {
                  title: "HEALTHCARE TECH",
                  desc: "Develop solutions for better health outcomes",
                  icon: Target,
                  color: "red",
                },
                {
                  title: "SUSTAINABILITY",
                  desc: "Code for a greener planet",
                  icon: Award,
                  color: "emerald",
                },
                {
                  title: "OPEN INNOVATION",
                  desc: "Think outside the box and surprise us",
                  icon: Rocket,
                  color: "cyan",
                },
              ].map((theme, index) => (
                <Card
                  key={theme.title}
                  className={`group relative bg-black/40 border-${theme.color}-500/30 backdrop-blur-xl hover:border-${theme.color}-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${theme.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <CardHeader className="relative text-center">
                    <div className="relative mb-4">
                      <theme.icon
                        className={`h-12 w-12 text-${theme.color}-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12`}
                      />
                      <div
                        className={`absolute inset-0 bg-${theme.color}-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}
                      ></div>
                    </div>
                    <CardTitle
                      className={`text-${theme.color}-300 font-mono text-lg group-hover:text-${theme.color}-200 transition-colors duration-300`}
                    >
                      {theme.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative text-center">
                    <p className={`text-${theme.color}-100/80 font-mono text-sm`}>{theme.desc}</p>
                  </CardContent>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${theme.color}-500 to-${theme.color}-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 backdrop-blur-3xl"></div>
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                MISSION TIMELINE
              </h2>
              <p className="text-xl text-cyan-100/80 font-mono">
                <span className="text-cyan-400">{">"}</span> PREPARE FOR ORBITAL LAUNCH
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  icon: Users,
                  title: "REGISTRATION OPENS",
                  desc: "December 1, 2024 - Secure your spot in the orbit",
                  color: "blue",
                },
                {
                  icon: Clock,
                  title: "HACKATHON BEGINS",
                  desc: "January 15, 2025 - Launch into coding mode",
                  color: "purple",
                },
                {
                  icon: Code,
                  title: "SUBMISSION DEADLINE",
                  desc: "January 17, 2025 - Final code deployment",
                  color: "cyan",
                },
                {
                  icon: Trophy,
                  title: "RESULTS ANNOUNCEMENT",
                  desc: "January 20, 2025 - Winners revealed",
                  color: "green",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`group flex items-center space-x-6 p-8 bg-${item.color}-500/10 rounded-2xl border border-${item.color}-500/30 backdrop-blur-sm hover:border-${item.color}-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <div className="relative">
                    <item.icon
                      className={`h-10 w-10 text-${item.color}-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12`}
                    />
                    <div
                      className={`absolute inset-0 bg-${item.color}-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                  </div>
                  <div className="relative flex-1">
                    <h3
                      className={`text-xl font-semibold text-${item.color}-300 font-mono mb-1 group-hover:text-${item.color}-200 transition-colors duration-300`}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-${item.color}-100/80 font-mono`}>
                      <span className={`text-${item.color}-400`}>{">"}</span> {item.desc}
                    </p>
                  </div>
                  <div
                    className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-${item.color}-500 to-${item.color}-300 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-lg z-0"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                ORBITAL REWARDS
              </h2>
              <p className="text-xl text-white font-mono">
                <span className="text-yellow-400">{">"}</span> ₹7,000+ PRIZE POOL + EXCLUSIVE REWARDS
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <Card className="group relative bg-yellow-500/10 border border-yellow-400 backdrop-blur-md z-10 hover:scale-105 transition-all duration-500 hover:-translate-y-2 animate-slide-up max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative">
                  <div className="relative mb-4">
                    <Trophy className="h-16 w-16 text-yellow-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardTitle className="text-3xl text-white font-mono">₹7,000+</CardTitle>
                  <CardDescription className="text-yellow-200 font-mono">TOTAL PRIZE POOL</CardDescription>
                </CardHeader>
                <CardContent className="text-center relative">
                  <div className="text-xl font-bold text-yellow-300 font-mono mb-2">CASH PRIZES</div>
                  <p className="text-yellow-100 font-mono text-sm">
                    <span className="text-yellow-400">{">"}</span> DISTRIBUTED AMONG TOP PERFORMERS
                  </p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="group relative bg-purple-500/10 border border-purple-400 backdrop-blur-md z-10 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative">
                  <Trophy className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-white font-mono">TOP 10 TEAMS</CardTitle>
                  <CardDescription className="text-purple-200 font-mono">EXCLUSIVE REWARDS</CardDescription>
                </CardHeader>
                <CardContent className="text-center relative">
                  <div className="text-2xl font-bold text-purple-300 font-mono mb-2">SWAGS & GOODIES</div>
                  <p className="text-purple-100 font-mono text-sm">
                    <span className="text-purple-400">{">"}</span> CERTIFICATES + MERCHANDISE VIA COURIER
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative bg-green-500/10 border border-green-400 backdrop-blur-md z-10 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative">
                  <Rocket className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-white font-mono">ALL PARTICIPANTS</CardTitle>
                  <CardDescription className="text-green-200 font-mono">PARTICIPATION REWARDS</CardDescription>
                </CardHeader>
                <CardContent className="text-center relative">
                  <div className="text-2xl font-bold text-green-300 font-mono mb-2">CERTIFICATES</div>
                  <p className="text-green-100 font-mono text-sm">
                    <span className="text-green-400">{">"}</span> NATIONAL LEVEL PARTICIPATION CERTIFICATES
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 backdrop-blur-3xl"></div>
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                ORBITAL PARTNERS
              </h2>
              <p className="text-xl text-purple-100/80 mb-12 font-mono">
                <span className="text-purple-400">{">"}</span> POWERED BY INDUSTRY LEADERS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {[
                {
                  name: "DLG GROUP",
                  color: "blue",
                  role: "TITLE SPONSOR",
                  desc: "Digital Learning Group - Premier Tech Community"
                },
                {
                  name: "MITS GWALIOR",
                  color: "purple",
                  role: "ACADEMIC PARTNER",
                  desc: "Madhav Institute of Technology & Science"
                },
              ].map((sponsor, index) => (
                <Card
                  key={sponsor.name}
                  className={`group relative bg-black/60 border-${sponsor.color}-500/30 hover:border-${sponsor.color}-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm overflow-hidden cursor-pointer animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${sponsor.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <CardHeader className="text-center relative p-8">
                    <div
                      className={`h-20 bg-gradient-to-r from-${sponsor.color}-400 to-${sponsor.color}-300 rounded-xl flex items-center justify-center text-black font-bold font-mono text-xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      {sponsor.name}
                    </div>
                    <CardTitle className={`text-${sponsor.color}-300 font-mono text-lg mb-2`}>{sponsor.role}</CardTitle>
                    <CardDescription className={`text-${sponsor.color}-100/80 font-mono text-sm`}>
                      <span className={`text-${sponsor.color}-400`}>{">"}</span> {sponsor.desc}
                    </CardDescription>
                  </CardHeader>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${sponsor.color}-500 to-${sponsor.color}-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "DEVFOLIO", color: "green", role: "PLATFORM PARTNER" },
                { name: "UNSTOP", color: "cyan", role: "PLATFORM PARTNER" },
                { name: "GITHUB", color: "gray", role: "TECH PARTNER" },
                { name: "VERCEL", color: "blue", role: "HOSTING PARTNER" },
              ].map((partner, index) => (
                <div
                  key={partner.name}
                  className={`group bg-black/60 p-6 rounded-2xl border border-${partner.color}-500/30 hover:border-${partner.color}-400/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 backdrop-blur-sm cursor-pointer overflow-hidden animate-slide-up`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${partner.color}-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}
                  ></div>
                  <div
                    className={`h-12 bg-gradient-to-r from-${partner.color}-400 to-${partner.color}-300 rounded-xl flex items-center justify-center text-black font-bold font-mono text-sm mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    {partner.name}
                  </div>
                  <p className={`text-${partner.color}-200/80 font-mono text-xs text-center`}>{partner.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section with Enhanced Social Icons */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                JOIN OUR COMMUNITY
              </h2>
              <p className="text-xl text-blue-100/80 mb-12 font-mono">
                <span className="text-blue-400">{">"}</span> GET UPDATES & NEWS RELATED TO DLG HACKATHON
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { name: "Discord", platform: "discord" as const, color: "blue", desc: "Join our Discord server" },
                { name: "Instagram", platform: "instagram" as const, color: "purple", desc: "Follow us on Instagram" },
                { name: "WhatsApp", platform: "whatsapp" as const, color: "green", desc: "Join WhatsApp group" },
              ].map((social, index) => (
                <Card
                  key={social.name}
                  className={`group relative bg-black/40 border-${social.color}-500/30 backdrop-blur-xl hover:border-${social.color}-400/60 transition-all duration-500 hover:scale-110 hover:-translate-y-4 hover:rotate-2 hover:shadow-2xl hover:shadow-${social.color}-500/30 overflow-hidden cursor-pointer`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${social.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <CardHeader className="text-center relative">
                    <div className="relative mb-4">
                      <div
                        className={`h-12 w-12 text-${social.color}-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 flex items-center justify-center`}
                      >
                        <SocialIcon platform={social.platform} />
                      </div>
                      <div
                        className={`absolute inset-0 bg-${social.color}-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      ></div>
                    </div>
                    <CardTitle
                      className={`text-${social.color}-300 font-mono text-xl group-hover:text-${social.color}-200 transition-colors duration-300`}
                    >
                      {social.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center relative">
                    <p className={`text-${social.color}-100/80 font-mono text-sm`}>{social.desc}</p>
                  </CardContent>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${social.color}-500 to-${social.color}-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                </Card>
              ))}
            </div>

            <Card className="group bg-black/40 border-blue-500/30 backdrop-blur-xl p-8 hover:border-blue-400/60 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="grid md:grid-cols-2 gap-8 items-center relative">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-blue-300 mb-6 font-mono">STAY CONNECTED:</h3>
                  <ul className="space-y-3 text-blue-100/80 font-mono">
                    {[
                      { icon: MessageCircle, text: "Real-time updates on Discord", color: "blue" },
                      { icon: Instagram, text: "Behind-the-scenes on Instagram", color: "purple" },
                      { icon: Phone, text: "Quick announcements on WhatsApp", color: "green" },
                      { icon: Mail, text: "Official communications via email", color: "cyan" },
                    ].map((benefit, index) => (
                      <li
                        key={benefit.text}
                        className="flex items-center group/item hover:translate-x-2 transition-transform duration-300"
                      >
                        <benefit.icon
                          className={`h-4 w-4 mr-3 text-${benefit.color}-400 transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12`}
                        />
                        <span className="text-blue-400">{">"}</span> {benefit.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="your@email.com"
                    className="bg-black/40 border-blue-500/50 text-blue-300 placeholder:text-blue-400/50 font-mono backdrop-blur-sm hover:border-blue-400/70 focus:border-blue-400 transition-all duration-300"
                  />
                  <Button className="group w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold border-0 shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:scale-105 hover:shadow-blue-500/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Globe className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                    JOIN THE ORBIT
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Developer Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 backdrop-blur-3xl"></div>
          <div className="max-w-4xl mx-auto text-center relative">
            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                WEBSITE DEVELOPER
              </h2>
              <p className="text-xl text-green-100/80 mb-12 font-mono">
                <span className="text-green-400">{">"}</span> CRAFTED WITH PASSION AND CODE
              </p>
            </div>

            <Card className="group relative bg-black/40 border-green-500/30 backdrop-blur-xl hover:border-green-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-500/30 overflow-hidden max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="text-center relative pt-8">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-green-400/50 group-hover:border-green-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <img
                      src="/images/ayan-ahmed-khan.png"
                      alt="Ayan Ahmed Khan - Developer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>

                <CardTitle className="text-2xl text-green-300 font-mono group-hover:text-green-200 transition-colors duration-300 mb-2">
                  AYAN AHMED KHAN
                </CardTitle>
                <CardDescription className="text-green-200/80 font-mono text-lg">FULL STACK DEVELOPER</CardDescription>
              </CardHeader>

              <CardContent className="text-center relative pb-8">
                <div className="space-y-3 text-green-100/80 font-mono mb-6">
                  <p className="flex items-center justify-center group/item hover:translate-x-2 transition-transform duration-300">
                    <Code className="h-4 w-4 mr-3 text-green-400 transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="text-green-400">{">"}</span> React & Next.js Expert
                  </p>
                  <p className="flex items-center justify-center group/item hover:translate-x-2 transition-transform duration-300">
                    <Zap className="h-4 w-4 mr-3 text-blue-400 transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="text-blue-400">{">"}</span> UI/UX Design Enthusiast
                  </p>
                  <p className="flex items-center justify-center group/item hover:translate-x-2 transition-transform duration-300">
                    <Rocket className="h-4 w-4 mr-3 text-cyan-400 transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="text-cyan-400">{">"}</span> Innovation & Tech Lover
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    size="sm"
                    className="group/btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-black font-bold border-0 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-110 hover:shadow-green-500/40 overflow-hidden"
                    onClick={() => window.open("https://ayanahmedkhan.live", "_blank")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    <Globe className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:rotate-12" />
                    PORTFOLIO
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="group/btn border-2 border-green-500/50 text-green-300 hover:bg-green-500/20 font-mono backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
                    CONNECT
                  </Button>
                </div>
              </CardContent>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Card>

            <div className="mt-8">
              <p className="text-green-100/60 font-mono text-sm">
                <span className="text-green-400">{">"}</span> This website was crafted with modern web technologies
                <br />
                <span className="text-green-400">{">"}</span> Built with React, Next.js, Three.js, and Tailwind CSS
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-500/20 bg-black/80 backdrop-blur-xl relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4 group">
                  <Globe className="h-6 w-6 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                    HackOrbit
                  </span>
                </div>
                <p className="text-blue-100/60 font-mono">
                  <span className="text-blue-400">{">"}</span> GET INTO THE ORBIT
                  <br />
                  <span className="text-blue-400">{">"}</span> OF INNOVATION
                </p>
              </div>
              {[
                { title: "QUICK LINKS", items: ["ABOUT", "THEMES", "TIMELINE", "PRIZES"] },
                {
                  title: "CONTACT",
                  items: ["MITS GWALIOR", "dlg@mitsgwalior.in", "+91 XXXXX XXXXX"],
                },
                { title: "COMMUNITY", items: [
                  { name: "DISCORD", icon: MessageCircle },
                  { name: "INSTAGRAM", icon: Instagram }, 
                  { name: "WHATSAPP", icon: Phone }
                ] },
              ].map((section, index) => (
                <div key={section.title}>
                  <h3 className="text-blue-300 font-semibold mb-4 font-mono">{section.title}</h3>
                  {section.title === "COMMUNITY" ? (
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <Button
                          key={item.name}
                          size="sm"
                          variant="outline"
                          className="w-full border-blue-400/70 bg-blue-500/10 text-blue-200 hover:bg-blue-500/30 hover:border-blue-300 font-mono transition-all duration-300 hover:scale-105 flex items-center justify-start gap-2 backdrop-blur-sm"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 text-blue-100/60 font-mono">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="hover:text-blue-300 transition-all duration-300 hover:translate-x-2 hover:scale-105"
                        >
                          <span className="text-blue-400">{">"}</span> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-blue-500/20 text-center text-blue-100/60 font-mono">
              <p>
                <span className="text-blue-400">{">"}</span> © 2024 HackOrbit by DLG Group & MITS Gwalior. ALL RIGHTS
                RESERVED.
              </p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes gradient-x {
            0%,
            100% {
              background-size: 200% 200%;
              background-position: left center;
            }
            50% {
              background-size: 200% 200%;
              background-position: right center;
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-slide-up {
            animation: slide-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-slide-down {
            animation: slide-down 0.6s ease-out forwards;
            opacity: 0;
          }

          .animate-slide-in {
            animation: slide-in 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
            background-size: 200% 200%;
          }

          .scroll-animate {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
          }

          .scroll-animate.animate-slide-in {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </div>
    </>
