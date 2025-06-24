import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "HackOrbit 2025 - National Level Online Hackathon | DLG Group & MITS Gwalior",
  description:
    "Join HackOrbit 2025, Central India's premier national level online hackathon by Digital Learning Group and MITS Gwalior. ₹25K+ prize pool, 6 themes including AI/ML, Web3, FinTech. Register now !",
  keywords:
    "HackOrbit, MITS hackathon, online hackathon, national hackathon, coding competition, AI hackathon, blockchain hackathon,  hackathon, MITS Gwalior, DLG Group MITS,",
  authors: [{ name: "Digital Learning Group" }, { name: "MITS Gwalior" }],
  creator: "Digital Learning Group & MITS Gwalior",
  publisher: "MITS Gwalior",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hackorbit.tech",
    siteName: "HackOrbit 2025",
    title: "HackOrbit 2025 - National Level Online Hackathon",
    description:
      "Join Central India's premier national level online hackathon. ₹25K+ prizes, AI/ML, Web3, FinTech themes. Register now!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HackOrbit 2025 - National Level Online Hackathon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackOrbit 2025 - National Level Online Hackathon",
    description:
      "Join Central India's premier national level online hackathon. ₹25K+ prizes, AI/ML, Web3, FinTech themes. Register now!",
    images: ["/twitter-image.jpg"],
    creator: "@dlg_group",
    site: "@hackorbit2025",
  },
  alternates: {
    canonical: "https://hackorbit.tech",
  },
  category: "technology",
  classification: "hackathon, programming competition, technology event",
  other: {
    "google-site-verification": "googleb5d05a7b6b9e2169",
    "msvalidate.01": "your-bing-verification-code",
  },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "HackOrbit 2025 - National Level Online Hackathon",
  description:
    "Central India's premier national level online hackathon by Digital Learning Group and MITS Gwalior featuring AI/ML, Web3, FinTech, Healthcare Tech, Sustainability, and Open Innovation themes.",
  startDate: "2025-01-15T00:00:00+05:30",
  endDate: "2025-01-17T23:59:59+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: {
    "@type": "VirtualLocation",
    url: "https://hackorbit.tech",
    name: "Online Platform",
  },
  organizer: [
    {
      "@type": "Organization",
      name: "Digital Learning Group",
      url: "https://dlggroup.in",
    },
    {
      "@type": "Organization",
      name: "Madhav Institute of Technology & Science",
      url: "https://mitsgwalior.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "AB Road",
        addressLocality: "Gwalior",
        addressRegion: "Madhya Pradesh",
        postalCode: "474005",
        addressCountry: "IN",
      },
    },
  ],
  offers: {
    "@type": "Offer",
    price: "100",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2024-12-01T00:00:00+05:30",
    validThrough: "2024-12-31T23:59:59+05:30",
  },
  image: "https://hackorbit.tech/og-image.jpg",
  url: "https://hackorbit.tech",
  isAccessibleForFree: false,
  maximumAttendeeCapacity: 1000,
  typicalAgeRange: "18-30",
  inLanguage: "en-IN",
  keywords:
    "hackathon, programming, AI, machine learning, blockchain, fintech, healthcare tech, sustainability, coding competition",
  audience: {
    "@type": "Audience",
    audienceType: "Students, Developers, Programmers, Tech Enthusiasts",
  },
  performer: {
    "@type": "Organization",
    name: "Digital Learning Group",
  },
  sponsor: [
    {
      "@type": "Organization",
      name: "Digital Learning Group",
    },
    {
      "@type": "Organization",
      name: "MITS Gwalior",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Gwalior, Madhya Pradesh, India" />
        <meta name="geo.position" content="26.2183;78.1828" />
        <meta name="ICBM" content="26.2183, 78.1828" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
