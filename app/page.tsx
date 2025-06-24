"use client"

import dynamic from "next/dynamic"

// Dynamically import the HackOrbitLanding component with no SSR
const HackOrbitLanding = dynamic(() => import("@/hack-orbit-landing"), { ssr: false })

export default function Home() {
  return <HackOrbitLanding />
}
