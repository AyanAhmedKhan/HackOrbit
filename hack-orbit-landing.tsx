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
  Phone,
  ExternalLink,
  MessageCircle,
  Instagram,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import dynamic from "next/dynamic"

import FallbackBackground from "./fallback-background"

const teamMembers = [
  {
                  row: 1,
                  name: "Dr. Punit Kumar Johari",
                  role: "COORDINATOR",
                  organization: "DLG GROUP",
                  color: "purple",
                  icon: Rocket,
                  imageUrl: "https://i.ibb.co/8gqrX4Jy/punit-kumar-johari-coordinator.jpg",
                  portfolioUrl: "https://www.linkedin.com/in/dr-punit-kumar-johari-a9624068/",
                },
                {
                  row: 2,
                  name: "Shiv Shrivastava",
                  role: "PRESIDENT",
                  organization: "DLG GROUP",
                  color: "blue",
                  icon: Users,
                  imageUrl:
                    "https://media.licdn.com/dms/image/v2/D4D03AQHKgRv1IDAVtg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706464098389?e=1755734400&v=beta&t=WIRTKOaoVMqykrVfAXOy4ZG02vomSSscXkdbfzjJ_Dc",
                  portfolioUrl: "https://www.linkedin.com/in/shiv-shrivastava-4137bb268/",
                },
                {
                  row: 2,
                  name: "Pooja Bhagel",
                  role: "VICE PRESIDENT",
                  organization: "DLG GROUP",
                  color: "indigo",
                  icon: Award,
                  imageUrl: "https://i.ibb.co/Q3Bj3M8H/Pooja-Baghel-vice-president.jpg",
                  portfolioUrl: "https://www.linkedin.com/in/pooja-baghel-6a8913251/",
                },
                {
                  row: 2,
                  name: "Tanmay Garg",
                  role: "MANAGEMENT HEAD",
                  organization: "DLG GROUP",
                  color: "emerald",
                  icon: Target,
                  imageUrl: "https://i.ibb.co/nqM5vKDL/Tanmay-garg-management-head.jpg",
                  portfolioUrl: "https://www.linkedin.com/in/tanmaygarg926/",
                },
                {
                  row: 2,
                  name: "Shivraj Singh",
                  role: "TECHNICAL HEAD",
                  organization: "DLG GROUP",
                  color: "cyan",
                  icon: Code,
                  imageUrl: "https://i.ibb.co/Xk6Y2xhH/Shivraj-singh-technical-head.jpg",
                  portfolioUrl: "https://www.linkedin.com/in/shivrajsingh435/",
                },
                {
                  row: 2,
                  name: "Prashant Pippal",
                  role: "MARKETING HEAD",
                  organization: "DLG GROUP",
                  color: "orange",
                  icon: Zap,
                  imageUrl: "https://i.ibb.co/5hdxZp1h/Prashant-pippal-promotion-headjpg.jpg",
                  portfolioUrl: null,
                },
                {
                  row: 3,
                  name: "Riya Payak",
                  role: "MARKETING HEAD",
                  organization: "DLG GROUP",
                  color: "teal",
                  icon: Globe,
                  imageUrl: "https://i.ibb.co/35CSbJvf/Riya-payak-promotion-head.jpg",
                  portfolioUrl: null,
                },
                {
                  row: 3,
                  name: "Yashshav Khandelwal ",
                  role: "CONTENT HEAD",
                  organization: "DLG GROUP",
                  color: "yellow",
                  icon: Trophy,
                  imageUrl: "https://i.ibb.co/7dGQVb36/yashshav-khandelwal-content-head.jpg",
                  portfolioUrl: null,
                },
                {
                  row: 3,
                  name: "Sanjay Singh",
                  role: "Video Editing Head",
                  organization: "DLG GROUP",
                  color: "pink",
                  icon: MessageCircle,
                  imageUrl: "https://i.ibb.co/SX2PSkHX/sanjaysingh.jpg",
                  portfolioUrl: null,
                },
                {
                  row: 3,
                  name: "AYAN AHMED KHAN",
                  role: "WEB DEVELOPER",
                  organization: "DLG GROUP",
                  color: "green",
                  icon: Globe,
                  imageUrl: "https://ayanahmedkhan.live/assets/image/image.png",
                  portfolioUrl: "https://ayanahmedkhan.live",
                  isSpecial: true,
                },
                {
                  row: 3,
                  name: "Gagandeep Kushwah",
                  role: "EXECUTIVE MEMBER",
                  organization: "DLG GROUP",
                  color: "violet",
                  icon: Zap,
                  imageUrl: "https://i.ibb.co/yBqSN8sH/Gagandeep-Kushwah.png",
                  portfolioUrl: null,
                },
]

