import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Users,
  Globe,
  Target,
  Award,
  Star,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  TrendingUp,
  Eye,
  Heart,
  Zap,
  Gift,
  Handshake,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sponsor HackOrbit 2025 - Partnership Opportunities | National Level Hackathon",
  description:
    "Partner with HackOrbit 2025 and reach 500+ top student innovators across India. Explore Bronze, Silver, and Gold sponsorship tiers with extensive branding benefits.",
  keywords:
    "hackathon sponsorship, tech event sponsorship, student developer outreach, brand visibility, HackOrbit sponsors, MITS Gwalior partnership",
}

export default function SponsorsPage() {
  const eventStats = [
    { icon: Users, label: "Expected Participants", value: "2000+", color: "blue" },
    { icon: Globe, label: "Pan-India Reach", value: "All States", color: "green" },
    { icon: Calendar, label: "Event Duration", value: "36 Hours", color: "purple" },
    { icon: Trophy, label: "Prize Pool", value: "₹2.5 lakhs+", color: "yellow" },
  ]

  const benefits = [
    {
      icon: Eye,
      title: "Brand Visibility",
      description: "Extensive exposure across digital platforms and event materials",
      color: "blue",
    },
    {
      icon: Users,
      title: "Talent Access",
      description: "Connect with top student developers and innovators",
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Market Reach",
      description: "Access to emerging tech talent across India",
      color: "purple",
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Support the next generation of tech innovators",
      color: "red",
    },
  ]

  const sponsorTiers = [
    {
      name: "Bronze Sponsor",
      price: "₹3,000",
      color: "orange",
      icon: Award,
      popular: false,
      benefits: [
        "Logo on Website & Event Certificates",
        "Social Media Mention",
        "Name in Closing Ceremony",
        "Access to Resumes (on request)",
        "Option to provide branded goodies/swags",
      ],
    },
    {
      name: "Silver Sponsor",
      price: "₹5,000",
      color: "gray",
      icon: Star,
      popular: true,
      benefits: [
        "All Bronze benefits",
        "Logo on Posters & Lanyards",
        "Mentions in Email Campaigns",
        "Discord & Instagram Shoutout",
        "Goodie Bags Sponsored by You (if provided)",
      ],
    },
    {
      name: "Gold Sponsor",
      price: "₹7,000",
      color: "yellow",
      icon: Trophy,
      popular: false,
      benefits: [
        "All Silver benefits",
        '"Powered by" Branding',
        "Sponsored Reel Feature on Social Media",
        "Host a Talk/Workshop During Event",
        "Name featured in newspaper coverage",
        "Premium Logo Placement on Posters & Stream",
        "Swag Unboxing Segment Featuring Your Brand",
      ],
    },
  ]

  const inKindOptions = [
    {
      icon: Gift,
      title: "Goodies & Swags",
      description: "T-shirts, stickers, coupons, branded merchandise",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Product Demos",
      description: "API access, platform demos, technical showcases",
      color: "purple",
    },
    {
      icon: Target,
      title: "Platform Credits",
      description: "Vouchers, credits, and exclusive access for participants",
      color: "green",
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono backdrop-blur-sm">
              <Handshake className="w-4 h-4 mr-2" />
              PARTNERSHIP OPPORTUNITY
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-mono">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Sponsor HackOrbit 2025
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 mb-8 font-mono max-w-4xl mx-auto">
              Partner with Central India's Premier National Level Online Hackathon
            </p>

            <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-blue-300 mb-4 font-mono">Event Overview</h2>
                  <div className="space-y-3 text-blue-100/80 font-mono">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-blue-400" />
                      <span className="text-blue-400">{">"}</span> July 8, 2025
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-3 text-green-400" />
                      <span className="text-green-400">{">"}</span> National Level Online Event
                    </p>
                    <p className="flex items-center">
                      <Zap className="w-4 h-4 mr-3 text-purple-400" />
                      <span className="text-purple-400">{">"}</span> 6-Hour High-Intensity Competition
                    </p>
                    <p className="flex items-center">
                      <Users className="w-4 h-4 mr-3 text-cyan-400" />
                      <span className="text-cyan-400">{">"}</span> 500+ Top Student Innovators
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {eventStats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`p-4 bg-${stat.color}-500/10 rounded-xl border border-${stat.color}-500/30 text-center`}
                    >
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400 mx-auto mb-2`} />
                      <div className={`text-lg font-bold text-${stat.color}-400 font-mono`}>{stat.value}</div>
                      <div className={`text-${stat.color}-200/60 font-mono text-xs`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                asChild
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold text-lg px-10 py-4 border-0 shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:scale-110"
              >
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe98-Vy5bi6WdpQRoii9QgtFTs29pYaDW1mUSupOv4Xjtmbvw/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="w-5 h-5 mr-2 inline" />
                  BECOME A SPONSOR
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 text-lg px-10 py-4 font-mono backdrop-blur-sm"
              >
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@hackorbit.tech&su=Hackathon%20Sponsorship%20Request&body=Dear%20Team%20HackOrbit%2C%0A%0AWe%20would%20like%20to%20discuss%20a%20potential%20sponsorship%20opportunity%20for%20our%20upcoming%20hackathon...
"
                >
                  <Phone className="w-5 h-5 mr-2 inline" />
                  CONTACT US
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6 font-mono">
              Why Sponsor HackOrbit?
            </h2>
            <p className="text-xl text-green-100/80 font-mono">
              <span className="text-green-400">{">"}</span> Strategic Benefits for Your Organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={benefit.title}
                className={`group bg-black/40 border-${benefit.color}-500/30 backdrop-blur-xl hover:border-${benefit.color}-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
              >
                <CardHeader className="text-center">
                  <div className="relative mb-4">
                    <benefit.icon
                      className={`h-12 w-12 text-${benefit.color}-400 mx-auto transition-all duration-500 group-hover:scale-125`}
                    />
                    <div
                      className={`absolute inset-0 bg-${benefit.color}-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                  </div>
                  <CardTitle className={`text-${benefit.color}-300 font-mono text-lg`}>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className={`text-${benefit.color}-100/80 font-mono text-sm`}>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6 font-mono">
              Sponsorship Tiers
            </h2>
            <p className="text-xl text-yellow-100/80 font-mono">
              <span className="text-yellow-400">{">"}</span> Choose the Perfect Partnership Level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sponsorTiers.map((tier, index) => (
              <Card
                key={tier.name}
                className={`group relative bg-black/40 border-${tier.color}-500/30 backdrop-blur-xl hover:border-${tier.color}-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-4 ${
                  tier.popular ? "ring-2 ring-blue-400/50" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white font-mono">MOST POPULAR</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="relative mb-4">
                    <tier.icon
                      className={`h-16 w-16 text-${tier.color}-400 mx-auto transition-all duration-500 group-hover:scale-125`}
                    />
                    <div
                      className={`absolute inset-0 bg-${tier.color}-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                  </div>
                  <CardTitle className={`text-2xl text-${tier.color}-300 font-mono mb-2`}>{tier.name}</CardTitle>
                  <div className={`text-4xl font-bold text-${tier.color}-400 font-mono mb-4`}>{tier.price}</div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start text-sm font-mono">
                        <CheckCircle className={`w-4 h-4 text-${tier.color}-400 mr-3 mt-0.5 flex-shrink-0`} />
                        <span className={`text-${tier.color}-100/80`}>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r from-${tier.color}-500 to-${tier.color}-400 hover:from-${tier.color}-400 hover:to-${tier.color}-300 text-black font-bold transition-all duration-300 hover:scale-105`}
                  >
                    Choose {tier.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* In-Kind Sponsorship */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-mono">
              In-Kind Sponsorship
            </h2>
            <p className="text-xl text-purple-100/80 font-mono">
              <span className="text-purple-400">{">"}</span> Alternative Partnership Opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {inKindOptions.map((option, index) => (
              <Card
                key={option.title}
                className={`group bg-black/40 border-${option.color}-500/30 backdrop-blur-xl hover:border-${option.color}-400/60 transition-all duration-500 hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <option.icon
                    className={`h-12 w-12 text-${option.color}-400 mx-auto mb-4 transition-all duration-500 group-hover:scale-125`}
                  />
                  <CardTitle className={`text-${option.color}-300 font-mono text-lg`}>{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className={`text-${option.color}-100/80 font-mono text-sm`}>{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Updated Partners Section */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-cyan-400 mb-8 font-mono">POWERED BY</h3>
            <div className="flex justify-center mb-12">
              <Card className="group relative bg-black/60 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 backdrop-blur-sm overflow-hidden cursor-pointer max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-6">
                  <div className="h-16 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl flex items-center justify-center text-black font-bold font-mono text-2xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    UNSTOP
                  </div>
                  <CardTitle className="text-cyan-300 font-mono text-lg mb-2">PLATFORM PARTNER</CardTitle>
                  <CardDescription className="text-cyan-100/80 font-mono text-sm">
                    India's Leading Student Community Platform
                  </CardDescription>
                </CardHeader>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            </div>

            {/* Partner Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "GEEKSFORGEEKS",
                  color: "green",
                  role: "🎓 KNOWLEDGE PARTNER",
                  desc: "Leading Programming Education Platform",
                },
                {
                  name: "INTERVIEWBUDDY",
                  color: "purple",
                  role: "💼 CAREER SUPPORT",
                  desc: "AI-Powered Interview Preparation",
                },
                {
                  name: ".XYZ DOMAIN",
                  color: "blue",
                  role: "🌐 WEB INNOVATION",
                  desc: "Next Generation Domain Solutions",
                },
                {
                  name: "CODECRAFTERS",
                  color: "orange",
                  role: "🧠 TECH PARTNER",
                  desc: "Advanced Programming Challenges",
                },
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
                  <p className={`text-${partner.color}-300 font-mono text-xs text-center mb-1 font-semibold`}>
                    {partner.role}
                  </p>
                  <p className={`text-${partner.color}-200/80 font-mono text-xs text-center`}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4 font-mono">Ready to Partner With Us?</h3>
              <p className="text-cyan-100/80 font-mono mb-6">
                We believe this partnership will provide strategic brand visibility and help you engage with the next
                generation of tech talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@hackorbit.tech,digitallearninggroupmits@gmail.com&su=Hackathon%20Sponsorship%20Request&body=Dear%20Team%2C%0A%0AWe%20would%20like%20to%20discuss%20a%20potential%20sponsorship%20opportunity%20for%20our%20upcoming%20hackathon.%20Your%20support%20can%20help%20empower%20young%20innovators%20and%20enhance%20your%20brand%20visibility%20among%20tech%20talent.%0A%0ALooking%20forward%20to%20your%20response.%0A%0ABest%20Regards%2C%0A%5BYour%20Name%5D%0A%5BYour%20College%20or%20Team%20Name%5D
"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </a>
                <a
                  href="tel:+919244524591"
                  className="inline-flex items-center justify-center border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 font-mono py-3 px-6 rounded-lg text-lg transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +91 92445 24591
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 font-mono">Get In Touch</h2>
          <p className="text-blue-100/80 font-mono mb-8">
            Thank you for your time and consideration. Looking forward to collaborating with you to make HackOrbit 2025
            a resounding success.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-xl p-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-blue-300 mb-4 font-mono text-center">Digital Learning Group</h3>
              <div className="space-y-4 text-blue-100/80 font-mono text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-center sm:text-left">
                    <a href="mailto:info@hackorbit.tech" className="hover:underline">
                      info@hackorbit.tech
                    </a>
                    <span className="hidden sm:inline">|</span>
                    <a href="mailto:digitallearninggroupmits@gmail.com" className="hover:underline">
                      digitallearninggroupmits@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <a href="tel:+919244524591" className="hover:underline">
                    +91 92445 24591
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <a href="tel:+919584427192" className="hover:underline">
                    +91 95844 27192
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-4 font-mono">MITS Gwalior</h3>
              <div className="space-y-3 text-purple-100/80 font-mono text-sm">
                <p className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-3 text-purple-400" />
                  AB Road, Gwalior, MP 474005
                </p>
                <p className="flex items-center justify-center">
                  <Globe className="w-4 h-4 mr-3 text-cyan-400" />
                  web.mitsgwalior.in
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/20 font-mono"
              >
                ← Back to HackOrbit Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
