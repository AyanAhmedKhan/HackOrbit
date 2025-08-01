import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certificate Verification - HackOrbit",
  description: "Verify HackOrbit certificates instantly with OCR technology",
}

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