const membersByRow = teamMembers.reduce((acc, member) => {
  if (!acc[member.row]) acc[member.row] = []
  acc[member.row].push(member)
  return acc
}, {})

// Dynamically import Three.js components with no SSR
const ThreeComponents = dynamic(() => import("./three-components"), { ssr: false })

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

  const colorMap = {
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      hover: "hover:bg-red-500/20",
      pulse: "bg-red-400/10",
      icon: "text-red-400",
      text: "text-red-400",
      label: "text-red-200/60",
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      hover: "hover:bg-orange-500/20",
      pulse: "bg-orange-400/10",
      icon: "text-orange-400",
      text: "text-orange-400",
      label: "text-orange-200/60",
    },
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      hover: "hover:bg-yellow-500/20",
      pulse: "bg-yellow-400/10",
      icon: "text-yellow-400",
      text: "text-yellow-400",
      label: "text-yellow-200/60",
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      hover: "hover:bg-green-500/20",
      pulse: "bg-green-400/10",
      icon: "text-green-400",
      text: "text-green-400",
      label: "text-green-200/60",
    },
  }

  useEffect(() => {
    const targetDate = new Date("2025-07-05T23:59:59").getTime()

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
        <a
          href="https://unstop.com/o/wYNVQPM?lb=aDpL27B4&utm_medium=Share&utm_source=shortUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-red-200/80 font-mono text-sm hover:underline hover:text-red-300 transition-colors">
            <span className="text-red-400">{">"}</span> SECURE YOUR SPOT BEFORE TIME RUNS OUT!
          </p>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {[
          { value: timeLeft.days, label: "DAYS", color: "red" },
          { value: timeLeft.hours, label: "HOURS", color: "orange" },
          { value: timeLeft.minutes, label: "MINUTES", color: "yellow" },
          { value: timeLeft.seconds, label: "SECONDS", color: "green" },
        ].map((item, index) => {
          const c = colorMap[item.color as keyof typeof colorMap]
          return (
            <div
              key={item.label}
              className={`group relative p-6 rounded-2xl ${c.bg} ${c.border} backdrop-blur-sm ${c.hover} transition-all duration-500 hover:scale-110 hover:rotate-1 cursor-pointer animate-slide-up`}
              style={{ animationDelay: `${1 + index * 0.1}s` }}
            >
              <div
                className={`absolute inset-0 rounded-2xl ${c.pulse} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}
              ></div>
              <Clock
                className={`w-6 h-6 mb-2 mx-auto transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 ${c.icon}`}
              />
              <div
                className={`text-3xl font-bold font-mono transition-all duration-300 group-hover:scale-110 animate-pulse ${c.text}`}
              >
                {String(item.value).padStart(2, "0")}
              </div>
              <div className={`font-mono text-sm ${c.label}`}>{item.label}</div>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-6">
        <a
          href="https://unstop.com/o/wYNVQPM?lb=aDpL27B4&utm_medium=Share&utm_source=shortUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold text-lg px-10 py-4 border-0 shadow-2xl shadow-red-500/30 transition-all duration-500 hover:scale-110 hover:shadow-red-500/50 overflow-hidden animate-bounce"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Rocket className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-45" />
            REGISTER NOW - LIMITED TIME!
          </Button>
        </a>
      </div>
    </div>
  )
}

export default function HackOrbitLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [threeJsLoaded, setThreeJsLoaded] = useState(false)

  useEffect(() => {
    // Check if Three.js components loaded successfully
    const checkThreeJs = setTimeout(() => {
      const threeCanvas = document.querySelector("canvas")
      setThreeJsLoaded(!!threeCanvas)
    }, 2000)

    return () => clearTimeout(checkThreeJs)
  }, [])

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <LoadingScreen isLoading={isLoading} />

      <main className="min-h-screen bg-black relative overflow-hidden transition-opacity duration-1000">
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

        {/* Fallback starry background if Three.js fails */}
        {!threeJsLoaded && <FallbackBackground />}

        {/* Three.js Orbital Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <ThreeComponents />
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
              {/* Logo + Title */}
              <div className="flex items-center space-x-3 group">
                <div className="relative group-hover:animate-bounce">
                  <Globe className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                  HackOrbit
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex space-x-8">
                {["ABOUT", "THEMES", "TIMELINE", "PRIZES", "SPONSORS"].map((item, index) => (
                  <Link
                    key={item}
                    href={item === "SPONSORS" ? "/sponsors" : `#${item.toLowerCase()}`}
                    className="relative text-blue-300/80 hover:text-blue-300 transition-all duration-300 font-mono group animate-slide-down"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                ))}
              </div>

              {/* Register Now Button with Link */}
              <a
                href="https://unstop.com/o/wYNVQPM?lb=aDpL27B4&utm_medium=Share&utm_source=shortUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 overflow-hidden group animate-slide-down">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Rocket className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                  REGISTER NOW
                </Button>
              </a>
            </div>
          </div>
        </nav>

        <nav aria-label="Breadcrumb" className="fixed top-20 left-4 z-40 hidden md:block">
          <ol className="flex space-x-2 text-sm font-mono">
            <li>
              <a href="#hero" className="text-blue-400 hover:text-blue-300">
                Home
              </a>
            </li>
            <li className="text-blue-600">›</li>
            <li>
              <a href="#about" className="text-blue-400 hover:text-blue-300">
                About
              </a>
            </li>
            <li className="text-blue-600">›</li>
            <li>
              <a href="#themes" className="text-blue-400 hover:text-blue-300">
                Themes
              </a>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative" aria-label="Hero section">
          <header className="max-w-7xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <Globe className="w-4 h-4 mr-2 animate-spin" />
                NATIONAL LEVEL ONLINE HACKATHON
              </Badge>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-mono">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  HackOrbit 2025
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
                  National Level Online Hackathon by{" "}
                  <span className="text-cyan-400 font-bold">Digital Learning Group</span> and{" "}
                  <span className="text-blue-400 font-bold">Madhav Institute of Technology & Science, Gwalior</span>
                </p>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl opacity-50"></div>
              </div>
            </div>

            {/* Buttons Section */}
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              style={{ animationDelay: "0.6s" }}
            >
              {/* JOIN THE ORBIT -> Link */}
              <a
                href="https://unstop.com/o/wYNVQPM?lb=aDpL27B4&utm_medium=Share&utm_source=shortUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold text-lg px-10 py-4 border-0 shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:scale-110 hover:shadow-blue-500/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Rocket className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-45" />
                  JOIN THE ORBIT
                </Button>
              </a>

              {/* VIEW DETAILS -> Also Link */}
              <a
                href="https://unstop.com/o/wYNVQPM?lb=aDpL27B4&utm_medium=Share&utm_source=shortUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 text-lg px-10 py-4 font-mono backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <ExternalLink className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  VIEW DETAILS
                </Button>
              </a>
            </div>
            <div
              className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
              style={{ animationDelay: "0.8s" }}
            >
              {[
                { number: "36-HOUR", label: "HACKATHON", color: "blue", icon: Clock },
                { number: "₹25K+", label: "PRIZE POOL", color: "purple", icon: Trophy },
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
          </header>
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
                    ABOUT Digital Learning Group
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-blue-100/80 font-mono space-y-2">
                    <p>
                      <span className="text-blue-400">{">"}</span> Digital Learning Group (DLG) is an official student
                      club at MITS Gwalior dedicated to promoting digital literacy and innovation.
                    </p>
                    <p>
                      <span className="text-blue-400">{">"}</span> The club empowers students through hands-on learning
                      in diverse domains such as programming, AI/ML, cybersecurity, cloud, and digital design.
                    </p>
                    <p>
                      <span className="text-blue-400">{">"}</span> DLG organizes workshops, coding contests, webinars,
                      and collaborative projects to nurture practical tech skills and peer learning.
                    </p>
                    <p>
                      <span className="text-blue-400">{">"}</span> With a focus on accessibility, creativity, and
                      future-readiness, DLG fosters a vibrant ecosystem of continuous digital learning.
                    </p>
                    <p>
                      <span className="text-blue-400">{">"}</span> The club is guided by Dr. Punit Kumar Johari, a
                      dedicated faculty mentor who brings valuable expertise and support to the team.
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
                      <span className="text-purple-400">{">"}</span> Established in 1957 by H.H. Sir Jiwaji Rao Scindia;
                      foundation laid by Dr. Rajendra Prasad.
                    </p>
                    <p>
                      <span className="text-purple-400">{">"}</span> Inaugurated by Dr. S. Radhakrishnan; celebrated
                      Golden Jubilee with President Dr. Pratibha Patil in 2008.
                    </p>
                    <p>
                      <span className="text-purple-400">{">"}</span> Declared Deemed to be University (Distinct
                      Category) by MoE, Govt. of India in 2024.
                    </p>
                    <p>
                      <span className="text-purple-400">{">"}</span> Accredited by NAAC with A++ Grade; multiple
                      programs NBA accredited.
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
                  { label: "Platform", value: "Unstop", icon: Globe },
                  { label: "Participation", value: "National Level", icon: Target },
                  { label: "Team Size", value: "Max 4 members", icon: Users },
                  { label: "Registration", value: "Open for all teams nationwide", icon: Trophy },
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
              {/* AI & Machine Learning */}
              <Card className="group relative bg-black/40 border-blue-500/30 backdrop-blur-xl hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative text-center">
                  <div className="relative mb-4">
                    <Zap className="h-12 w-12 text-blue-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  <CardTitle className="text-blue-300 font-mono text-lg group-hover:text-blue-200 transition-colors duration-300">
                    AI & MACHINE LEARNING
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <p className="text-blue-100/80 font-mono text-sm">Build intelligent systems that learn and adapt</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Web3 & Blockchain */}
              <Card className="group relative bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative text-center">
                  <div className="relative mb-4">
                    <Globe className="h-12 w-12 text-purple-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  <CardTitle className="text-purple-300 font-mono text-lg group-hover:text-purple-200 transition-colors duration-300">
                    WEB3 & BLOCKCHAIN
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <p className="text-purple-100/80 font-mono text-sm">Create decentralized solutions for tomorrow</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Fintech Innovation */}
              <Card className="group relative bg-black/40 border-green-500/30 backdrop-blur-xl hover:border-green-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative text-center">
                  <div className="relative mb-4">
                    <Trophy className="h-12 w-12 text-green-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  <CardTitle className="text-green-300 font-mono text-lg group-hover:text-green-200 transition-colors duration-300">
                    FINTECH INNOVATION
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <p className="text-green-100/80 font-mono text-sm">Revolutionize financial technology</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Healthcare Tech */}
              <Card className="group relative bg-black/40 border-rose-500/30 backdrop-blur-xl hover:border-rose-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative text-center">
                  <div className="relative mb-4">
                    <Target className="h-12 w-12 text-rose-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-rose-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  <CardTitle className="text-rose-300 font-mono text-lg group-hover:text-rose-200 transition-colors duration-300">
                    HEALTHCARE TECH
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <p className="text-rose-100/80 font-mono text-sm">Develop solutions for better health outcomes</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-rose-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Sustainability */}
              <Card className="group relative bg-black/40 border-teal-500/30 backdrop-blur-xl hover:border-teal-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative text-center">
                  <div className="relative mb-4">
                    <Award className="h-12 w-12 text-teal-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  <CardTitle className="text-teal-300 font-mono text-lg group-hover:text-teal-200 transition-colors duration-300">
                    SUSTAINABILITY
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <p className="text-teal-100/80 font-mono text-sm">Code for a greener planet</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Open Innovation */}
              <Card className="group relative bg-black/40 border-cyan-500/30 backdrop-blur-xl hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative text-center">
                  <div className="relative mb-4">
                    <Rocket className="h-12 w-12 text-cyan-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  <CardTitle className="text-cyan-300 font-mono text-lg group-hover:text-cyan-200 transition-colors duration-300">
                    OPEN INNOVATION
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <p className="text-cyan-100/80 font-mono text-sm">Think outside the box and surprise us</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            </div>
          </div>
        </section>

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
                  desc: "June 17, 2025 – Secure your spot in the orbit",
                  color: "blue",
                },
                {
                  icon: Clock,
                  title: "REGISTRATION CLOSES",
                  desc: "July 3, 2025 – Last day to board the mission",
                  color: "sky",
                },
                {
                  icon: Code,
                  title: "ROUND 1 – PPT SUBMISSION",
                  desc: "July 5, 2025 – Submit your concept pitch",
                  color: "indigo",
                },
                {
                  icon: Clock,
                  title: "ROUND 2 – FINAL SHOWDOWN BEGINS",
                  desc: "July 6, 2025, 11:00 AM – Hackathon kicks off (36 hours)",
                  color: "purple",
                },
                {
                  icon: Code,
                  title: "SUBMISSION DEADLINE",
                  desc: "July 7, 2025, 11:00 PM – Wrap up your mission",
                  color: "cyan",
                },
                {
                  icon: Trophy,
                  title: "RESULTS ANNOUNCEMENT",
                  desc: "July 10, 2025 – Winners revealed",
                  color: "green",
                },
              ].map((item, index) => {
                const colorMap = {
                  blue: {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/30",
                    hoverBorder: "hover:border-blue-400/60",
                    gradient: "from-blue-500",
                    icon: "text-blue-400",
                    title: "text-blue-300",
                    hoverTitle: "group-hover:text-blue-200",
                    desc: "text-blue-100/80",
                    arrow: "text-blue-400",
                    pulse: "bg-blue-400/20",
                    bar: "from-blue-500 to-blue-300",
                  },
                  sky: {
                    bg: "bg-sky-500/10",
                    border: "border-sky-500/30",
                    hoverBorder: "hover:border-sky-400/60",
                    gradient: "from-sky-500",
                    icon: "text-sky-400",
                    title: "text-sky-300",
                    hoverTitle: "group-hover:text-sky-200",
                    desc: "text-sky-100/80",
                    arrow: "text-sky-400",
                    pulse: "bg-sky-400/20",
                    bar: "from-sky-500 to-sky-300",
                  },
                  indigo: {
                    bg: "bg-indigo-500/10",
                    border: "border-indigo-500/30",
                    hoverBorder: "hover:border-indigo-400/60",
                    gradient: "from-indigo-500",
                    icon: "text-indigo-400",
                    title: "text-indigo-300",
                    hoverTitle: "group-hover:text-indigo-200",
                    desc: "text-indigo-100/80",
                    arrow: "text-indigo-400",
                    pulse: "bg-indigo-400/20",
                    bar: "from-indigo-500 to-indigo-300",
                  },
                  purple: {
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/30",
                    hoverBorder: "hover:border-purple-400/60",
                    gradient: "from-purple-500",
                    icon: "text-purple-400",
                    title: "text-purple-300",
                    hoverTitle: "group-hover:text-purple-200",
                    desc: "text-purple-100/80",
                    arrow: "text-purple-400",
                    pulse: "bg-purple-400/20",
                    bar: "from-purple-500 to-purple-300",
                  },
                  cyan: {
                    bg: "bg-cyan-500/10",
                    border: "border-cyan-500/30",
                    hoverBorder: "hover:border-cyan-400/60",
                    gradient: "from-cyan-500",
                    icon: "text-cyan-400",
                    title: "text-cyan-300",
                    hoverTitle: "group-hover:text-cyan-200",
                    desc: "text-cyan-100/80",
                    arrow: "text-cyan-400",
                    pulse: "bg-cyan-400/20",
                    bar: "from-cyan-500 to-cyan-300",
                  },
                  green: {
                    bg: "bg-green-500/10",
                    border: "border-green-500/30",
                    hoverBorder: "hover:border-green-400/60",
                    gradient: "from-green-500",
                    icon: "text-green-400",
                    title: "text-green-300",
                    hoverTitle: "group-hover:text-green-200",
                    desc: "text-green-100/80",
                    arrow: "text-green-400",
                    pulse: "bg-green-400/20",
                    bar: "from-green-500 to-green-300",
                  },
                }

                const styles = colorMap[item.color as keyof typeof colorMap]
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className={`group flex items-center space-x-6 p-8 ${styles.bg} rounded-2xl ${styles.border} backdrop-blur-sm ${styles.hoverBorder} transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden animate-slide-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${styles.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                    <div className="relative">
                      <Icon
                        className={`h-10 w-10 ${styles.icon} transition-all duration-500 group-hover:scale-125 group-hover:rotate-12`}
                      />
                      <div
                        className={`absolute inset-0 ${styles.pulse} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      ></div>
                    </div>
                    <div className="relative flex-1">
                      <h3
                        className={`text-xl font-semibold font-mono mb-1 ${styles.title} ${styles.hoverTitle} transition-colors duration-300`}
                      >
                        {item.title}
                      </h3>
                      <p className={`${styles.desc} font-mono`}>
                        <span className={`${styles.arrow}`}>{">"}</span> {item.desc}
                      </p>
                    </div>
                    <div
                      className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${styles.bar} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500`}
                    ></div>
                  </div>
                )
              })}
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
                <span className="text-yellow-400">{">"}</span> ₹25,000+ PRIZE POOL + EXCLUSIVE REWARDS
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
                  <CardTitle className="text-3xl text-white font-mono">₹25,000+</CardTitle>
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

        <section id="sponsors" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 backdrop-blur-3xl"></div>
          <div className="max-w-7xl mx-auto text-center relative">
            {/* Heading */}
            <div className="mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                ORBITAL PARTNERS
              </h2>
              <p className="text-xl text-purple-100/80 mb-12 font-mono">
                <span className="text-purple-400">{">"}</span> POWERED BY INDUSTRY LEADERS
              </p>
            </div>

            {/* Unstop (main partner) */}
            <div className="mb-24">
              <h3 className="text-3xl font-bold text-cyan-400 mb-8 font-mono text-center">POWERED BY</h3>
              <div className="flex justify-center">
                <a
                  href="https://unstop.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-black/60 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 backdrop-blur-sm overflow-hidden cursor-pointer max-w-sm p-6 rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-center relative p-0">
                    <div className="h-20 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl flex items-center justify-center text-black font-bold font-mono text-2xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      UNSTOP
                    </div>
                    <div className="text-cyan-300 font-mono text-lg mb-2">PLATFORM PARTNER</div>
                    <div className="text-cyan-100/80 font-mono text-sm">
                      <span className="text-cyan-400">{">"}</span> India's Leading Student Community Platform
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </a>
              </div>
            </div>

            <div className="mb-24">
              <h3 className="text-3xl font-bold text-orange-400 mb-8 font-mono text-center">CO-POWERED BY</h3>
              <div className="flex justify-center gap-6 flex-wrap">
                {/* Time Coaching Gwalior */}
                <a
                  href="https://www.time4education.com/Gwalior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-black/60 border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 backdrop-blur-sm overflow-hidden cursor-pointer max-w-sm p-6 rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-center relative p-0">
                    <div className="h-20 bg-gradient-to-r from-orange-400 to-orange-300 rounded-xl flex items-center justify-center text-black font-bold font-mono text-lg mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      T.I.M.E
                    </div>
                    <div className="text-orange-300 font-mono text-lg mb-2">T.I.M.E – GWALIOR</div>
                    <div className="text-orange-100/80 font-mono text-sm">
                      <span className="text-orange-400">{">"}</span> Shaping Careers. Empowering Dreams.
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </a>
              </div>
            </div>

            {/* Other Sponsors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
              {[
                {
                  name: "GEEKSFORGEEKS",
                  color: "green",
                  role: "🎓 KNOWLEDGE PARTNER",
                  desc: "Leading Programming Education Platform",
                  link: "https://www.geeksforgeeks.org/",
                },
                {
                  name: "INTERVIEWBUDDY",
                  color: "purple",
                  role: "💼 CAREER SUPPORT PARTNER",
                  desc: "AI-Powered Interview Preparation Platform",
                  link: "https://interviewbuddy.net/",
                },
                {
                  name: ".XYZ DOMAIN",
                  color: "blue",
                  role: "🌐 WEB INNOVATION PARTNER",
                  desc: "Next Generation Domain Solutions",
                  link: "https://gen.xyz/",
                },
                {
                  name: "CODECRAFTERS",
                  color: "cyan",
                  role: "🧠 TECH PARTNER",
                  desc: "Advanced Programming Challenges Platform",
                  link: "https://codecrafters.io/",
                },
              ].map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-black/60 p-6 rounded-2xl border border-${sponsor.color}-500/30 hover:border-${sponsor.color}-400/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 backdrop-blur-sm cursor-pointer overflow-hidden max-w-xs`}
                >
                  <div
                    className={`h-12 bg-gradient-to-r from-${sponsor.color}-400 to-${sponsor.color}-300 rounded-xl flex items-center justify-center text-black font-bold font-mono text-sm mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    {sponsor.name}
                  </div>
                  <p className={`text-${sponsor.color}-300 font-mono text-sm mb-1`}>{sponsor.role}</p>
                  <p className={`text-${sponsor.color}-100/80 font-mono text-xs text-center`}>
                    <span className={`text-${sponsor.color}-400`}>{">"}</span> {sponsor.desc}
                  </p>
                </a>
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
                {
                  name: "Discord",
                  platform: "discord" as const,
                  color: "blue",
                  desc: "Join our Discord server",
                  link: "https://discord.gg/mufAp5KdGu",
                },
                {
                  name: "Instagram",
                  platform: "instagram" as const,
                  color: "purple",
                  desc: "Follow us on Instagram",
                  link: "https://www.instagram.com/digitallearninggroupmits?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                },
                {
                  name: "WhatsApp",
                  platform: "whatsapp" as const,
                  color: "green",
                  desc: "Join WhatsApp group",
                  link: "https://chat.whatsapp.com/JpNPyFkCC5I1J5bmbWfYIa",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  <Card
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
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Organizing Committee Section */}
        <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 backdrop-blur-3xl"></div>
          <div className="max-w-7xl mx-auto text-center relative">
            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6 font-mono hover:scale-105 transition-transform duration-300 cursor-default">
                ORGANIZING COMMITTEE
              </h2>
              <p className="text-xl text-green-100/80 mb-12 font-mono">
                <span className="text-green-400">{">"}</span> MEET THE MINDS BEHIND HACKORBIT
              </p>
            </div>

            {/* Map Rows */}
            {[1, 2, 3].map((row) => (
              <div
                key={row}
                className={`${
                  row === 1
                    ? "flex justify-center mb-8"
                    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 max-w-6xl mx-auto"
                }`}
              >
                {membersByRow[row]?.map((member, index) => (
                  <Card
                    key={`${member.name}-${index}`}
                    className={`group relative bg-black/40 border-${member.color}-500/30 backdrop-blur-xl hover:border-${member.color}-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-${member.color}-500/20 overflow-hidden ${
                      row === 1 ? "w-48" : ""
                    } ${
                      member.isSpecial
                        ? "ring-2 ring-yellow-400/30 border-yellow-400/60 shadow-2xl shadow-yellow-500/20"
                        : ""
                    }`}
                  >
                    {member.isSpecial && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-xs px-2 py-1 animate-pulse">
                          ⭐ CREATOR
                        </Badge>
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-${member.color}-500/10 ${
                        member.isSpecial
                          ? "to-yellow-500/20"
                          : member.color === "purple"
                            ? "to-pink-500/10"
                            : member.color === "indigo"
                              ? "to-blue-500/10"
                              : member.color === "emerald"
                                ? "to-green-500/10"
                                : member.color === "cyan"
                                  ? "to-blue-500/10"
                                  : member.color === "orange"
                                    ? "to-red-500/10"
                                    : member.color === "teal"
                                      ? "to-cyan-500/10"
                                      : member.color === "yellow"
                                        ? "to-orange-500/10"
                                        : member.color === "pink"
                                          ? "to-rose-500/10"
                                          : member.color === "violet"
                                            ? "to-purple-500/10"
                                            : "to-blue-500/10"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>

                    <CardHeader className="text-center relative p-4">
                      <div className="relative mb-3">
                        <div
                          className={`${member.isSpecial ? "w-16 h-16" : "w-12 h-12"} mx-auto rounded-full bg-gradient-to-r from-${member.color}-400 to-${member.color}-500 flex items-center justify-center border-2 border-${member.color}-400/50 group-hover:border-${member.color}-400 transition-all duration-500 group-hover:scale-110 ${
                            member.isSpecial ? "ring-2 ring-yellow-400/50" : ""
                          }`}
                        >
                          <member.icon className={`${member.isSpecial ? "w-8 h-8" : "w-6 h-6"} text-black`} />
                        </div>
                        <div
                          className={`absolute inset-0 bg-${member.color}-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                            member.isSpecial ? "animate-pulse" : ""
                          }`}
                        ></div>
                      </div>
                      <CardTitle
                        className={`${member.isSpecial ? "text-base" : "text-sm"} text-${member.color}-300 font-mono group-hover:text-${member.color}-200 transition-colors duration-300 mb-1 ${
                          member.isSpecial ? "font-bold" : ""
                        }`}
                      >
                        {member.name}
                      </CardTitle>
                      <CardDescription
                        className={`text-${member.color}-200/80 font-mono text-xs mb-1 ${
                          member.isSpecial ? "font-semibold" : ""
                        }`}
                      >
                        {member.role}
                      </CardDescription>
                      <CardDescription
                        className={`text-${member.color}-200/60 font-mono text-xs ${member.isSpecial ? "mb-2" : ""}`}
                      >
                        {member.organization}
                      </CardDescription>
                    </CardHeader>

                    {member.portfolioUrl && (
                      <CardContent className="text-center relative p-2">
                        <div className="flex justify-center space-x-1">
                          <Button
                            size="sm"
                            className={`group/btn bg-gradient-to-r from-${member.color}-500 ${
                              member.isSpecial ? "to-yellow-500" : "to-blue-500"
                            } hover:from-${member.color}-400 ${
                              member.isSpecial ? "hover:to-yellow-400" : "hover:to-blue-400"
                            } text-black font-bold border-0 shadow-lg shadow-${member.color}-500/25 transition-all duration-300 hover:scale-105 overflow-hidden text-xs px-2 py-1`}
                            onClick={() => window.open(member.portfolioUrl!, "_blank")}
                          >
                            <Linkedin className="w-3 h-3 mr-1" />
                            LinkedIn
                          </Button>
                        </div>
                      </CardContent>
                    )}

                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-${member.color}-500 ${
                        member.isSpecial
                          ? "to-yellow-500"
                          : member.color === "purple"
                            ? "to-pink-500"
                            : member.color === "indigo"
                              ? "to-blue-500"
                              : member.color === "emerald"
                                ? "to-green-500"
                                : member.color === "cyan"
                                  ? "to-blue-500"
                                  : member.color === "orange"
                                    ? "to-red-500"
                                    : member.color === "teal"
                                      ? "to-cyan-500"
                                      : member.color === "yellow"
                                        ? "to-orange-500"
                                        : member.color === "pink"
                                          ? "to-rose-500"
                                          : member.color === "violet"
                                            ? "to-purple-500"
                                            : "to-blue-500"
                      } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    ></div>
                  </Card>
                ))}
              </div>
            ))}

            <div className="mt-8">
              <p className="text-green-100/60 font-mono text-sm">
                <span className="text-green-400">{">"}</span> Dedicated team working together to make HackOrbit a
                success
                <br />
                <span className="text-green-400">{">"}</span> Bringing innovation and excellence to Central India's
                biggest hackathon
              </p>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-animate"
          aria-label="Frequently Asked Questions"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-12 font-mono text-center">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "What is HackOrbit 2025?",
                  answer:
                    "HackOrbit 2025 is a national level online hackathon organized by Digital Learning Group and MITS Gwalior, featuring 6 exciting themes and ₹25K+ prize pool.",
                },
                {
                  question: "Who can participate in HackOrbit?",
                  answer:
                    "Students, developers, and tech enthusiasts from across India can participate. Teams can have maximum 4 members.",
                },
                {
                  question: "What is the registration fee?",
                  answer:
                    "The registration fee is ₹100 per team, making it accessible for all students and developers.",
                },
                {
                  question: "What are the hackathon themes?",
                  answer:
                    "We have 6 exciting themes: AI & Machine Learning, Web3 & Blockchain, FinTech Innovation, Healthcare Tech, Sustainability, and Open Innovation.",
                },
                {
                  question: "What prizes can we win?",
                  answer:
                    "Winners share from ₹25K+ prize pool plus exclusive swags, certificates, and goodies for top 10 teams.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-black/40 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-blue-400/60 transition-all duration-300"
                >
                  <summary className="text-blue-300 font-mono text-lg cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-blue-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                  </summary>
                  <p className="text-blue-100/80 font-mono mt-4 leading-relaxed">
                    <span className="text-blue-400">{">"}</span> {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-500/20 bg-black/80 backdrop-blur-xl relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Brand Section */}
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

              {/* QUICK LINKS, CONTACT, COMMUNITY */}
              {[
                { title: "QUICK LINKS", items: ["ABOUT", "THEMES", "TIMELINE", "PRIZES"] },
                {
                  title: "CONTACT",
                  items: [
                    { label: "MITS GWALIOR", link: "https://web.mitsgwalior.in/" },
                    "digitallearninggroupmits@gmail.com",
                    "+91 9244524591",
                    "+91 9584427192",
                  ],
                },
                {
                  title: "COMMUNITY",
                  items: [
                    {
                      name: "DISCORD",
                      icon: MessageCircle,
                      link: "https://discord.gg/mufAp5KdGu",
                    },
                    {
                      name: "INSTAGRAM",
                      icon: Instagram,
                      link: "https://www.instagram.com/digitallearninggroupmits?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                    },
                    {
                      name: "WHATSAPP",
                      icon: Phone,
                      link: "https://chat.whatsapp.com/JpNPyFkCC5I1J5bmbWfYIa",
                    },
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="text-blue-300 font-semibold mb-4 font-mono">{section.title}</h3>

                  {/* COMMUNITY SECTION */}
                  {section.title === "COMMUNITY" ? (
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-blue-400/70 bg-blue-500/10 text-blue-200 hover:bg-blue-500/30 hover:border-blue-300 font-mono transition-all duration-300 hover:scale-105 flex items-center justify-start gap-2 backdrop-blur-sm"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </Button>
                        </a>
                      ))}
                    </div>
                  ) : (
                    // QUICK LINKS + CONTACT SECTIONS
                    <ul className="space-y-2 text-blue-100/60 font-mono break-words max-w-full">
                      {section.items.map((item, index) => {
                        if (typeof item === "object" && item.link) {
                          // Render linked item (like MITS GWALIOR)
                          return (
                            <li
                              key={index}
                              className="hover:text-blue-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 break-all"
                            >
                              <span className="text-blue-400">{">"}</span>{" "}
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {item.label}
                              </a>
                            </li>
                          )
                        }

                        const isEmail = typeof item === "string" && item.includes("@")
                        const isPhone = typeof item === "string" && item.match(/^\+91\s?\d{10}$/)

                        return (
                          <li
                            key={index}
                            className="hover:text-blue-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 break-all"
                          >
                            <span className="text-blue-400">{">"}</span>{" "}
                            {isEmail ? (
                              <a href={`mailto:${item}`} className="hover:underline break-all">
                                {item}
                              </a>
                            ) : isPhone ? (
                              <a href={`tel:${item.replace(/\s+/g, "")}`} className="hover:underline">
                                {item}
                              </a>
                            ) : (
                              item
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Line */}
            <div className="mt-8 pt-8 border-t border-blue-500/20 text-center text-blue-100/60 font-mono">
              <p>
                <span className="text-blue-400">{">"}</span> © 2025 HackOrbit by DLG Group & MITS Gwalior. ALL RIGHTS
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
      </main>
    </>
  )
}
