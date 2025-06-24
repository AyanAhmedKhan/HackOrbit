"use client"

import { useEffect, useState } from "react"

export default function FallbackBackground() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number }[]>([])

  useEffect(() => {
    // Create stars for the fallback background
    const newStars = []
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/30"></div>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}
