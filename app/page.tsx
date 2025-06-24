"use client"
import Image from 'next/image';


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

import dynamic from "next/dynamic"

import FallbackBackground from "../fallback-background"

// Dynamically import Three.js components with no SSR
const ThreeComponents = dynamic(() => import("../three-components"), { ssr: false })

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
  });

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
  };

  useEffect(() => {
    const targetDate = new Date("2025-07-05T23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "1s" }}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-red-400 mb-2 font-mono animate-pulse">
          REGISTRATION CLOSES IN
        </h3>
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
          const c = colorMap[item.color as keyof typeof colorMap];
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
          );
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
  );
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
                      <span className="text-blue-400">{">"}</span> The club is guided by Dr. Punit Kumar Johari, a dedicated faculty mentor who brings valuable expertise and support to the team.
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
        };

        const styles = colorMap[item.color as keyof typeof colorMap];
        const Icon = item.icon;

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
              <h3 className={`text-xl font-semibold font-mono mb-1 ${styles.title} ${styles.hoverTitle} transition-colors duration-300`}>
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
        );
      })}
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
        <div className="h-20 flex items-center justify-center mb-4">
          <img
            src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo.svg"
            alt="Unstop Logo"
            className="h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
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
        <div className="h-20 flex items-center justify-center mb-4">
          <img
            src="data:image/jpeg;base64,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"
            alt="T.I.M.E Gwalior"
            className="h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {[
        {
          name: "GEEKSFORGEEKS",
          color: "green",
          role: "🎓 KNOWLEDGE PARTNER",
          desc: "Leading Programming Education Platform",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/GeeksforGeeks.svg/1200px-GeeksforGeeks.svg.png",
          link: "https://www.geeksforgeeks.org/",
        },
        {
          name: "INTERVIEWBUDDY",
          color: "purple",
          role: "💼 CAREER SUPPORT PARTNER",
          desc: "AI-Powered Interview Preparation Platform",
          logo: "https://media.licdn.com/dms/image/v2/D560BAQFIdYutkMbK4w/company-logo_200_200/company-logo_200_200/0/1729591843173/interviewbuddy_logo?e=1755734400&v=beta&t=WXszNIxda5R3pEw9kQZgWPuC5WAg2tOeNWI8KWlaMSU",
          link: "https://interviewbuddy.net/",
        },
        {
          name: ".XYZ DOMAIN",
          color: "blue",
          role: "🌐 WEB INNOVATION PARTNER",
          desc: "Next Generation Domain Solutions",
          logo: "data:image/png;base64,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",
          link: "https://gen.xyz/",
        },
        {
          name: "CODECRAFTERS",
          color: "cyan",
          role: "🧠 TECH PARTNER",
          desc: "Advanced Programming Challenges Platform",
          logo: "https://codecrafters.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.df7bb93f.png&w=96&q=75",
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
          <div className="h-16 mb-3 flex items-center justify-center">
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className={`h-12 rounded-xl flex items-center justify-center font-bold font-mono text-lg mb-3 bg-gradient-to-r from-${sponsor.color}-400 to-${sponsor.color}-300 text-black relative overflow-hidden`}>
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

    {(() => {
      // Team members data array
      const teamMembers = [
        // First Row - Coordinator Only
        {
          row: 1,
          name: "Dr. Punit Kumar Johari",
          role: "COORDINATOR",
          organization: "DLG GROUP",
          color: "purple",
          icon: Rocket,
          imageUrl: 'https://i.ibb.co/8gqrX4Jy/punit-kumar-johari-coordinator.jpg', // Set to image URL or null for icon
          portfolioUrl: 'https://www.linkedin.com/in/dr-punit-kumar-johari-a9624068/',
        },
        
        // Second Row - 5 Cards
        {
          row: 2,
          name: "Shiv Shrivastava",
          role: "PRESIDENT",
          organization: "DLG GROUP",
          color: "blue",
          icon: Users,
          imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHKgRv1IDAVtg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706464098389?e=1755734400&v=beta&t=WIRTKOaoVMqykrVfAXOy4ZG02vomSSscXkdbfzjJ_Dc',
          portfolioUrl: 'https://www.linkedin.com/in/shiv-shrivastava-4137bb268/',
        },
        {
          row: 2,
          name: "Pooja Bhagel",
          role: "VICE PRESIDENT",
          organization: "DLG GROUP",
          color: "indigo",
          icon: Award,
          imageUrl: 'https://i.ibb.co/Q3Bj3M8H/Pooja-Baghel-vice-president.jpg',
          portfolioUrl: 'https://www.linkedin.com/in/pooja-baghel-6a8913251/',
        },
        {
          row: 2,
          name: "Tanmay Garg",
          role: "MANAGEMENT HEAD",
          organization: "DLG GROUP",
          color: "emerald",
          icon: Target,
          imageUrl: 'https://i.ibb.co/nqM5vKDL/Tanmay-garg-management-head.jpg',
          portfolioUrl: 'https://www.linkedin.com/in/tanmaygarg926/',
        },
        {
          row: 2,
          name: "Shivraj Singh",
          role: "TECHNICAL HEAD",
          organization: "DLG GROUP",
          color: "cyan",
          icon: Code,
          imageUrl: 'https://i.ibb.co/Xk6Y2xhH/Shivraj-singh-technical-head.jpg',
          portfolioUrl: 'https://www.linkedin.com/in/shivrajsingh435/https://www.linkedin.com/in/shivrajsingh435/',
        },
        {
          row: 2,
          name: "Prashant Pippal",
          role: "MARKETING HEAD",
          organization: "DLG GROUP",
          color: "orange",
          icon: Zap,
          imageUrl: 'https://i.ibb.co/5hdxZp1h/Prashant-pippal-promotion-headjpg.jpg',
          portfolioUrl: null,
        },
        
        // Third Row - 5 Cards
        {
          row: 3,
          name: "Riya Payak",
          role: "MARKETING HEAD",
          organization: "DLG GROUP",
          color: "teal",
          icon: Globe,
          imageUrl: 'https://i.ibb.co/35CSbJvf/Riya-payak-promotion-head.jpg',
          portfolioUrl: null,
        },
        {
          row: 3,
          name: "Yashshav Khandelwal ",
          role: "CONTENT HEAD",
          organization: "DLG GROUP",
          color: "yellow",
          icon: Trophy,
          imageUrl: 'https://i.ibb.co/7dGQVb36/yashshav-khandelwal-content-head.jpg',
          portfolioUrl: null,
        },
        {
          row: 3,
          name: "Aniruddh Kushwaha",
          role: "GRAPHICS HEAD",
          organization: "DLG GROUP",
          color: "pink",
          icon: MessageCircle,
          imageUrl: 'https://i.ibb.co/35mBdhLY/Aniruddh-kushwaha-graphic-head.png',
          portfolioUrl: null,
        },
        {
          row: 3,
          name: "AYAN AHMED KHAN",
          role: "WEB DEVELOPER",
          organization: "DLG Group",
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
          imageUrl: 'https://i.ibb.co/yBqSN8sH/Gagandeep-Kushwah.png',
          portfolioUrl: null,
        },
        
      ];

      // Group members by row
      const membersByRow = teamMembers.reduce((acc, member) => {
        if (!acc[member.row]) acc[member.row] = [];
        acc[member.row].push(member);
        return acc;
      }, {} as Record<number, typeof teamMembers>);

      // Render function for individual card
      const renderMemberCard = (member: typeof teamMembers[0], index: number) => (
        <Card 
          key={`${member.name}-${index}`}
          className={`group relative bg-black/40 border-${member.color}-500/30 backdrop-blur-xl hover:border-${member.color}-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-${member.color}-500/20 overflow-hidden ${member.row === 1 ? 'w-48' : ''}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-${member.color}-500/10 ${member.color === 'purple' ? 'to-pink-500/10' : member.color === 'indigo' ? 'to-blue-500/10' : member.color === 'emerald' ? 'to-green-500/10' : member.color === 'cyan' ? 'to-blue-500/10' : member.color === 'orange' ? 'to-red-500/10' : member.color === 'teal' ? 'to-cyan-500/10' : member.color === 'yellow' ? 'to-orange-500/10' : member.color === 'pink' ? 'to-rose-500/10' : member.color === 'violet' ? 'to-purple-500/10' : 'to-blue-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

          <CardHeader className="text-center relative p-4">
            <div className="relative mb-3">
              <div className={`w-12 h-12 mx-auto rounded-full ${member.imageUrl ? 'overflow-hidden' : `bg-gradient-to-r from-${member.color}-400 ${member.color === 'purple' ? 'to-pink-400' : member.color === 'indigo' ? 'to-blue-400' : member.color === 'emerald' ? 'to-green-400' : member.color === 'cyan' ? 'to-blue-400' : member.color === 'orange' ? 'to-red-400' : member.color === 'teal' ? 'to-cyan-400' : member.color === 'yellow' ? 'to-orange-400' : member.color === 'pink' ? 'to-rose-400' : member.color === 'violet' ? 'to-purple-400' : 'to-blue-400'} flex items-center justify-center`} border-2 border-${member.color}-400/50 group-hover:border-${member.color}-400 transition-all duration-500 group-hover:scale-110`}>
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <member.icon className="w-6 h-6 text-black" />
                )}
              </div>
              <div className={`absolute inset-0 bg-${member.color}-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>

            <CardTitle className={`text-sm text-${member.color}-300 font-mono group-hover:text-${member.color}-200 transition-colors duration-300 mb-1`}>
              {member.name}
            </CardTitle>
            <CardDescription className={`text-${member.color}-200/80 font-mono text-xs mb-1`}>
              {member.role}
            </CardDescription>
            <CardDescription className={`text-${member.color}-200/60 font-mono text-xs`}>
              {member.organization}
            </CardDescription>
          </CardHeader>

          {member.portfolioUrl && (
            <CardContent className="text-center relative p-2">
              <div className="flex justify-center space-x-1">
                <Button
                  size="sm"
                  className={`group/btn bg-gradient-to-r from-${member.color}-500 to-blue-500 hover:from-${member.color}-400 hover:to-blue-400 text-black font-bold border-0 shadow-lg shadow-${member.color}-500/25 transition-all duration-300 hover:scale-105 overflow-hidden text-xs px-2 py-1`}
                  onClick={() => window.open(member.portfolioUrl!, "_blank")}
                >
                  <Globe className="w-3 h-3 mr-1" />
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          )}

          <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-${member.color}-500 ${member.color === 'purple' ? 'to-pink-500' : member.color === 'indigo' ? 'to-blue-500' : member.color === 'emerald' ? 'to-green-500' : member.color === 'cyan' ? 'to-blue-500' : member.color === 'orange' ? 'to-red-500' : member.color === 'teal' ? 'to-cyan-500' : member.color === 'yellow' ? 'to-orange-500' : member.color === 'pink' ? 'to-rose-500' : member.color === 'violet' ? 'to-purple-500' : 'to-blue-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
        </Card>
      );

      return (
        <>
          {/* First Row - Coordinator Only */}
          <div className="flex justify-center mb-8">
            {membersByRow[1]?.map((member, index) => renderMemberCard(member, index))}
          </div>

          {/* Second Row - 5 Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 max-w-6xl mx-auto">
            {membersByRow[2]?.map((member, index) => renderMemberCard(member, index))}
          </div>

          {/* Third Row - 5 Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
            {membersByRow[3]?.map((member, index) => renderMemberCard(member, index))}
          </div>
        </>
      );
    })()}

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
